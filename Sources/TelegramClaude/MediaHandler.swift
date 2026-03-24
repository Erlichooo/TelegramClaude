import Foundation
import Speech
import AVFoundation

enum MediaHandler {

    // MARK: - Download

    static func downloadFile(token: String, fileId: String) async throws -> URL {
        let infoURL = URL(string: "https://api.telegram.org/bot\(token)/getFile?file_id=\(fileId)")!
        let (infoData, _) = try await URLSession.shared.data(from: infoURL)
        let infoJson = try JSONSerialization.jsonObject(with: infoData) as! [String: Any]
        guard let result = infoJson["result"] as? [String: Any],
              let filePath = result["file_path"] as? String else {
            throw NSError(domain: "MediaHandler", code: 1,
                          userInfo: [NSLocalizedDescriptionKey: "无法获取文件路径"])
        }
        let downloadURL = URL(string: "https://api.telegram.org/file/bot\(token)/\(filePath)")!
        let (fileData, _) = try await URLSession.shared.data(from: downloadURL)
        let ext = (filePath as NSString).pathExtension
        // 保存到工作目录下的专用子目录，Claude Code 对此有完整权限
        let tmpDir = URL(fileURLWithPath: Config.workDir).appendingPathComponent(".telegram_tmp")
        try? FileManager.default.createDirectory(at: tmpDir, withIntermediateDirectories: true)
        let tempURL = tmpDir.appendingPathComponent("\(UUID().uuidString).\(ext)")
        try fileData.write(to: tempURL)
        return tempURL
    }

    // MARK: - Voice transcription

    static func transcribe(url: URL) async -> String? {
        let authorized = await requestSpeechAuthorization()
        guard authorized else { return nil }

        // 先直接尝试（macOS 11+ 支持 OGG Opus）
        if let result = await recognizeSpeech(url: url) {
            return result
        }

        // 如果直接识别失败，转换为 M4A 再试
        let m4aURL = URL(fileURLWithPath: NSTemporaryDirectory())
            .appendingPathComponent("tg_\(UUID().uuidString).m4a")
        let converted = await convertToM4A(input: url, output: m4aURL)
        guard converted else { return nil }
        defer { try? FileManager.default.removeItem(at: m4aURL) }
        return await recognizeSpeech(url: m4aURL)
    }

    // MARK: - AVFoundation conversion (OGG → M4A)

    private static func convertToM4A(input: URL, output: URL) async -> Bool {
        let asset = AVURLAsset(url: input)
        guard let exportSession = AVAssetExportSession(
            asset: asset,
            presetName: AVAssetExportPresetAppleM4A
        ) else { return false }

        exportSession.outputURL = output
        exportSession.outputFileType = .m4a
        await exportSession.export()
        return exportSession.status == .completed
    }

    // MARK: - SFSpeechRecognizer

    private static func requestSpeechAuthorization() async -> Bool {
        await withCheckedContinuation { continuation in
            SFSpeechRecognizer.requestAuthorization { status in
                continuation.resume(returning: status == .authorized)
            }
        }
    }

    private static func recognizeSpeech(url: URL) async -> String? {
        // 优先中文，备用系统语言
        let locales = [Locale(identifier: "zh-CN"), Locale(identifier: "zh-TW"), Locale.current]
        let recognizer = locales.lazy
            .compactMap { SFSpeechRecognizer(locale: $0) }
            .first { $0.isAvailable }
        guard let recognizer else { return nil }

        let request = SFSpeechURLRecognitionRequest(url: url)
        request.shouldReportPartialResults = false

        return await withCheckedContinuation { continuation in
            var resumed = false
            recognizer.recognitionTask(with: request) { result, error in
                guard !resumed else { return }
                if let result, result.isFinal {
                    resumed = true
                    continuation.resume(returning: result.bestTranscription.formattedString)
                } else if error != nil {
                    resumed = true
                    continuation.resume(returning: nil)
                }
            }
        }
    }
}

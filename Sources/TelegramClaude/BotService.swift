import Foundation
import TelegramClaudeCore

struct ChatMessage: Identifiable {
    let id = UUID()
    let role: Role
    let text: String
    let time: Date

    enum Role { case user, assistant }
}

struct PendingPermission {
    let toolName: String
    let description: String
    let inputPreview: String
}

@MainActor
class BotService: ObservableObject {
    @Published var isRunning = false
    @Published var statusMessage = L("Stopped", "已停止")
    @Published var messages: [ChatMessage] = []
    @Published var sessionCostUSD: Double = 0
    @Published var sessionInputTokens: Int = 0
    @Published var sessionOutputTokens: Int = 0
    @Published var sessionCacheReadTokens: Int = 0
    @Published var sessionCacheWriteTokens: Int = 0
    @Published var sessionDurationAPIms: Int = 0
    @Published var sessionDurationWallms: Int = 0
    @Published var mcpChangesPending: Bool = false

    private let gateway = ClaudeGateway()
    private var pollingTask: Task<Void, Never>?
    private var offset: Int64 = 0
    private var isProcessing = false
    private var isSendingFinal = false
    private var permMonitorTask: Task<Void, Never>?
    private var pendingPermissions: [String: PendingPermission] = [:]

    // MARK: - Session

    func clearSession() async {
        isProcessing = false
        mcpChangesPending = false
        if let oldSessionId = await gateway.currentSessionId {
            let projectDir = Config.workDir
                .replacingOccurrences(of: "/", with: "-")
                .replacingOccurrences(of: " ", with: "-")
            let sessionFile = NSHomeDirectory()
                + "/.claude/projects/\(projectDir)/\(oldSessionId).jsonl"
            try? FileManager.default.removeItem(atPath: sessionFile)
        }
        await gateway.reset()
        sessionCostUSD = 0
        sessionInputTokens = 0
        sessionOutputTokens = 0
        sessionCacheReadTokens = 0
        sessionCacheWriteTokens = 0
        sessionDurationAPIms = 0
        sessionDurationWallms = 0
        let notice = ChatMessage(role: .assistant, text: L("✅ Session reset. Starting new conversation.", "✅ 会话已重置，开始新对话"), time: Date())
        messages.append(notice)
    }

    // MARK: - Start / Stop

    func start() {
        guard !Config.claudePath.isEmpty else {
            statusMessage = L("claude not found in PATH. Install Claude Code first.",
                              "未找到 claude。请先安装 Claude Code。")
            return
        }
        guard FileManager.default.isExecutableFile(atPath: Config.claudePath) else {
            statusMessage = L("claude not found in PATH. Install Claude Code first.",
                              "未找到 claude。请先安装 Claude Code。")
            return
        }
        guard let token = Config.botToken, !token.isEmpty else {
            statusMessage = L("Bot token not found. Run /telegram:configure in Claude Code.",
                              "未找到 Bot Token。请运行 /telegram:configure。")
            return
        }
        guard !Config.allowedUserIDs.isEmpty else {
            statusMessage = L("No allowed users. Run /telegram:access in Claude Code.",
                              "无授权用户。请运行 /telegram:access。")
            return
        }
        isRunning = true
        statusMessage = L("Running", "运行中")
        pollingTask = Task { [weak self] in
            await self?.pollLoop(token: token)
        }
    }

    func stop() {
        isRunning = false
        statusMessage = L("Stopped", "已停止")
        pollingTask?.cancel()
        pollingTask = nil
    }

    // MARK: - Polling

    private func pollLoop(token: String) async {
        while !Task.isCancelled {
            do {
                let updates = try await fetchUpdates(token: token)
                for update in updates {
                    await handleUpdate(update, token: token)
                }
            } catch {
                if !Task.isCancelled {
                    try? await Task.sleep(nanoseconds: 2_000_000_000)
                }
            }
        }
    }

    private func fetchUpdates(token: String) async throws -> [[String: Any]] {
        var comps = URLComponents(string: "https://api.telegram.org/bot\(token)/getUpdates")!
        comps.queryItems = [
            URLQueryItem(name: "timeout", value: "30"),
            URLQueryItem(name: "offset", value: "\(offset)")
        ]
        let (data, _) = try await URLSession.shared.data(from: comps.url!)
        let json = try JSONSerialization.jsonObject(with: data) as! [String: Any]
        return (json["result"] as? [[String: Any]]) ?? []
    }

    // MARK: - Handle update

    private func handleUpdate(_ update: [String: Any], token: String) async {
        guard let updateId = update["update_id"] as? Int64 else { return }
        offset = updateId + 1


        guard let message = update["message"] as? [String: Any],
              let chat = message["chat"] as? [String: Any],
              let chatId = chat["id"] as? Int64,
              let from = message["from"] as? [String: Any] else { return }

        let text = message["text"] as? String ?? ""

        let userId = "\(from["id"] ?? "")"
        let allowed = Config.allowedUserIDs
        guard allowed.isEmpty || allowed.contains(userId) else { return }

        guard !isProcessing else {
            await sendMessage(token: token, chatId: chatId, text: L("⏳ Claude is processing. Please wait.", "⏳ Claude 正在处理中，请等待"))
            return
        }

        if text == "/new" || text == "/reset" {
            await clearSession()
            await sendMessage(token: token, chatId: chatId, text: L("✅ Session reset", "✅ 会话已重置"))
            return
        }
        if text == "/cost" {
            await sendMessage(token: token, chatId: chatId, text: sessionCostString())
            return
        }

        var claudeInput = text
        if let photos = message["photo"] as? [[String: Any]],
           let largest = photos.max(by: { ($0["file_size"] as? Int ?? 0) < ($1["file_size"] as? Int ?? 0) }),
           let fileId = largest["file_id"] as? String,
           let token = Config.botToken {
            if let imgURL = try? await MediaHandler.downloadFile(token: token, fileId: fileId) {
                let caption = (message["caption"] as? String).map { "\n\n" + L("User said: \($0)", "用户说：\($0)") } ?? ""
                claudeInput = L("Please use the Read tool to view this image: \(imgURL.path)\(caption)", "请用 Read 工具查看这张图片：\(imgURL.path)\(caption)")
                Task { try? await Task.sleep(nanoseconds: 60_000_000_000); try? FileManager.default.removeItem(at: imgURL) }
            }
        }

        var placeholderMsgId: Int? = nil
        if let voice = message["voice"] as? [String: Any],
           let fileId = voice["file_id"] as? String,
           let token = Config.botToken {
            placeholderMsgId = await sendMessageGetId(token: token, chatId: chatId,
                                                       text: L("🎙️ Transcribing voice...", "🎙️ 正在转录语音..."))
            if let voiceURL = try? await MediaHandler.downloadFile(token: token, fileId: fileId) {
                if let transcript = await MediaHandler.transcribe(url: voiceURL), !transcript.isEmpty {
                    claudeInput = transcript
                    try? FileManager.default.removeItem(at: voiceURL)
                } else {
                    try? FileManager.default.removeItem(at: voiceURL)
                    let errText = L("❌ Transcription failed. Please use text instead.", "❌ 语音转录失败，请改用文字")
                    if let mid = placeholderMsgId {
                        await editMessage(token: token, chatId: chatId, messageId: mid, text: errText)
                    } else {
                        await sendMessage(token: token, chatId: chatId, text: errText)
                    }
                    return
                }
            } else {
                let errText = L("❌ Failed to download voice message. Please try again.", "❌ 语音下载失败，请重试")
                if let mid = placeholderMsgId {
                    await editMessage(token: token, chatId: chatId, messageId: mid, text: errText)
                } else {
                    await sendMessage(token: token, chatId: chatId, text: errText)
                }
                return
            }
        }

        guard !claudeInput.isEmpty else { return }

        messages.append(ChatMessage(role: .user, text: claudeInput, time: Date()))
        if messages.count > 50 { messages.removeFirst() }

        if let vid = placeholderMsgId {
            await editMessage(token: token, chatId: chatId, messageId: vid,
                              text: L("⏳ Processing...", "⏳ 处理中..."))
        } else {
            placeholderMsgId = await sendMessageGetId(token: token, chatId: chatId,
                                                       text: L("⏳ Processing...", "⏳ 处理中..."))
        }

        var lastEditedText = ""
        var lastEditTime = Date()

        isSendingFinal = false  // reset for this new message
        isProcessing = true
        var result: GatewayResponse?
        do {
            result = try await gateway.send(
                claudeInput,
                onStatus: { [weak self] statusText in
                    guard let self, let msgId = placeholderMsgId else { return }
                    Task { await self.editMessage(token: token, chatId: chatId, messageId: msgId, text: statusText) }
                },
                onChunk: { [weak self] accumulated in
                    guard let self else { return }
                    let now = Date()
                    guard now.timeIntervalSince(lastEditTime) >= 1.5 || accumulated.count - lastEditedText.count > 200 else { return }
                    lastEditedText = accumulated
                    lastEditTime = now
                    if let msgId = placeholderMsgId {
                        Task {
                            guard !self.isSendingFinal else { return }
                            await self.editMessage(token: token, chatId: chatId, messageId: msgId, text: accumulated)
                        }
                    }
                }
            )
        } catch {
            isProcessing = false
            let errText = L("⚠️ Claude process error. Please try again.", "⚠️ Claude 进程异常，请重试")
            if let msgId = placeholderMsgId {
                await editMessage(token: token, chatId: chatId, messageId: msgId, text: errText)
            } else {
                await sendMessage(token: token, chatId: chatId, text: errText)
            }
            return
        }

        isProcessing = false

        let finalText = result?.text ?? ""
        let cost = result?.cost ?? 0
        let inTokens = result?.inputTokens ?? 0
        let outTokens = result?.outputTokens ?? 0
        let cacheRead = result?.cacheReadTokens ?? 0
        let cacheWrite = result?.cacheWriteTokens ?? 0
        let dAPI = result?.durationAPIms ?? 0
        let dWall = result?.durationWallms ?? 0

        sessionCostUSD = cost
        sessionInputTokens += inTokens
        sessionOutputTokens += outTokens
        sessionCacheReadTokens += cacheRead
        sessionCacheWriteTokens += cacheWrite
        sessionDurationAPIms = dAPI
        sessionDurationWallms = dWall

        let isSlashCommand = claudeInput.hasPrefix("/")
        let displayText = finalText.isEmpty ? (isSlashCommand ? L("✅ Done", "✅ 执行完成") : L("(no response)", "（无回复）")) : finalText
        isSendingFinal = true
        await sendOrEditFinal(token: token, chatId: chatId, messageId: placeholderMsgId, text: displayText)

        messages.append(ChatMessage(role: .assistant, text: displayText, time: Date()))
        if messages.count > 50 { messages.removeFirst() }
    }

    // MARK: - Telegram API

    private func sendMessage(token: String, chatId: Int64, text: String) async {
        _ = await sendMessageGetId(token: token, chatId: chatId, text: text)
    }

    private func sendMessageGetId(token: String, chatId: Int64, text: String) async -> Int? {
        let truncated = String(text.prefix(4096))
        var body: [String: Any] = ["chat_id": chatId, "text": truncated]
        var request = URLRequest(url: URL(string: "https://api.telegram.org/bot\(token)/sendMessage")!)
        request.httpMethod = "POST"
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        request.httpBody = try? JSONSerialization.data(withJSONObject: body)
        guard let (data, _) = try? await URLSession.shared.data(for: request),
              let json = try? JSONSerialization.jsonObject(with: data) as? [String: Any],
              let result = json["result"] as? [String: Any],
              let msgId = result["message_id"] as? Int else { return nil }
        return msgId
    }

    private func editMessage(token: String, chatId: Int64, messageId: Int, text: String) async {
        let truncated = String(text.prefix(4096))
        var body: [String: Any] = ["chat_id": chatId, "message_id": messageId, "text": truncated]
        var request = URLRequest(url: URL(string: "https://api.telegram.org/bot\(token)/editMessageText")!)
        request.httpMethod = "POST"
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        request.httpBody = try? JSONSerialization.data(withJSONObject: body)
        _ = try? await URLSession.shared.data(for: request)
    }

    /// Sends the final response as MarkdownV2, splitting into multiple messages if needed.
    private func sendOrEditFinal(token: String, chatId: Int64, messageId: Int?, text: String) async {
        // Convert first, then split — so splitMessage sees the actual MarkdownV2 size
        // (tables expand significantly after Unicode box rendering).
        let mdv2Full = MarkdownRenderer.toMarkdownV2(text)
        let mdv2Chunks = splitMessage(mdv2Full)
        let rawChunks = splitMessage(text)

        for (i, mdv2) in mdv2Chunks.enumerated() {
            let raw = i < rawChunks.count ? rawChunks[i] : text
            if i == 0, let msgId = messageId {
                if await editMessageMarkdown(token: token, chatId: chatId, messageId: msgId, text: mdv2) { continue }
                await editMessage(token: token, chatId: chatId, messageId: msgId, text: raw)
            } else {
                if await sendMessageMarkdown(token: token, chatId: chatId, text: mdv2) { continue }
                await sendMessage(token: token, chatId: chatId, text: raw)
            }
        }
    }

    /// Splits text into chunks ≤ 3800 chars, never breaking inside a code fence.
    private func splitMessage(_ text: String, maxLen: Int = 3800) -> [String] {
        guard text.count > maxLen else { return [text] }
        var chunks: [String] = []
        var remaining = text
        while remaining.count > maxLen {
            let prefix = String(remaining.prefix(maxLen))
            // Don't split inside a code fence: walk back to before the last opening fence
            let fenceCount = prefix.components(separatedBy: "\n```").count - 1
            var splitPoint: String.Index
            if fenceCount % 2 == 1 {
                // Inside a fence — back up to just before the opening ```
                let searchEnd = prefix.endIndex
                if let fenceRange = prefix.range(of: "\n```", options: .backwards, range: prefix.startIndex..<searchEnd) {
                    splitPoint = fenceRange.lowerBound
                } else {
                    splitPoint = prefix.endIndex
                }
            } else if let paraBreak = prefix.range(of: "\n\n", options: .backwards) {
                splitPoint = paraBreak.upperBound
            } else if let lineBreak = prefix.lastIndex(of: "\n") {
                splitPoint = prefix.index(after: lineBreak)
            } else {
                splitPoint = prefix.endIndex
            }
            let chunk = String(remaining[..<splitPoint])
            if !chunk.isEmpty { chunks.append(chunk) }
            remaining = String(remaining[splitPoint...])
        }
        if !remaining.isEmpty { chunks.append(remaining) }
        return chunks
    }

    private func editMessageMarkdown(token: String, chatId: Int64, messageId: Int, text: String) async -> Bool {
        let truncated = String(text.prefix(4096))
        let body: [String: Any] = [
            "chat_id": chatId, "message_id": messageId, "text": truncated, "parse_mode": "MarkdownV2"
        ]
        var request = URLRequest(url: URL(string: "https://api.telegram.org/bot\(token)/editMessageText")!)
        request.httpMethod = "POST"
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        request.httpBody = try? JSONSerialization.data(withJSONObject: body)
        guard let (data, _) = try? await URLSession.shared.data(for: request),
              let json = try? JSONSerialization.jsonObject(with: data) as? [String: Any],
              let ok = json["ok"] as? Bool else { return false }
        if !ok {
            let desc = json["description"] as? String ?? "unknown"
            let offset = json["parameters"] as? [String: Any]
            let logLine = "editMessageMarkdown FAILED: \(desc) | offset=\(offset ?? [:]) | text_prefix=\(String(truncated.prefix(200)))\n"
            try? logLine.appendToFile(at: "/tmp/telegramclaude_debug.log")
        }
        return ok
    }

    private func sendMessageMarkdown(token: String, chatId: Int64, text: String) async -> Bool {
        let truncated = String(text.prefix(4096))
        let body: [String: Any] = ["chat_id": chatId, "text": truncated, "parse_mode": "MarkdownV2"]
        var request = URLRequest(url: URL(string: "https://api.telegram.org/bot\(token)/sendMessage")!)
        request.httpMethod = "POST"
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        request.httpBody = try? JSONSerialization.data(withJSONObject: body)
        guard let (data, _) = try? await URLSession.shared.data(for: request),
              let json = try? JSONSerialization.jsonObject(with: data) as? [String: Any],
              let ok = json["ok"] as? Bool else { return false }
        if !ok {
            let desc = json["description"] as? String ?? "unknown"
            let logLine = "sendMessageMarkdown FAILED: \(desc) | text_prefix=\(String(truncated.prefix(200)))\n"
            try? logLine.appendToFile(at: "/tmp/telegramclaude_debug.log")
        }
        return ok
    }

    // MARK: - Debug helpers

    private func debugLog(_ message: String) {
        let line = "[\(Date())] \(message)\n"
        try? line.appendToFile(at: "/tmp/telegramclaude_debug.log")
    }

    // MARK: - Cost

    private func sessionCostString() -> String {
        guard sessionInputTokens > 0 || sessionOutputTokens > 0 else {
            return L("No session data", "暂无会话数据")
        }

        func fmt(_ n: Int) -> String {
            if n >= 1_000_000 { return String(format: "%.1fm", Double(n) / 1_000_000) }
            if n >= 1_000     { return String(format: "%.1fk", Double(n) / 1_000) }
            return "\(n)"
        }

        func fmtDuration(_ ms: Int) -> String {
            if ms >= 60_000 { return String(format: "%.1fm", Double(ms) / 60_000) }
            if ms >= 1_000  { return String(format: "%.1fs", Double(ms) / 1_000) }
            return "\(ms)ms"
        }

        return """
            Total cost:            \(String(format: "$%.4f", sessionCostUSD))
            Total duration (API):  \(fmtDuration(sessionDurationAPIms))
            Total duration (wall): \(fmtDuration(sessionDurationWallms))
            Usage:                 \(fmt(sessionInputTokens)) input, \(fmt(sessionOutputTokens)) output, \(fmt(sessionCacheReadTokens)) cache read, \(fmt(sessionCacheWriteTokens)) cache write
            """
    }
}


private extension String {
    func appendToFile(at path: String) throws {
        let url = URL(fileURLWithPath: path)
        if let data = self.data(using: .utf8) {
            if FileManager.default.fileExists(atPath: path),
               let fh = try? FileHandle(forWritingTo: url) {
                defer { try? fh.close() }
                try fh.seekToEnd()
                fh.write(data)
            } else {
                try data.write(to: url, options: .atomic)
            }
        }
    }
}

// Sources/TelegramClaude/Config.swift
import Foundation

enum Config {
    static var botToken: String? {
        let path = NSHomeDirectory() + "/.claude/channels/telegram/.env"
        guard let content = try? String(contentsOfFile: path) else { return nil }
        for line in content.components(separatedBy: .newlines) {
            if line.hasPrefix("TELEGRAM_BOT_TOKEN=") {
                return String(line.dropFirst("TELEGRAM_BOT_TOKEN=".count))
                    .trimmingCharacters(in: .whitespaces)
            }
        }
        return nil
    }

    static var allowedUserIDs: Set<String> {
        let path = NSHomeDirectory() + "/.claude/channels/telegram/access.json"
        guard let data = try? Data(contentsOf: URL(fileURLWithPath: path)),
              let json = try? JSONSerialization.jsonObject(with: data) as? [String: Any],
              let allowFrom = json["allowFrom"] as? [String] else { return [] }
        return Set(allowFrom)
    }

    static let appSupportDir: String = {
        let urls = FileManager.default.urls(for: .applicationSupportDirectory, in: .userDomainMask)
        let dir = urls[0].appendingPathComponent("TelegramClaude").path
        try? FileManager.default.createDirectory(atPath: dir, withIntermediateDirectories: true)
        return dir
    }()

    static let claudePath: String = {
        func runWhich(env: [String: String]? = nil) -> String {
            let pipe = Pipe()
            let proc = Process()
            proc.executableURL = URL(fileURLWithPath: "/usr/bin/which")
            proc.arguments = ["claude"]
            proc.standardOutput = pipe
            proc.standardError = FileHandle.nullDevice
            if let env { proc.environment = env }
            try? proc.run()
            proc.waitUntilExit()
            return String(data: pipe.fileHandleForReading.readDataToEndOfFile(), encoding: .utf8)?
                .trimmingCharacters(in: .whitespacesAndNewlines) ?? ""
        }
        let first = runWhich()
        if !first.isEmpty { return first }
        let home = NSHomeDirectory()
        let expandedPath = "\(home)/.local/bin:/usr/local/bin:/opt/homebrew/bin:/usr/bin:/bin"
        return runWhich(env: ["PATH": expandedPath])
    }()

    static let workDir = appSupportDir
    static let launchAgentLabel = "com.gnoli.telegramclaude"
}

// Sources/TelegramClaude/Config.swift
import Foundation
import Darwin

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

    /// 用户完整 shell 环境，合并进系统环境。
    /// 通过系统用户数据库（getpwnam）获取用户默认 shell，
    /// 以 login 模式运行，自动加载所有 shell 配置文件（.zshrc/.bash_profile/.profile 等）。
    static let shellEnvironment: [String: String] = {
        var env = ProcessInfo.processInfo.environment

        // 从系统用户数据库读取默认 shell（不依赖环境变量）
        let userShell: String
        if let pw = getpwnam(NSUserName()), let sh = String(validatingUTF8: pw.pointee.pw_shell) {
            userShell = sh
        } else {
            userShell = "/bin/sh"
        }

        // fish 不支持 -l，用 --login；其他 POSIX shell 统一用 -l
        let isFish = userShell.hasSuffix("fish")
        let shellArgs = isFish ? ["--login", "-c", "env"] : ["-l", "-c", "env"]

        let pipe = Pipe()
        let proc = Process()
        proc.executableURL = URL(fileURLWithPath: userShell)
        proc.arguments = shellArgs
        proc.standardOutput = pipe
        proc.standardError = FileHandle.nullDevice
        try? proc.run()
        proc.waitUntilExit()

        let output = String(data: pipe.fileHandleForReading.readDataToEndOfFile(), encoding: .utf8) ?? ""
        for line in output.components(separatedBy: "\n") {
            guard let eq = line.firstIndex(of: "=") else { continue }
            let key = String(line[line.startIndex..<eq])
            let value = String(line[line.index(after: eq)...])
            if !key.isEmpty { env[key] = value }
        }
        return env
    }()

    static let workDir = appSupportDir
    static let launchAgentLabel = "com.gnoli.telegramclaude"
}

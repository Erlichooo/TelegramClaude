import SwiftUI

@main
struct TelegramClaudeApp: App {
    @StateObject private var bot = BotService()

    var body: some Scene {
        MenuBarExtra {
            MenuBarView()
                .environmentObject(bot)
        } label: {
            Image(systemName: bot.isRunning ? "wand.and.stars" : "wand.and.stars.inverse")
        }
        .menuBarExtraStyle(.window)
    }
}

// MARK: - LaunchAgent helper

enum LaunchAgent {
    static let plistPath = NSHomeDirectory() + "/Library/LaunchAgents/com.gnoli.telegramclaude.plist"

    static var isEnabled: Bool {
        FileManager.default.fileExists(atPath: plistPath)
    }

    static func setEnabled(_ enabled: Bool) {
        if enabled {
            // 找到当前可执行文件路径
            let execPath = Bundle.main.executablePath
                ?? (ProcessInfo.processInfo.arguments.first ?? "")
            let plist = """
            <?xml version="1.0" encoding="UTF-8"?>
            <!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
            <plist version="1.0">
            <dict>
                <key>Label</key>
                <string>com.gnoli.telegramclaude</string>
                <key>ProgramArguments</key>
                <array>
                    <string>\(execPath)</string>
                </array>
                <key>RunAtLoad</key>
                <true/>
                <key>KeepAlive</key>
                <false/>
            </dict>
            </plist>
            """
            try? plist.write(toFile: plistPath, atomically: true, encoding: .utf8)
        } else {
            try? FileManager.default.removeItem(atPath: plistPath)
        }
    }
}

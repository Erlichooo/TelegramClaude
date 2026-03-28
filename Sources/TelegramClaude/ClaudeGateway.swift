import Foundation

struct GatewayResponse {
    var text: String
    var cost: Double
    var inputTokens: Int
    var outputTokens: Int
    var cacheReadTokens: Int
    var cacheWriteTokens: Int
    var durationAPIms: Int
    var durationWallms: Int
}

enum GatewayError: Error {
    case processCrashed
    case processStartFailed(String)
}

actor ClaudeGateway {

    // MARK: - 持久进程

    private var process: Process?
    private var stdinHandle: FileHandle?
    private var stdoutPipe: Pipe?

    // MARK: - Session 持久化

    private(set) var currentSessionId: String?
    private let sessionPath = Config.appSupportDir + "/session_id"

    // MARK: - 每条消息的状态

    private var lineBuffer = ""
    private var accumulated = ""
    private var statusFormatter = StatusFormatter()
    private var pendingCost: Double = 0
    private var pendingInputTokens = 0
    private var pendingOutputTokens = 0
    private var pendingCacheRead = 0
    private var pendingCacheWrite = 0
    private var pendingDurationAPI = 0
    private var pendingDurationWall = 0

    // MARK: - Async 桥接

    private var pendingContinuation: CheckedContinuation<GatewayResponse, Error>?
    private var pendingOnStatus: (@MainActor (String) -> Void)?
    private var pendingOnChunk: (@MainActor (String) -> Void)?

    // MARK: - reset() 协调

    private var isResetting = false
    private var resetContinuation: CheckedContinuation<Void, Never>?

    // MARK: - Init

    init() {
        let raw = try? String(contentsOfFile: sessionPath)
            .trimmingCharacters(in: .whitespacesAndNewlines)
        currentSessionId = (raw?.isEmpty == false) ? raw : nil
    }

    // MARK: - 公开接口

    func send(
        _ text: String,
        onStatus: @escaping @MainActor (String) -> Void,
        onChunk: @escaping @MainActor (String) -> Void
    ) async throws -> GatewayResponse {
        if process == nil {
            try startProcess()
        }

        guard pendingContinuation == nil else {
            throw GatewayError.processStartFailed("send() called while another send() is in progress")
        }

        // 重置本条消息状态
        accumulated = ""
        statusFormatter = StatusFormatter()
        pendingCost = 0; pendingInputTokens = 0; pendingOutputTokens = 0
        pendingCacheRead = 0; pendingCacheWrite = 0
        pendingDurationAPI = 0; pendingDurationWall = 0
        pendingOnStatus = onStatus
        pendingOnChunk = onChunk

        // 向 stdin 写入用户消息
        let payload: [String: Any] = [
            "type": "user",
            "message": ["role": "user", "content": text]
        ]
        guard let data = try? JSONSerialization.data(withJSONObject: payload),
              let line = String(data: data, encoding: .utf8) else {
            throw GatewayError.processStartFailed("Failed to encode message")
        }
        if let writeData = (line + "\n").data(using: .utf8) {
            stdinHandle?.write(writeData)
        }

        // 等待 result 事件（最多 5 分钟，超时则杀掉子进程）
        let timeoutTask = Task { [weak self] in
            try await Task.sleep(nanoseconds: 300_000_000_000) // 5 min
            await self?.forceKillProcess()
        }
        do {
            let result = try await withCheckedThrowingContinuation { continuation in
                pendingContinuation = continuation
            }
            timeoutTask.cancel()
            return result
        } catch {
            timeoutTask.cancel()
            throw error
        }
    }

    func forceKillProcess() {
        process?.terminate()
        process = nil
        stdinHandle = nil
        stdoutPipe = nil
        if let cont = pendingContinuation {
            pendingContinuation = nil
            pendingOnStatus = nil
            pendingOnChunk = nil
            cont.resume(throwing: GatewayError.processCrashed)
        }
    }

    /// /new 命令：终止进程，清除 session
    func reset() async {
        guard process != nil else {
            currentSessionId = nil
            try? FileManager.default.removeItem(atPath: sessionPath)
            return
        }
        isResetting = true
        process?.terminate()
        // 等待 terminationHandler 通过 resetContinuation 通知
        await withCheckedContinuation { (continuation: CheckedContinuation<Void, Never>) in
            resetContinuation = continuation
        }
        currentSessionId = nil
        try? FileManager.default.removeItem(atPath: sessionPath)
    }

    // MARK: - 进程启动

    private func startProcess() throws {
        let proc = Process()

        // Run claude inside a login shell so all user configs (~/.zshrc etc.)
        // are loaded automatically — works for any shell/auth setup.
        var claudeArgs = [
            Config.claudePath,
            "--output-format", "stream-json",
            "--input-format", "stream-json",
            "--verbose",
            "--strict-mcp-config",
            "--permission-prompt-tool", "mcp__telegramclaude-permission__permissionRequest",
        ]
        if let mcpJson = McpPluginConfig.buildMcpConfigJSON() {
            claudeArgs += ["--mcp-config", mcpJson]
        }
        if let sid = currentSessionId {
            claudeArgs += ["--resume", sid]
        }
        // Shell-quote each argument and join into a single command string
        let claudeCmd = claudeArgs.map { arg in
            "'" + arg.replacingOccurrences(of: "'", with: "'\\''") + "'"
        }.joined(separator: " ")

        let userShell: String
        if let pw = getpwnam(NSUserName()), let sh = String(validatingUTF8: pw.pointee.pw_shell) {
            userShell = sh
        } else {
            userShell = "/bin/sh"
        }
        // -i: interactive mode (loads .zshrc/.bashrc), -l: login mode (loads .zprofile/.bash_profile)
        // fish uses --login instead of -l, and doesn't need -i to load config
        let shellArgs: [String] = userShell.hasSuffix("fish")
            ? ["--login", "-c", claudeCmd]
            : ["-i", "-l", "-c", claudeCmd]

        proc.executableURL = URL(fileURLWithPath: userShell)
        proc.arguments = shellArgs
        proc.currentDirectoryURL = URL(fileURLWithPath: Config.workDir)

        // Debug log
        let logMsg = "[\(Date())] shell=\(userShell) claudePath=\(Config.claudePath) bunPath=\(Config.bunPath)\ncmd=\(claudeCmd)\n"
        let logURL = URL(fileURLWithPath: "/tmp/telegramclaude_debug.log")
        if let fh = try? FileHandle(forWritingAtPath: logURL.path) {
            fh.seekToEndOfFile(); fh.write(logMsg.data(using: .utf8)!)
        } else { try? logMsg.data(using: .utf8)!.write(to: logURL) }

        let stdinPipe = Pipe()
        let outPipe = Pipe()
        proc.standardInput = stdinPipe
        proc.standardOutput = outPipe
        proc.standardError = FileHandle.nullDevice

        outPipe.fileHandleForReading.readabilityHandler = { [weak self] handle in
            let str = String(data: handle.availableData, encoding: .utf8) ?? ""
            guard !str.isEmpty else { return }
            let s = self
            Task { await s?.appendOutput(str) }
        }

        proc.terminationHandler = { [weak self, weak outPipe] _ in
            outPipe?.fileHandleForReading.readabilityHandler = nil
            let remaining = outPipe?.fileHandleForReading.readDataToEndOfFile() ?? Data()
            let str = String(data: remaining, encoding: .utf8) ?? ""
            let s = self
            Task { await s?.handleTermination(remaining: str) }
        }

        do {
            try proc.run()
        } catch {
            throw GatewayError.processStartFailed(error.localizedDescription)
        }

        process = proc
        stdinHandle = stdinPipe.fileHandleForWriting
        self.stdoutPipe = outPipe

        // 写入子进程 PID，供 PermissionRequest hook 做 session 检测
        let claudePid = "\(proc.processIdentifier)"
        try? claudePid.write(toFile: Config.appSupportDir + "/running.flag", atomically: true, encoding: .utf8)
    }

    // MARK: - stdout 解析

    private func appendOutput(_ str: String) {
        lineBuffer += str
        let lines = lineBuffer.components(separatedBy: "\n")
        lineBuffer = lines.last ?? ""
        for line in lines.dropLast() {
            processLine(line)
        }
    }

    private func processLine(_ line: String) {
        guard !line.trimmingCharacters(in: .whitespaces).isEmpty,
              let data = line.data(using: .utf8),
              let json = try? JSONSerialization.jsonObject(with: data) as? [String: Any] else { return }

        let type_ = json["type"] as? String

        // system/init：保存 session_id
        if type_ == "system", let sid = json["session_id"] as? String {
            currentSessionId = sid
            try? sid.write(toFile: sessionPath, atomically: true, encoding: .utf8)
        }

        // assistant：文本 chunk + 工具调用状态
        if type_ == "assistant",
           let message = json["message"] as? [String: Any],
           let content = message["content"] as? [[String: Any]] {
            for block in content {
                if block["type"] as? String == "text", let text = block["text"] as? String {
                    accumulated += text
                    let snapshot = accumulated
                    let cb = pendingOnChunk
                    Task { @MainActor in cb?(snapshot) }
                }
            }
            if let statusText = statusFormatter.handle(json: json), accumulated.isEmpty {
                let text = L("⚙️ Processing...\n\n", "⚙️ 处理中...\n\n") + statusText
                let cb = pendingOnStatus
                Task { @MainActor in cb?(text) }
            }
        }

        // result：费用/token/duration，resume continuation
        if type_ == "result" {
            if let cost = json["total_cost_usd"] as? Double { pendingCost = cost }
            if let d = json["duration_ms"] as? Int { pendingDurationWall = d }
            if let d = json["duration_api_ms"] as? Int { pendingDurationAPI = d }
            if let usage = json["usage"] as? [String: Any] {
                pendingInputTokens = usage["input_tokens"] as? Int ?? 0
                pendingOutputTokens = usage["output_tokens"] as? Int ?? 0
                pendingCacheRead = usage["cache_read_input_tokens"] as? Int ?? 0
                pendingCacheWrite = usage["cache_creation_input_tokens"] as? Int ?? 0
            }
            if accumulated.isEmpty, let text = json["result"] as? String {
                accumulated = text
                let cb = pendingOnChunk
                Task { @MainActor in cb?(text) }
            }
            resumeWithResult()
        }
    }

    private func resumeWithResult() {
        guard let cont = pendingContinuation else { return }
        pendingContinuation = nil
        pendingOnStatus = nil
        pendingOnChunk = nil
        cont.resume(returning: GatewayResponse(
            text: accumulated,
            cost: pendingCost,
            inputTokens: pendingInputTokens,
            outputTokens: pendingOutputTokens,
            cacheReadTokens: pendingCacheRead,
            cacheWriteTokens: pendingCacheWrite,
            durationAPIms: pendingDurationAPI,
            durationWallms: pendingDurationWall
        ))
    }

    // MARK: - 进程退出处理

    private func handleTermination(remaining: String) {
        process = nil
        stdinHandle = nil
        stdoutPipe = nil
        try? FileManager.default.removeItem(atPath: Config.appSupportDir + "/running.flag")

        // 先处理管道残留数据（可能含 result 行）
        if !remaining.isEmpty {
            appendOutput(remaining)
        }

        if isResetting {
            // 若有挂起的 send()，也将其失败
            if let pendCont = pendingContinuation {
                pendingContinuation = nil
                pendingOnStatus = nil
                pendingOnChunk = nil
                pendCont.resume(throwing: GatewayError.processCrashed)
            }
            isResetting = false
            let cont = resetContinuation
            resetContinuation = nil
            cont?.resume()
        } else if let cont = pendingContinuation {
            // 意外崩溃：通知 send() 调用方
            pendingContinuation = nil
            pendingOnStatus = nil
            pendingOnChunk = nil
            cont.resume(throwing: GatewayError.processCrashed)
        }
    }
}

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

    static let permRequestDir: String = {
        let dir = appSupportDir + "/perm_request"
        try? FileManager.default.createDirectory(atPath: dir, withIntermediateDirectories: true)
        return dir
    }()

    static let permResponseDir: String = {
        let dir = appSupportDir + "/perm_response"
        try? FileManager.default.createDirectory(atPath: dir, withIntermediateDirectories: true)
        return dir
    }()

    static let bunPath: String = {
        let home = NSHomeDirectory()
        let candidates = [
            home + "/.bun/bin/bun",
            home + "/.local/bin/bun",
            "/usr/local/bin/bun",
            "/opt/homebrew/bin/bun",
        ]
        return candidates.first { FileManager.default.isExecutableFile(atPath: $0) } ?? ""
    }()

    static let permServerPath: String = {
        let path = appSupportDir + "/perm-server.js"
        let script = #"""
import { writeFileSync, mkdirSync, existsSync, unlinkSync, readFileSync, appendFileSync } from 'fs'
import { homedir } from 'os'
import { join } from 'path'
import { createInterface } from 'readline'
import { randomBytes } from 'crypto'

const D = join(homedir(), 'Library', 'Application Support', 'TelegramClaude')
const Q = join(D, 'perm_request'), R = join(D, 'perm_response')
mkdirSync(Q, { recursive: true }); mkdirSync(R, { recursive: true })

const log = s => appendFileSync('/tmp/perm_mcp_debug.log', new Date().toISOString() + ' ' + s + '\n')
const send = m => { log('OUT: ' + JSON.stringify(m)); process.stdout.write(JSON.stringify(m) + '\n') }

const TOOLS = [{
  name: 'permissionRequest',
  description: 'Request permission to execute a tool',
  inputSchema: {
    type: 'object',
    properties: {
      tool_name: { type: 'string' },
      tool_input: { type: 'object' },
    },
    required: ['tool_name'],
  },
}]

async function handlePermissionRequest(id, tool_name, tool_input) {
  const reqId = randomBytes(4).toString('hex')
  const preview = JSON.stringify(tool_input ?? {})
  writeFileSync(join(Q, reqId + '.json'), JSON.stringify({
    request_id: reqId, tool_name, description: tool_name, input_preview: preview
  }))
  const dl = Date.now() + 300000
  while (Date.now() < dl) {
    const f = join(R, reqId + '.json')
    if (existsSync(f)) {
      let behavior = 'deny'
      try { behavior = JSON.parse(readFileSync(f, 'utf8')).behavior === 'allow' ? 'allow' : 'deny'; unlinkSync(f) } catch {}
      const resp = behavior === 'allow'
        ? { behavior: 'allow', updatedInput: tool_input ?? {} }
        : { behavior: 'deny', message: 'Denied via Telegram' }
      send({ jsonrpc: '2.0', id, result: { content: [{ type: 'text', text: JSON.stringify(resp) }] } })
      return
    }
    await new Promise(r => setTimeout(r, 500))
  }
  send({ jsonrpc: '2.0', id, result: { content: [{ type: 'text', text: JSON.stringify({ behavior: 'deny', message: 'Timeout' }) }] } })
}

createInterface({ input: process.stdin }).on('line', line => {
  if (!line.trim()) return
  log('IN: ' + line)
  let m; try { m = JSON.parse(line) } catch { return }
  if (m.method === 'initialize') {
    send({ jsonrpc: '2.0', id: m.id, result: {
      protocolVersion: m.params?.protocolVersion ?? '2024-11-05',
      capabilities: { tools: {} },
      serverInfo: { name: 'telegramclaude-permission', version: '2.0.0' },
    }})
    return
  }
  if (m.method === 'tools/list') { send({ jsonrpc: '2.0', id: m.id, result: { tools: TOOLS } }); return }
  if (m.method === 'tools/call' && m.params?.name === 'permissionRequest') {
    const args = m.params.arguments ?? {}
    const tool_name = args.tool_name
    const tool_input = args.tool_input ?? args.input ?? {}
    handlePermissionRequest(m.id, tool_name, tool_input)
    return
  }
  if (m.id != null) send({ jsonrpc: '2.0', id: m.id, error: { code: -32601, message: 'Method not found' } })
}).on('close', () => process.exit(0))
"""#
        try? script.write(toFile: path, atomically: true, encoding: .utf8)
        return path
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

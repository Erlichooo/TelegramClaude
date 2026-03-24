import Foundation

struct StatusFormatter {
    private(set) var lines: [String] = []
    private static let maxLines = 20

    /// 处理一条 stream-json 解析后的 JSON 对象。
    /// 如果是 tool_use 事件则追加状态行并返回新的状态文本，否则返回 nil。
    mutating func handle(json: [String: Any]) -> String? {
        // tool_use 嵌在 assistant message content 里
        guard json["type"] as? String == "assistant",
              let message = json["message"] as? [String: Any],
              let content = message["content"] as? [[String: Any]] else { return nil }

        var updated = false
        for block in content {
            guard block["type"] as? String == "tool_use",
                  let name = block["name"] as? String else { continue }
            let input = block["input"] as? [String: Any] ?? [:]
            lines.append(formatLine(name: name, input: input))
            if lines.count > Self.maxLines {
                lines.removeFirst()
            }
            updated = true
        }
        return updated ? buildText() : nil
    }

    func buildText() -> String {
        lines.joined(separator: "\n")
    }

    private func formatLine(name: String, input: [String: Any]) -> String {
        switch name {
        case "Read":
            let path = shortPath(input["file_path"] as? String ?? "")
            if let s = input["start_line"] as? Int, let e = input["end_line"] as? Int {
                return "● Read \(path) (lines \(s)-\(e))"
            }
            return "● Read \(path)"
        case "Write":
            return "● Write \(shortPath(input["file_path"] as? String ?? ""))"
        case "Edit", "MultiEdit":
            return "● Edit \(shortPath(input["file_path"] as? String ?? ""))"
        case "Bash":
            return "● Bash: \(input["command"] as? String ?? "")"
        case "Glob":
            return "● Glob \(input["pattern"] as? String ?? "")"
        case "Grep":
            return "● Grep \(input["pattern"] as? String ?? "")"
        case "TodoWrite", "TodoRead":
            return "● Update Todos"
        case "WebFetch":
            return "● WebFetch \(input["url"] as? String ?? "")"
        default:
            // MCP 工具：去掉 mcp__server__ 前缀
            let displayName = name.hasPrefix("mcp__")
                ? name.components(separatedBy: "__").last ?? name
                : name
            return "● \(displayName)"
        }
    }

    /// 只保留路径最后两段，避免消息过长
    private func shortPath(_ path: String) -> String {
        let parts = path.split(separator: "/")
        if parts.count <= 2 { return path }
        return parts.suffix(2).joined(separator: "/")
    }
}

// Sources/TelegramClaude/McpPluginConfig.swift
import Foundation

struct McpServer: Identifiable {
    let id: String          // pluginName
    let pluginName: String  // e.g. "telegram"
    let serverName: String  // e.g. "telegram"（来自 .mcp.json）
    let toolsWildcard: String
    let isRequired: Bool    // telegram 不可取消

    /// 官方插件命名规则：mcp__plugin_<pluginName>_<serverName>__*
    /// telegram 必选项直接用具体工具名（无 wildcard）
    static func wildcard(pluginName: String, serverName: String) -> String {
        "mcp__plugin_\(pluginName)_\(serverName)__*"
    }
}

enum McpPluginConfig {
    private static let configPath = Config.appSupportDir + "/config.json"

    // MARK: - 发现可用 MCP 服务器

    /// 读取 ~/.claude/settings.json enabledPlugins + 各插件 .mcp.json + ~/.mcp.json，返回可用服务器列表
    static func availableServers() -> [McpServer] {
        var servers: [McpServer] = [telegramRequiredServer()]

        // 1. Claude Code 官方插件（~/.claude/settings.json）
        let settingsPath = NSHomeDirectory() + "/.claude/settings.json"
        if let data = try? Data(contentsOf: URL(fileURLWithPath: settingsPath)),
           let json = try? JSONSerialization.jsonObject(with: data) as? [String: Any],
           let enabledPlugins = json["enabledPlugins"] as? [String: Any] {
            let pluginCacheBase = NSHomeDirectory() + "/.claude/plugins/cache/claude-plugins-official"
            for key in enabledPlugins.keys {
                guard let pluginName = key.components(separatedBy: "@").first,
                      pluginName != "telegram" else { continue }
                let pluginDir = "\(pluginCacheBase)/\(pluginName)"
                guard let versions = try? FileManager.default.contentsOfDirectory(atPath: pluginDir),
                      let latestVersion = versions.sorted().last else { continue }
                let mcpJsonPath = "\(pluginDir)/\(latestVersion)/.mcp.json"
                guard let mcpData = try? Data(contentsOf: URL(fileURLWithPath: mcpJsonPath)),
                      let mcpJson = try? JSONSerialization.jsonObject(with: mcpData) as? [String: Any],
                      let mcpServers = mcpJson["mcpServers"] as? [String: Any] else { continue }
                for serverName in mcpServers.keys {
                    servers.append(McpServer(
                        id: pluginName,
                        pluginName: pluginName,
                        serverName: serverName,
                        toolsWildcard: McpServer.wildcard(pluginName: pluginName, serverName: serverName),
                        isRequired: false
                    ))
                }
            }
        }

        // 2. 全局独立 MCP server（~/.mcp.json），工具名格式：mcp__<serverName>__*
        let globalMcpPath = NSHomeDirectory() + "/.mcp.json"
        if let data = try? Data(contentsOf: URL(fileURLWithPath: globalMcpPath)),
           let json = try? JSONSerialization.jsonObject(with: data) as? [String: Any],
           let mcpServers = json["mcpServers"] as? [String: Any] {
            for serverName in mcpServers.keys {
                servers.append(McpServer(
                    id: serverName,
                    pluginName: serverName,
                    serverName: serverName,
                    toolsWildcard: "mcp__\(serverName)__*",
                    isRequired: false
                ))
            }
        }

        return servers
    }

    // MARK: - 读写用户选择

    /// 从 config.json 读取用户已启用的 wildcards 列表
    static func enabledWildcards() -> [String] {
        guard let data = try? Data(contentsOf: URL(fileURLWithPath: configPath)),
              let json = try? JSONSerialization.jsonObject(with: data) as? [String: Any],
              let list = json["enabledMcpServers"] as? [String] else {
            return [telegramRequiredServer().toolsWildcard]
        }
        return list
    }

    /// 保存用户勾选结果到 config.json
    static func save(enabled: [McpServer]) {
        // telegram 必须项始终包含
        var wildcards = [telegramRequiredServer().toolsWildcard]
        for s in enabled where !s.isRequired {
            wildcards.append(s.toolsWildcard)
        }
        let json: [String: Any] = ["enabledMcpServers": wildcards]
        guard let data = try? JSONSerialization.data(withJSONObject: json, options: .prettyPrinted) else { return }
        try? data.write(to: URL(fileURLWithPath: configPath))
    }

    // MARK: - Private

    private static func telegramRequiredServer() -> McpServer {
        McpServer(
            id: "telegram",
            pluginName: "telegram",
            serverName: "telegram",
            toolsWildcard: "mcp__plugin_telegram_telegram__reply",
            isRequired: true
        )
    }
}

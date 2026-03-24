import SwiftUI

struct MenuBarView: View {
    @EnvironmentObject var bot: BotService
    @State private var launchAtLogin = LaunchAgent.isEnabled
    @AppStorage("language") private var languageKey: String = "en"

    private let timeFormatter: DateFormatter = {
        let f = DateFormatter()
        f.dateFormat = "HH:mm"
        return f
    }()

    var body: some View {
        VStack(alignment: .leading, spacing: 0) {

            // 状态栏
            HStack(spacing: 6) {
                Circle()
                    .fill(bot.isRunning ? Color.green : Color.gray)
                    .frame(width: 8, height: 8)
                Text(bot.statusMessage)
                    .font(.system(size: 13))
                Spacer()
                if bot.sessionCostUSD > 0 {
                    Text(String(format: "$%.4f", bot.sessionCostUSD))
                        .font(.system(size: 11, design: .monospaced))
                        .foregroundColor(.secondary)
                }
                Toggle("", isOn: Binding(
                    get: { bot.isRunning },
                    set: { on in on ? bot.start() : bot.stop() }
                ))
                .labelsHidden()
            }
            .padding(.horizontal, 12)
            .padding(.vertical, 10)

            Divider()

            // MCP 插件面板
            McpToolsPanel(mcpChangesPending: $bot.mcpChangesPending)
                .environmentObject(bot)
            Divider()

            // 消息列表
            if bot.messages.isEmpty {
                Text(L("No messages yet", "暂无消息"))
                    .font(.system(size: 12))
                    .foregroundColor(.secondary)
                    .frame(maxWidth: .infinity)
                    .padding(.vertical, 20)
            } else {
                ScrollViewReader { proxy in
                    ScrollView {
                        LazyVStack(alignment: .leading, spacing: 8) {
                            ForEach(bot.messages) { msg in
                                MessageRow(msg: msg, timeFormatter: timeFormatter)
                                    .id(msg.id)
                            }
                        }
                        .padding(10)
                    }
                    .frame(height: 280)
                    .onChange(of: bot.messages.count) { _ in
                        if let last = bot.messages.last {
                            withAnimation { proxy.scrollTo(last.id, anchor: .bottom) }
                        }
                    }
                }
            }

            Divider()

            // 底部操作
            HStack {
                Toggle(L("Launch at Login", "开机启动"), isOn: $launchAtLogin)
                    .font(.system(size: 12))
                    .onChange(of: launchAtLogin) { enabled in
                        LaunchAgent.setEnabled(enabled)
                    }
                Spacer()
                Button(Language.current == .english ? "中文" : "EN") {
                    Language.current = Language.current == .english ? .chinese : .english
                    languageKey = Language.current.rawValue
                }
                .buttonStyle(.plain)
                .font(.system(size: 12))
                .foregroundColor(.blue)
                Text("·").foregroundColor(.secondary)
                Button(L("Reset Session", "重置会话")) { Task { await bot.clearSession() } }
                    .buttonStyle(.plain)
                    .font(.system(size: 12))
                    .foregroundColor(.orange)
                Text("·").foregroundColor(.secondary)
                Button(L("Quit", "退出")) { NSApplication.shared.terminate(nil) }
                    .buttonStyle(.plain)
                    .font(.system(size: 12))
                    .foregroundColor(.secondary)
            }
            .padding(.horizontal, 12)
            .padding(.vertical, 8)
        }
        .frame(width: 320)
    }
}

struct MessageRow: View {
    let msg: ChatMessage
    let timeFormatter: DateFormatter

    var body: some View {
        VStack(alignment: msg.role == .user ? .trailing : .leading, spacing: 2) {
            HStack(spacing: 4) {
                if msg.role == .user { Spacer() }
                Text(msg.role == .user ? L("You", "你") : "Claude")
                    .font(.system(size: 10, weight: .medium))
                    .foregroundColor(.secondary)
                Text(timeFormatter.string(from: msg.time))
                    .font(.system(size: 10))
                    .foregroundColor(.secondary)
                if msg.role == .assistant { Spacer() }
            }

            Text(msg.text)
                .font(.system(size: 12))
                .padding(.horizontal, 10)
                .padding(.vertical, 6)
                .background(msg.role == .user ? Color.accentColor.opacity(0.15) : Color.secondary.opacity(0.1))
                .cornerRadius(10)
                .textSelection(.enabled)
                .frame(maxWidth: 240, alignment: msg.role == .user ? .trailing : .leading)
        }
        .frame(maxWidth: .infinity, alignment: msg.role == .user ? .trailing : .leading)
    }
}

struct McpToolsPanel: View {
    @EnvironmentObject var bot: BotService
    @Binding var mcpChangesPending: Bool
    @AppStorage("language") private var languageKey: String = "en"
    @State private var expanded = false
    @State private var servers: [McpServer] = []
    @State private var enabledIds: Set<String> = []

    var body: some View {
        VStack(alignment: .leading, spacing: 0) {
            // 标题行（可折叠）
            Button {
                expanded.toggle()
                if expanded && servers.isEmpty { reload() }
            } label: {
                HStack {
                    Text(expanded ? "▾" : "▸").font(.system(size: 11))
                    Text(L("MCP Tools", "MCP 工具")).font(.system(size: 12, weight: .medium))
                    Spacer()
                }
                .padding(.horizontal, 12)
                .padding(.vertical, 6)
                .contentShape(Rectangle())
            }
            .buttonStyle(.plain)

            if expanded {
                VStack(alignment: .leading, spacing: 4) {
                    ForEach(servers) { server in
                        HStack(spacing: 6) {
                            if server.isRequired {
                                Image(systemName: "checkmark.square.fill")
                                    .foregroundColor(.secondary)
                                    .font(.system(size: 13))
                            } else {
                                Image(systemName: enabledIds.contains(server.id)
                                      ? "checkmark.square.fill" : "square")
                                    .foregroundColor(enabledIds.contains(server.id) ? .accentColor : .secondary)
                                    .font(.system(size: 13))
                                    .onTapGesture { toggle(server) }
                            }
                            Text(server.pluginName.capitalized)
                                .font(.system(size: 12))
                            if server.isRequired {
                                Text(L("(required)", "（必选）"))
                                    .font(.system(size: 10))
                                    .foregroundColor(.secondary)
                            }
                        }
                    }
                    .padding(.horizontal, 16)

                    if mcpChangesPending {
                        Text(L("⚠ Reset session to apply changes", "⚠ 重置会话后生效"))
                            .font(.system(size: 11))
                            .foregroundColor(.orange)
                            .padding(.horizontal, 16)
                            .padding(.bottom, 4)
                    }
                }
                .padding(.bottom, 6)
            }
        }
    }

    private func reload() {
        servers = McpPluginConfig.availableServers()
        let wildcards = Set(McpPluginConfig.enabledWildcards())
        enabledIds = Set(servers.filter { wildcards.contains($0.toolsWildcard) }.map { $0.id })
    }

    private func toggle(_ server: McpServer) {
        if enabledIds.contains(server.id) {
            enabledIds.remove(server.id)
        } else {
            enabledIds.insert(server.id)
        }
        let enabledServers = servers.filter { enabledIds.contains($0.id) || $0.isRequired }
        McpPluginConfig.save(enabled: enabledServers)
        mcpChangesPending = true
    }
}

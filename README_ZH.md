[English](README.md)

# TelegramClaude

macOS menu bar 应用，通过持久化会话将 Telegram 接入 Claude Code。
以持久化 `claude --input-format stream-json` 子进程运行，上下文保留在内存中，
大幅降低 API 成本（cache hit 替代 cache write，约节省 12 倍费用）。

## 前置条件

1. **Claude Code** — 从 https://claude.ai/code 安装，`claude` 需在 PATH 中可用。

2. **Telegram bot** — 通过 [@BotFather](https://t.me/BotFather) 创建，复制 token。

3. **安装 Telegram 插件** — [claude.com/plugins/telegram](https://claude.com/plugins/telegram)

   在 Claude Code 终端运行：
   ```
   /plugin install telegram@claude-plugins-official
   ```
   > 需要先安装 [Bun](https://bun.sh)：`curl -fsSL https://bun.sh/install | bash`

4. **配置 bot token**：
   ```
   /telegram:configure
   ```
   粘贴 bot token，保存到 `~/.claude/channels/telegram/.env`。

5. **配对你的 Telegram 账户**：
   ```
   /telegram:access
   ```
   按提示将自己加入允许列表。

## 安装

1. 从 [Releases](../../releases/latest) 下载 `TelegramClaude.app.zip`
2. 解压后将 `TelegramClaude.app` 移入 `/Applications`
3. 首次启动：**右键 → 打开**（绕过 Gatekeeper，应用未签名）

## 使用

向你的 Telegram bot 发送消息即可。支持以下命令：

| 命令 | 说明 |
|------|------|
| `/new` | 重置会话，开始新对话 |
| `/cost` | 显示当前会话的 token 用量和费用 |

点击 menu bar 图标可查看消息记录、管理 MCP 工具、切换语言或重置会话。

## 工作原理

```
Telegram ←──────────────── BotService（长轮询 + Telegram Bot API）
                                      │
                               ClaudeGateway
                                      │
                          claude --input-format stream-json
                               --strict-mcp-config
```

每次 App 启动只启动一个 `claude` 子进程，跨消息保持活跃。
BotService 直接轮询 Telegram，将消息通过 stdin 发给 Claude，
并将 Claude 的文本输出以 MarkdownV2 格式发回 Telegram。

上下文驻留进程内存，Anthropic prompt cache 在每条消息后持续命中。

`--strict-mcp-config` 确保子进程不加载 Telegram MCP server，
所有 Telegram API 调用都由 BotService 统一处理。

## 配置

会话数据存储于 `~/Library/Application Support/TelegramClaude/`。

添加 MCP 工具：点击 menu bar 图标 → 展开 **MCP 工具** → 勾选所需插件 → 重置会话生效。

## 从源码构建

```bash
git clone https://github.com/Erlichooo/TelegramClaude
cd TelegramClaude
bash build.sh          # release 构建（优化版）
# 或
bash build.sh --debug  # debug 构建（编译更快）
open TelegramClaude.app
```

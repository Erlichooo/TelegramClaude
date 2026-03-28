[English](README.md)

# TelegramClaude

macOS menu bar 应用，通过持久化会话将 Telegram 接入 Claude Code。
以持久化 `claude --input-format stream-json` 子进程运行，上下文保留在内存中，
大幅降低 API 成本（cache hit 替代 cache write，约节省 12 倍费用）。

## 前置条件

1. **Claude Code** — 从 https://claude.ai/code 安装，`claude` 需在 PATH 中可用。

2. **Telegram bot** — 通过 [@BotFather](https://t.me/BotFather) 创建，复制 token。

3. **[bun](https://bun.sh)** — 权限中继服务器所需运行时。
   ```bash
   curl -fsSL https://bun.sh/install | bash
   ```

4. **保存 bot token** — 创建 `~/.claude/channels/telegram/.env`：

   ```
   TELEGRAM_BOT_TOKEN=<你的token>
   ```

5. **设置允许的 Telegram 用户 ID** — 创建 `~/.claude/channels/telegram/access.json`：

   ```json
   {"allowFrom": ["<你的telegram用户ID>"]}
   ```

   > 查询自己的 Telegram 用户 ID：向 [@userinfobot](https://t.me/userinfobot) 发送任意消息。
   > 允许多个用户或群组：在数组中添加更多 ID，群组 ID 为负数。

   **快捷方式：** 如果已安装 [Telegram 插件](https://claude.com/plugins/telegram)，
   可在 Claude Code 中运行 `/telegram:configure` 和 `/telegram:access` 代替手动创建。

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

### 权限中继

当 Claude 需要调用工具（Bash、WebFetch、文件写入等）时，权限请求会以 inline 消息的形式转发到 Telegram，附带 **Allow / Deny** 按钮。

- 点击 **See more** 查看完整的工具输入内容再决定
- 点击 **✅ Allow** 允许 Claude 继续执行
- 点击 **❌ Deny** 拒绝该操作

响应后权限消息自动消失。所有授权均为一次性——同一工具下次仍会重新询问。

## 工作原理

```
Telegram ←──────────────── BotService（长轮询 + Telegram Bot API）
                                      │
                               ClaudeGateway
                                      │
                          claude --input-format stream-json
                               --strict-mcp-config
                               --permission-prompt-tool mcp__telegramclaude-permission__permissionRequest
                                      │
                             perm-server.js（bun，MCP）
                                      │
                          ~/Library/Application Support/TelegramClaude/
                             perm_request/   perm_response/
```

每次 App 启动只启动一个 `claude` 子进程，跨消息保持活跃。
BotService 直接轮询 Telegram，将消息通过 stdin 发给 Claude，
并将 Claude 的文本输出以 MarkdownV2 格式发回 Telegram。

上下文驻留进程内存，Anthropic prompt cache 在每条消息后持续命中。

当 Claude 请求工具权限时，`--permission-prompt-tool` 将请求路由到内置 MCP 服务器
（`perm-server.js`，由 `bun` 运行）。服务器写入请求文件，BotService 检测到后发送
Telegram inline 消息，用户的响应被写回供 MCP 服务器读取并转发给 Claude。

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

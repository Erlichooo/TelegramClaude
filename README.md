[中文版](README_ZH.md)

# TelegramClaude

A macOS menu bar app that connects Telegram to Claude Code via a persistent session.
Runs `claude --input-format stream-json` as a persistent subprocess, keeping context
in memory for dramatically lower API costs (cache hits instead of cache writes).

## Prerequisites

1. **Claude Code** — install from https://claude.ai/code
   `claude` must be available in your PATH.

2. **Telegram bot** — create via [@BotFather](https://t.me/BotFather), copy the token.

3. **[bun](https://bun.sh)** — required for the permission relay server.
   ```bash
   curl -fsSL https://bun.sh/install | bash
   ```

4. **Save your bot token** — create `~/.claude/channels/telegram/.env`:
   ```
   TELEGRAM_BOT_TOKEN=<your_token>
   ```

5. **Set your allowed Telegram user ID** — create `~/.claude/channels/telegram/access.json`:
   ```json
   {"allowFrom": ["<your_telegram_user_id>"]}
   ```
   > To find your Telegram user ID, message [@userinfobot](https://t.me/userinfobot).
   > To allow multiple users or groups, add more IDs to the array. Group IDs are negative numbers.

   **Shortcut:** if you have the [Telegram plugin](https://claude.com/plugins/telegram) installed,
   you can run `/telegram:configure` and `/telegram:access` in Claude Code instead.

## Installation

1. Download `TelegramClaude.app.zip` from [Releases](../../releases/latest)
2. Unzip and move `TelegramClaude.app` to `/Applications`
3. **Right-click → Open** on first launch (bypasses Gatekeeper — app is not signed)

## Usage

Send messages to your Telegram bot. Available commands:

| Command | Description |
|---------|-------------|
| `/new` | Reset session and start a fresh conversation |
| `/cost` | Show token usage and cost for the current session |

The menu bar icon shows app status. Click it to see the message history,
toggle MCP tools, switch language, or reset the session.

### Permission relay

When Claude needs to use a tool (Bash, WebFetch, file writes, etc.), the request is
forwarded to Telegram as an inline message with **Allow / Deny** buttons.

- Tap **See more** to expand the full tool input before deciding
- Tap **✅ Allow** to let Claude proceed
- Tap **❌ Deny** to block the action

The permission message disappears automatically after you respond.
All permissions are one-time — the same tool will ask again next time.

## How It Works

```
Telegram ←──────────────────── BotService (long-polling + Telegram Bot API)
                                        │
                                 ClaudeGateway
                                        │
                           claude --input-format stream-json
                                --strict-mcp-config
                                --permission-prompt-tool mcp__telegramclaude-permission__permissionRequest
                                        │
                              perm-server.js (bun, MCP)
                                        │
                           ~/Library/Application Support/TelegramClaude/
                              perm_request/   perm_response/
```

Each app launch starts one `claude` subprocess that stays alive across messages.
BotService polls Telegram directly, forwards messages to Claude via stdin, and
sends Claude's responses back to Telegram rendered as MarkdownV2.

Context lives in process memory, so Anthropic prompt cache hits on every message
(after the first), cutting costs ~12× compared to spawning per message.

When Claude requests tool permission, `--permission-prompt-tool` routes the request
to an embedded MCP server (`perm-server.js`, run by `bun`). The server writes a
request file, BotService detects it and sends the inline Telegram message, and the
user's response is written back for the MCP server to pick up and relay to Claude.

`--strict-mcp-config` ensures the Claude subprocess never loads the Telegram MCP
server — all Telegram API calls go through BotService only.

## Configuration

Session data is stored in `~/Library/Application Support/TelegramClaude/`.

To add MCP tools: click the menu bar icon → expand **MCP Tools** → check the plugins
you want, then reset the session.

## Building from Source

```bash
git clone https://github.com/Erlichooo/TelegramClaude
cd TelegramClaude
bash build.sh        # release build (optimised)
# or
bash build.sh --debug   # debug build (faster compile)
open TelegramClaude.app
```

[中文版](README_ZH.md)

# TelegramClaude

A macOS menu bar app that connects Telegram to Claude Code via a persistent session.
Runs `claude --input-format stream-json` as a persistent subprocess, keeping context
in memory for dramatically lower API costs (cache hits instead of cache writes).

## Prerequisites

1. **Claude Code** — install from https://claude.ai/code
   `claude` must be available in your PATH.

2. **Telegram bot** — create via [@BotFather](https://t.me/BotFather), copy the token.

3. **Install the Telegram plugin** — [claude.com/plugins/telegram](https://claude.com/plugins/telegram)

   In a Claude Code terminal:
   ```
   /plugin install telegram@claude-plugins-official
   ```
   > Requires [Bun](https://bun.sh): `curl -fsSL https://bun.sh/install | bash`

4. **Configure your bot token**:
   ```
   /telegram:configure
   ```
   Paste your bot token when prompted. Saved to `~/.claude/channels/telegram/.env`.

5. **Pair your Telegram account**:
   ```
   /telegram:access
   ```
   Follow the instructions to approve yourself as an allowed user.

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

## How It Works

```
Telegram → BotService (polling) → ClaudeGateway (persistent subprocess)
                                        ↓
                           claude --input-format stream-json
                                        ↓
                        mcp__plugin_telegram_telegram__reply
```

Each App launch starts one `claude` subprocess that stays alive across messages.
Context lives in process memory, so Anthropic prompt cache hits on every message
(after the first), cutting costs ~12× compared to spawning per message.

## Configuration

Session data is stored in `~/Library/Application Support/TelegramClaude/`.

To add MCP tools: click the menu bar icon → expand **MCP Tools** → check the plugins
you want, then reset the session.

## Building from Source

```bash
git clone https://github.com/<you>/TelegramClaude
cd TelegramClaude
bash build.sh
open TelegramClaude.app
```

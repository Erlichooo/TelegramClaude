#!/bin/bash
set -e

PROJ_DIR="$(cd "$(dirname "$0")" && pwd)"
APP_NAME="TelegramClaude"
APP_BUNDLE="$PROJ_DIR/$APP_NAME.app"

echo "▶ Building..."
cd "$PROJ_DIR"
swift build -c release 2>&1

BINARY=".build/release/$APP_NAME"

echo "▶ Creating .app bundle..."
rm -rf "$APP_BUNDLE"
mkdir -p "$APP_BUNDLE/Contents/MacOS"
mkdir -p "$APP_BUNDLE/Contents/Resources"

cp "$BINARY" "$APP_BUNDLE/Contents/MacOS/$APP_NAME"

cat > "$APP_BUNDLE/Contents/Info.plist" << 'EOF'
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>CFBundleName</key>
    <string>TelegramClaude</string>
    <key>CFBundleIdentifier</key>
    <string>com.gnoli.telegramclaude</string>
    <key>CFBundleVersion</key>
    <string>1.0</string>
    <key>CFBundleExecutable</key>
    <string>TelegramClaude</string>
    <key>CFBundlePackageType</key>
    <string>APPL</string>
    <key>LSUIElement</key>
    <true/>
    <key>NSHighResolutionCapable</key>
    <true/>
    <key>NSSpeechRecognitionUsageDescription</key>
    <string>Used to transcribe Telegram voice messages</string>
    <key>NSMicrophoneUsageDescription</key>
    <string>Required for voice message transcription</string>
</dict>
</plist>
EOF

echo "✓ Built: $APP_BUNDLE"
echo ""
echo "Run: open \"$APP_BUNDLE\""
echo "Install to Applications: cp -r \"$APP_BUNDLE\" /Applications/"

// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "TelegramClaude",
    platforms: [.macOS(.v13)],
    targets: [
        .executableTarget(
            name: "TelegramClaude",
            path: "Sources/TelegramClaude",
            exclude: ["Info.plist"],
            resources: [.process("converter.js")]
        )
    ]
)

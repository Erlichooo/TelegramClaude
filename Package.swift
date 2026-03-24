// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "TelegramClaude",
    platforms: [.macOS(.v13)],
    targets: [
        .target(
            name: "TelegramClaudeCore",
            path: "Sources/TelegramClaudeCore"
        ),
        .executableTarget(
            name: "TelegramClaude",
            dependencies: ["TelegramClaudeCore"],
            path: "Sources/TelegramClaude"
        ),
        .testTarget(
            name: "TelegramClaudeTests",
            dependencies: ["TelegramClaudeCore"],
            path: "Tests/TelegramClaudeTests"
        )
    ]
)

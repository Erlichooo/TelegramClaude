import XCTest
@testable import TelegramClaudeCore

final class MarkdownRendererTests: XCTestCase {
    func testPlaceholder() {
        XCTAssertEqual(MarkdownRenderer.toMarkdownV2("hello"), "hello")
    }
}

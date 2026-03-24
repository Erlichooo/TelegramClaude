import XCTest
@testable import TelegramClaudeCore

final class MarkdownRendererTests: XCTestCase {
    func testPlaceholder() {
        XCTAssertEqual(MarkdownRenderer.toMarkdownV2("hello"), "hello")
    }

    // MARK: - Escape helpers

    func testEscapePlainText() {
        // All MarkdownV2 special chars get backslash-prefixed
        XCTAssertEqual(MarkdownRenderer.testEscapePlainText("hello"), "hello")
        XCTAssertEqual(MarkdownRenderer.testEscapePlainText("a_b"), "a\\_b")
        XCTAssertEqual(MarkdownRenderer.testEscapePlainText("a*b"), "a\\*b")
        XCTAssertEqual(MarkdownRenderer.testEscapePlainText("a.b!"), "a\\.b\\!")
        XCTAssertEqual(MarkdownRenderer.testEscapePlainText("a`b"), "a\\`b")
        XCTAssertEqual(MarkdownRenderer.testEscapePlainText("a|b"), "a\\|b")
        XCTAssertEqual(MarkdownRenderer.testEscapePlainText("a\\b"), "a\\\\b")
    }

    func testEscapeCodeContent() {
        // Only ` and \ are escaped
        XCTAssertEqual(MarkdownRenderer.testEscapeCodeContent("a_b"), "a_b")
        XCTAssertEqual(MarkdownRenderer.testEscapeCodeContent("a`b"), "a\\`b")
        XCTAssertEqual(MarkdownRenderer.testEscapeCodeContent("a\\b"), "a\\\\b")
    }

    func testEscapeURL() {
        // Only ) and \ are escaped
        XCTAssertEqual(MarkdownRenderer.testEscapeURL("https://x.com"), "https://x.com")
        XCTAssertEqual(MarkdownRenderer.testEscapeURL("url)end"), "url\\)end")
        XCTAssertEqual(MarkdownRenderer.testEscapeURL("url\\end"), "url\\\\end")
    }
}

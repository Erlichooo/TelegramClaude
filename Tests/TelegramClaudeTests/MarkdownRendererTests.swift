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

    // MARK: - PlaceholderStore

    func testPlaceholderStoreRoundtrip() {
        var store = MarkdownRenderer.PlaceholderStore()
        let imgPH = store.storeImage(alt: "my alt")
        let codePH = store.storeCode("fmt(x)")
        let linkPH = store.storeLink(text: "click", url: "https://x.com")
        let boldPH = store.storeBold("important")

        XCTAssertEqual(imgPH,  "TCPH_IMG_0")
        XCTAssertEqual(codePH, "TCPH_CODE_0")
        XCTAssertEqual(linkPH, "TCPH_LINK_0")
        XCTAssertEqual(boldPH, "TCPH_B_0")
        XCTAssertEqual(store.images[0], "my alt")
        XCTAssertEqual(store.codes[0], "fmt(x)")
        XCTAssertEqual(store.links[0].text, "click")
        XCTAssertEqual(store.links[0].url, "https://x.com")
        XCTAssertEqual(store.bolds[0], "important")
    }
}

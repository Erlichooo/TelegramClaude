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

        XCTAssertEqual(imgPH,  "TCPHIMG0Z")
        XCTAssertEqual(codePH, "TCPHCOD0Z")
        XCTAssertEqual(linkPH, "TCPHLNK0Z")
        XCTAssertEqual(boldPH, "TCPHB0Z")
        XCTAssertEqual(store.images[0], "my alt")
        XCTAssertEqual(store.codes[0], "fmt(x)")
        XCTAssertEqual(store.links[0].text, "click")
        XCTAssertEqual(store.links[0].url, "https://x.com")
        XCTAssertEqual(store.bolds[0], "important")
    }

    // MARK: - Inline extraction

    func testInlineImageExtracted() {
        // Image becomes its alt text (escaped)
        XCTAssertEqual(MarkdownRenderer.toMarkdownV2("see ![my pic](https://x.com/a.png) here"),
                       "see my pic here")
    }

    func testInlineCodeExtracted() {
        // Backtick code: content only escapes ` and \
        XCTAssertEqual(MarkdownRenderer.toMarkdownV2("`hello`"), "`hello`")
        XCTAssertEqual(MarkdownRenderer.toMarkdownV2("`a_b`"), "`a_b`")   // _ NOT escaped inside code
        XCTAssertEqual(MarkdownRenderer.toMarkdownV2("`a\\b`"), "`a\\\\b`")
    }

    func testInlineLinkExtracted() {
        XCTAssertEqual(MarkdownRenderer.toMarkdownV2("[click](https://x.com)"),
                       "[click](https://x.com)")
        // Link text gets plain-text escaping
        XCTAssertEqual(MarkdownRenderer.toMarkdownV2("[a.b](https://x.com)"),
                       "[a\\.b](https://x.com)")
    }

    func testImageBeforeLink() {
        // ![alt](url) must not be matched as a link [alt](url)
        XCTAssertEqual(MarkdownRenderer.toMarkdownV2("![pic](https://x.com)"), "pic")
    }

    // MARK: - Formatting markers

    func testBold() {
        XCTAssertEqual(MarkdownRenderer.toMarkdownV2("**hello**"), "*hello*")
        XCTAssertEqual(MarkdownRenderer.toMarkdownV2("**a.b**"), "*a\\.b*")
    }

    func testBoldUnderscore() {
        XCTAssertEqual(MarkdownRenderer.toMarkdownV2("__hello__"), "*hello*")
        XCTAssertEqual(MarkdownRenderer.toMarkdownV2("snake_case"), "snake\\_case")
    }

    func testItalic() {
        XCTAssertEqual(MarkdownRenderer.toMarkdownV2("*hello*"), "_hello_")
        XCTAssertEqual(MarkdownRenderer.toMarkdownV2("_hello_"), "_hello_")
    }

    func testBoldItalic() {
        XCTAssertEqual(MarkdownRenderer.toMarkdownV2("***hello***"), "*_hello_*")
        XCTAssertEqual(MarkdownRenderer.toMarkdownV2("___hello___"), "*_hello_*")
    }

    func testStrikethrough() {
        XCTAssertEqual(MarkdownRenderer.toMarkdownV2("~~hello~~"), "~hello~")
        XCTAssertEqual(MarkdownRenderer.toMarkdownV2("~~a.b~~"), "~a\\.b~")
    }

    func testBoldDoesNotMatchSingleUnderscore() {
        XCTAssertEqual(MarkdownRenderer.toMarkdownV2("a_b_c"), "a\\_b\\_c")
    }

    // MARK: - Block: code fences

    func testCodeFencePassthrough() {
        let input = "```swift\nlet x = 1\n```"
        let expected = "```swift\nlet x = 1\n```"
        XCTAssertEqual(MarkdownRenderer.toMarkdownV2(input), expected)
    }

    func testCodeFenceEscapesBacktickAndBackslash() {
        let input = "```\na`b\nc\\d\n```"
        let expected = "```\na\\`b\nc\\\\d\n```"
        XCTAssertEqual(MarkdownRenderer.toMarkdownV2(input), expected)
    }

    func testCodeFenceDoesNotEscapeOtherChars() {
        let input = "```\na_b *c*\n```"
        let expected = "```\na_b *c*\n```"
        XCTAssertEqual(MarkdownRenderer.toMarkdownV2(input), expected)
    }

    func testNonFenceLinesStillProcessed() {
        let input = "**bold**\n```\ncode\n```\n**after**"
        let expected = "*bold*\n```\ncode\n```\n*after*"
        XCTAssertEqual(MarkdownRenderer.toMarkdownV2(input), expected)
    }
}

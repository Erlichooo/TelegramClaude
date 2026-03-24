import Foundation

public enum MarkdownRenderer {

    // MARK: - Public API

    public static func toMarkdownV2(_ gfm: String) -> String {
        processInline(gfm)
    }

    private static func processInline(_ text: String) -> String {
        var store = PlaceholderStore()
        var s = text
        s = extractImages(s, store: &store)  // step 1
        s = extractCode(s, store: &store)    // step 2
        s = extractLinks(s, store: &store)       // step 3
        s = extractBoldItalic(s, store: &store)  // step 4
        s = extractBold(s, store: &store)        // step 5
        s = extractItalic(s, store: &store)      // step 6
        s = extractStrike(s, store: &store)      // step 7
        s = escapePlainTextPreservingPlaceholders(s)  // step 8
        s = restorePlaceholders(s, store: store)      // step 9
        return s
    }

    private static func escapePlainTextPreservingPlaceholders(_ text: String) -> String {
        // Split on placeholder tokens, escape only the non-placeholder segments
        let pattern = #"TCPH(?:IMG|COD|LNK|BI|B|I|S)\d+Z"#
        guard let regex = try? NSRegularExpression(pattern: pattern) else {
            assertionFailure("Invalid placeholder regex")
            return escapePlainText(text)
        }
        var result = ""
        var lastEnd = text.startIndex
        for match in regex.matches(in: text, range: NSRange(text.startIndex..., in: text)) {
            guard let matchRange = Range(match.range, in: text) else { continue }
            // Escape the segment before this placeholder
            result += escapePlainText(String(text[lastEnd..<matchRange.lowerBound]))
            // Pass the placeholder through unmodified
            result += String(text[matchRange])
            lastEnd = matchRange.upperBound
        }
        // Escape the remaining segment after the last placeholder
        result += escapePlainText(String(text[lastEnd...]))
        return result
    }

    // MARK: - Regex utility

    /// Iterates over all matches of `pattern` in `string`.
    /// Calls `transform(groups)` for each match where groups[0] is the full match,
    /// groups[1...] are capture groups. Returns the rebuilt string.
    static func regexReplace(
        _ pattern: String,
        in string: String,
        options: NSRegularExpression.Options = [],
        using transform: ([String]) -> String
    ) -> String {
        guard let regex = try? NSRegularExpression(pattern: pattern, options: options) else {
            assertionFailure("Invalid regex pattern: \(pattern)")
            return string
        }
        var result = ""
        var lastEnd = string.startIndex
        for match in regex.matches(in: string, range: NSRange(string.startIndex..., in: string)) {
            guard let matchRange = Range(match.range, in: string) else { continue }
            result += string[lastEnd..<matchRange.lowerBound]
            var groups = [String(string[matchRange])]
            for i in 1..<match.numberOfRanges {
                if let r = Range(match.range(at: i), in: string) {
                    groups.append(String(string[r]))
                } else {
                    groups.append("")
                }
            }
            result += transform(groups)
            lastEnd = matchRange.upperBound
        }
        result += string[lastEnd...]
        return result
    }

    // MARK: - Escape helpers

    private static let plainTextSpecialChars: Set<Character> = [
        "_", "*", "[", "]", "(", ")", "~", "\\", "`", ">",
        "#", "+", "-", "=", "|", "{", "}", ".", "!"
    ]

    static func escapePlainText(_ text: String) -> String {
        var result = ""
        result.reserveCapacity(text.count + 8)
        for ch in text {
            if plainTextSpecialChars.contains(ch) { result += "\\" }
            result.append(ch)
        }
        return result
    }

    static func escapeCodeContent(_ text: String) -> String {
        text.replacingOccurrences(of: "\\", with: "\\\\")
            .replacingOccurrences(of: "`", with: "\\`")
    }

    static func escapeURL(_ url: String) -> String {
        url.replacingOccurrences(of: "\\", with: "\\\\")
           .replacingOccurrences(of: ")", with: "\\)")
    }

    // MARK: - Test-visible wrappers (internal access for tests via @testable import)

    public static func testEscapePlainText(_ s: String) -> String { escapePlainText(s) }
    public static func testEscapeCodeContent(_ s: String) -> String { escapeCodeContent(s) }
    public static func testEscapeURL(_ s: String) -> String { escapeURL(s) }

    // MARK: - Inline extraction helpers

    private static func extractImages(_ s: String, store: inout PlaceholderStore) -> String {
        // Must run before link extraction to prevent ![alt](url) matching as [alt](url)
        regexReplace(#"!\[([^\]]*)\]\([^)]*\)"#, in: s) { groups in
            store.storeImage(alt: groups[1])
        }
    }

    private static func extractCode(_ s: String, store: inout PlaceholderStore) -> String {
        regexReplace(#"`([^`]+)`"#, in: s) { groups in
            store.storeCode(groups[1])
        }
    }

    private static func extractLinks(_ s: String, store: inout PlaceholderStore) -> String {
        regexReplace(#"\[([^\]]+)\]\(([^)]+)\)"#, in: s) { groups in
            store.storeLink(text: groups[1], url: groups[2])
        }
    }

    private static func extractBoldItalic(_ s: String, store: inout PlaceholderStore) -> String {
        var result = regexReplace(#"\*{3}(.+?)\*{3}"#, in: s) { groups in
            store.storeBoldItalic(groups[1])
        }
        result = regexReplace(#"_{3}(.+?)_{3}"#, in: result) { groups in
            store.storeBoldItalic(groups[1])
        }
        return result
    }

    private static func extractBold(_ s: String, store: inout PlaceholderStore) -> String {
        var result = regexReplace(#"\*{2}(.+?)\*{2}"#, in: s) { groups in
            store.storeBold(groups[1])
        }
        result = regexReplace(#"(?<![_])_{2}(?![_])(.+?)(?<![_])_{2}(?![_])"#, in: result) { groups in
            store.storeBold(groups[1])
        }
        return result
    }

    private static func extractItalic(_ s: String, store: inout PlaceholderStore) -> String {
        var result = regexReplace(#"(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)"#, in: s) { groups in
            store.storeItalic(groups[1])
        }
        // GFM rule: _ opener must NOT be preceded by alphanumeric (handles snake_case).
        // _ closer must NOT be followed by alphanumeric.
        result = regexReplace(#"(?<![a-zA-Z0-9])_(?![_\s])(.+?)(?<![_\s])_(?![a-zA-Z0-9_])"#, in: result) { groups in
            store.storeItalic(groups[1])
        }
        return result
    }

    private static func extractStrike(_ s: String, store: inout PlaceholderStore) -> String {
        regexReplace(#"~~(.+?)~~"#, in: s) { groups in
            store.storeStrike(groups[1])
        }
    }

    // MARK: - Placeholder restoration

    private static func restorePlaceholders(_ s: String, store: PlaceholderStore) -> String {
        var result = s

        // Images: alt text escaped as plain text
        for (i, alt) in store.images.enumerated() {
            result = result.replacingOccurrences(of: "TCPHIMG\(i)Z", with: escapePlainText(alt))
        }

        // Code: wrap in backticks, escape only ` and \
        for (i, code) in store.codes.enumerated() {
            result = result.replacingOccurrences(of: "TCPHCOD\(i)Z",
                                                 with: "`\(escapeCodeContent(code))`")
        }

        // Links: [escaped_text](escaped_url)
        for (i, link) in store.links.enumerated() {
            let text = escapePlainText(link.text)
            let url  = escapeURL(link.url)
            result = result.replacingOccurrences(of: "TCPHLNK\(i)Z",
                                                 with: "[\(text)](\(url))")
        }

        // Bold-italic: *_content_*
        for (i, c) in store.boldItalics.enumerated() {
            result = result.replacingOccurrences(of: "TCPHBI\(i)Z",
                                                 with: "*_\(escapePlainText(c))_*")
        }

        // Bold: *content*
        for (i, c) in store.bolds.enumerated() {
            result = result.replacingOccurrences(of: "TCPHB\(i)Z",
                                                 with: "*\(escapePlainText(c))*")
        }

        // Italic: _content_
        for (i, c) in store.italics.enumerated() {
            result = result.replacingOccurrences(of: "TCPHI\(i)Z",
                                                 with: "_\(escapePlainText(c))_")
        }

        // Strike: ~content~
        for (i, c) in store.strikes.enumerated() {
            result = result.replacingOccurrences(of: "TCPHS\(i)Z",
                                                 with: "~\(escapePlainText(c))~")
        }

        return result
    }

    // MARK: - PlaceholderStore

    struct PlaceholderStore {
        private(set) var images: [String] = []
        private(set) var codes: [String] = []
        private(set) var links: [(text: String, url: String)] = []
        private(set) var boldItalics: [String] = []
        private(set) var bolds: [String] = []
        private(set) var italics: [String] = []
        private(set) var strikes: [String] = []

        // Token format: TCPH{TYPE}{index}Z  — no underscores, Z-suffix prevents index prefix collisions
        mutating func storeImage(alt: String) -> String {
            images.append(alt); return "TCPHIMG\(images.count - 1)Z"
        }
        mutating func storeCode(_ c: String) -> String {
            codes.append(c); return "TCPHCOD\(codes.count - 1)Z"
        }
        mutating func storeLink(text: String, url: String) -> String {
            links.append((text, url)); return "TCPHLNK\(links.count - 1)Z"
        }
        mutating func storeBoldItalic(_ c: String) -> String {
            boldItalics.append(c); return "TCPHBI\(boldItalics.count - 1)Z"
        }
        mutating func storeBold(_ c: String) -> String {
            bolds.append(c); return "TCPHB\(bolds.count - 1)Z"
        }
        mutating func storeItalic(_ c: String) -> String {
            italics.append(c); return "TCPHI\(italics.count - 1)Z"
        }
        mutating func storeStrike(_ c: String) -> String {
            strikes.append(c); return "TCPHS\(strikes.count - 1)Z"
        }
    }
}

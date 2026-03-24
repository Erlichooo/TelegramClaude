import Foundation

public enum MarkdownRenderer {

    // MARK: - Public API

    public static func toMarkdownV2(_ gfm: String) -> String {
        return gfm  // placeholder — implemented in later tasks
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

    // MARK: - PlaceholderStore

    struct PlaceholderStore {
        private(set) var images: [String] = []
        private(set) var codes: [String] = []
        private(set) var links: [(text: String, url: String)] = []
        private(set) var boldItalics: [String] = []
        private(set) var bolds: [String] = []
        private(set) var italics: [String] = []
        private(set) var strikes: [String] = []

        mutating func storeImage(alt: String) -> String {
            images.append(alt); return "TCPH_IMG_\(images.count - 1)"
        }
        mutating func storeCode(_ c: String) -> String {
            codes.append(c); return "TCPH_CODE_\(codes.count - 1)"
        }
        mutating func storeLink(text: String, url: String) -> String {
            links.append((text, url)); return "TCPH_LINK_\(links.count - 1)"
        }
        mutating func storeBoldItalic(_ c: String) -> String {
            boldItalics.append(c); return "TCPH_BI_\(boldItalics.count - 1)"
        }
        mutating func storeBold(_ c: String) -> String {
            bolds.append(c); return "TCPH_B_\(bolds.count - 1)"
        }
        mutating func storeItalic(_ c: String) -> String {
            italics.append(c); return "TCPH_I_\(italics.count - 1)"
        }
        mutating func storeStrike(_ c: String) -> String {
            strikes.append(c); return "TCPH_S_\(strikes.count - 1)"
        }
    }
}

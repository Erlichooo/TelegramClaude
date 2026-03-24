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
}

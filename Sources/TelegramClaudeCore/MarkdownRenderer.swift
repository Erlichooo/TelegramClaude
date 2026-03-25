import Foundation

public enum MarkdownRenderer {

    // MARK: - Public API

    public static func toMarkdownV2(_ gfm: String) -> String {
        let lines = gfm.components(separatedBy: "\n")
        var output: [String] = []
        var inPre = false

        // Table accumulation state
        var tableOrigLines: [String] = []
        var tableRows: [[String]] = []
        var tableHeaderCount = 0
        var tableHasSeparator = false

        func parseTableRow(_ line: String) -> [String] {
            line.trimmingCharacters(in: CharacterSet(charactersIn: "|"))
                .components(separatedBy: "|")
                .map { stripInlineMarkdown($0.trimmingCharacters(in: .whitespaces)) }
        }

        func flushTable() {
            guard !tableOrigLines.isEmpty else { return }
            if tableHasSeparator {
                output.append(renderRoundedGrid(rows: tableRows, headerRows: tableHeaderCount))
            } else {
                for origLine in tableOrigLines {
                    output.append(processBlockLine(origLine))
                }
            }
            tableOrigLines = []
            tableRows = []
            tableHeaderCount = 0
            tableHasSeparator = false
        }

        for line in lines {
            if line.hasPrefix("```") {
                flushTable()
                inPre.toggle()
                output.append(line)
                continue
            }
            if inPre {
                output.append(escapeCodeContent(line))
                continue
            }
            if isSeparatorRow(line) {
                if !tableOrigLines.isEmpty {
                    tableHeaderCount = tableRows.count
                    tableHasSeparator = true
                }
                // standalone separator with no preceding table rows: skip
            } else if isTableRow(line) {
                tableOrigLines.append(line)
                tableRows.append(parseTableRow(line))
            } else {
                flushTable()
                output.append(processBlockLine(line))
            }
        }
        flushTable()

        return output.joined(separator: "\n")
    }

    // MARK: - Block line processing

    private static func processBlockLine(_ line: String) -> String {
        // Horizontal rule: ---  ***  ___  (3 or more, whole line)
        if let _ = try? NSRegularExpression(pattern: #"^[-*_]{3,}$"#)
                       .firstMatch(in: line, range: NSRange(line.startIndex..., in: line)) {
            return ""
        }

        // Heading: # … ######
        if let m = try? NSRegularExpression(pattern: #"^#{1,6} (.*)"#)
                        .firstMatch(in: line, range: NSRange(line.startIndex..., in: line)),
           let r = Range(m.range(at: 1), in: line) {
            return "*\(processInline(String(line[r])))*"
        }

        // Blockquote: one or more leading >
        if let m = try? NSRegularExpression(pattern: #"^>+\s?(.*)"#)
                        .firstMatch(in: line, range: NSRange(line.startIndex..., in: line)),
           let r = Range(m.range(at: 1), in: line) {
            return ">\(processInline(String(line[r])))"
        }

        // Checkbox: - [x] / - [ ]  (must check before unordered list)
        if let m = try? NSRegularExpression(pattern: #"^[-*+] \[(x| )\] (.*)"#)
                        .firstMatch(in: line, range: NSRange(line.startIndex..., in: line)),
           let checkR = Range(m.range(at: 1), in: line),
           let textR  = Range(m.range(at: 2), in: line) {
            let checked = String(line[checkR]) == "x"
            return "\(checked ? "✅" : "⬜") \(processInline(String(line[textR])))"
        }

        // Unordered list: - * +
        if let m = try? NSRegularExpression(pattern: #"^[-*+] (.*)"#)
                        .firstMatch(in: line, range: NSRange(line.startIndex..., in: line)),
           let r = Range(m.range(at: 1), in: line) {
            return "• \(processInline(String(line[r])))"
        }

        // Ordered list: 1. 2. etc.
        if let m = try? NSRegularExpression(pattern: #"^(\d+)\. (.*)"#)
                        .firstMatch(in: line, range: NSRange(line.startIndex..., in: line)),
           let numR = Range(m.range(at: 1), in: line),
           let textR = Range(m.range(at: 2), in: line) {
            return "\(String(line[numR]))\\. \(processInline(String(line[textR])))"
        }

        // Table separator row: |---| or |:---:|
        if let _ = try? NSRegularExpression(pattern: #"^\|[-: |]+\|$"#)
                        .firstMatch(in: line, range: NSRange(line.startIndex..., in: line)) {
            return ""
        }

        // Table content row: |col|col|
        if line.hasPrefix("|") && line.hasSuffix("|") {
            let cols = line
                .trimmingCharacters(in: CharacterSet(charactersIn: "|"))
                .components(separatedBy: "|")
                .map { processInline($0.trimmingCharacters(in: .whitespaces)) }
            return cols.joined(separator: "   ")
        }

        // Plain paragraph
        return processInline(line)
    }

    private static func processInline(_ text: String) -> String {
        var store = PlaceholderStore()
        var s = text
        s = extractImages(s, store: &store)  // step 1
        s = extractCode(s, store: &store)    // step 2
        // Strip HTML tags AFTER code extraction so <url> inside backticks is preserved
        s = regexReplace(#"</?[a-zA-Z][^>]*>"#, in: s) { _ in "" }
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

    // MARK: - Table rendering

    private static func isTableRow(_ line: String) -> Bool {
        line.hasPrefix("|") && line.hasSuffix("|")
            && !line.trimmingCharacters(in: .whitespaces).isEmpty
    }

    private static func isSeparatorRow(_ line: String) -> Bool {
        (try? NSRegularExpression(pattern: #"^\|[-: |]+\|$"#)
            .firstMatch(in: line, range: NSRange(line.startIndex..., in: line))) != nil
    }

    private static func stripInlineMarkdown(_ text: String) -> String {
        var s = text
        s = regexReplace(#"!\[([^\]]*)\]\([^)]*\)"#, in: s) { $0[1] }  // image → alt
        s = regexReplace(#"\[([^\]]+)\]\([^)]+\)"#, in: s) { $0[1] }   // link → text
        s = regexReplace(#"`([^`]+)`"#, in: s) { $0[1] }                // `code` → content
        s = regexReplace(#"\*{3}(.+?)\*{3}"#, in: s) { $0[1] }         // ***bi***
        s = regexReplace(#"_{3}(.+?)_{3}"#, in: s) { $0[1] }           // ___bi___
        s = regexReplace(#"\*{2}(.+?)\*{2}"#, in: s) { $0[1] }         // **bold**
        s = regexReplace(#"_{2}(.+?)_{2}"#, in: s) { $0[1] }           // __bold__
        s = regexReplace(#"(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)"#, in: s) { $0[1] }  // *italic*
        s = regexReplace(#"~~(.+?)~~"#, in: s) { $0[1] }               // ~~strike~~
        return s
    }

    private static func renderRoundedGrid(rows: [[String]], headerRows: Int) -> String {
        let colCount = rows.map { $0.count }.max() ?? 0
        guard colCount > 0 else { return "" }

        var widths = Array(repeating: 3, count: colCount)
        for row in rows {
            for (j, cell) in row.enumerated() where j < colCount {
                widths[j] = max(widths[j], cell.count)
            }
        }

        func seg(_ w: Int) -> String { String(repeating: "─", count: w + 2) }
        func topLine() -> String { "╭" + widths.map(seg).joined(separator: "┬") + "╮" }
        func midLine() -> String { "├" + widths.map(seg).joined(separator: "┼") + "┤" }
        func botLine() -> String { "╰" + widths.map(seg).joined(separator: "┴") + "╯" }

        func formatRow(_ row: [String]) -> String {
            let cells = (0..<colCount).map { j -> String in
                let cell = j < row.count ? row[j] : ""
                return " " + cell.padding(toLength: widths[j], withPad: " ", startingAt: 0) + " "
            }
            return "│" + cells.joined(separator: "│") + "│"
        }

        var tableLines: [String] = [topLine()]
        for (i, row) in rows.enumerated() {
            tableLines.append(formatRow(row))
            if i < rows.count - 1 {
                tableLines.append(midLine())
            }
        }
        tableLines.append(botLine())
        return "```\n" + tableLines.joined(separator: "\n") + "\n```"
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

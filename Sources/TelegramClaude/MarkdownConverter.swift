import Foundation
import JavaScriptCore

/// 将 GFM markdown 转换为 Telegram MarkdownV2 格式
/// 使用打包的 telegram-markdown-v2 JS 库通过 JavaScriptCore 运行
final class MarkdownConverter {
    static let shared = MarkdownConverter()

    private let context: JSContext?

    private init() {
        guard let url = Bundle.module.url(forResource: "converter", withExtension: "js"),
              let script = try? String(contentsOf: url, encoding: .utf8) else {
            context = nil
            return
        }
        let ctx = JSContext()
        ctx?.exceptionHandler = { _, exception in
            print("[MarkdownConverter] JS error: \(exception?.toString() ?? "unknown")")
        }
        ctx?.evaluateScript(script)
        context = ctx
    }

    /// 转换为 MarkdownV2，失败返回 nil（调用方应 fallback 到纯文本）
    func convert(_ markdown: String) -> String? {
        guard let ctx = context else { return nil }
        // 转义单引号防止 JS 注入
        let escaped = markdown
            .replacingOccurrences(of: "\\", with: "\\\\")
            .replacingOccurrences(of: "'", with: "\\'")
        let result = ctx.evaluateScript("convertToMarkdownV2('\(escaped)')")
        return result?.isString == true ? result?.toString() : nil
    }
}

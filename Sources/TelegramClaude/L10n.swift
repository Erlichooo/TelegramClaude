// Sources/TelegramClaude/L10n.swift
import Foundation

enum Language: String {
    case english = "en"
    case chinese = "zh"

    static var current: Language {
        get {
            let raw = UserDefaults.standard.string(forKey: "language") ?? "en"
            return Language(rawValue: raw) ?? .english
        }
        set {
            UserDefaults.standard.set(newValue.rawValue, forKey: "language")
        }
    }
}

/// 返回当前语言对应的字符串
func L(_ en: String, _ zh: String) -> String {
    Language.current == .chinese ? zh : en
}

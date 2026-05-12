"use client"

import { useContext } from "react"
import { LanguageContext } from "./language-provider"
import { translations } from "./translations"

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

export function useTranslation() {
  const { language } = useLanguage()

  const t = (key: string, params?: Record<string, string | number>) => {
    const keys = key.split(".")
    let value: any = translations[language]

    for (const k of keys) {
      if (value && value[k]) {
        value = value[k]
      } else {
        value = keys.reduce<any>((acc, part) => (acc && acc[part] ? acc[part] : undefined), translations.zh)
        break
      }
    }

    if (typeof value !== "string") return key
    if (!params) return value

    return value.replace(/\{(\w+)\}/g, (_, token) => String(params[token] ?? `{${token}}`))
  }

  return { t }
}

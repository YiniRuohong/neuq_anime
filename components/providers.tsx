"use client"

import { ThemeProvider } from "./theme-provider"
import { LanguageProvider } from "@/lib/i18n/language-provider"
import type { ReactNode } from "react"

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider defaultTheme="auto">
      <LanguageProvider>{children}</LanguageProvider>
    </ThemeProvider>
  )
}

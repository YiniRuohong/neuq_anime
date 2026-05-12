"use client"

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react"

export type Theme = "light" | "dark" | "auto"
type ResolvedTheme = "light" | "dark"

interface ThemeProviderProps {
  children: ReactNode
  defaultTheme?: Theme
}

interface ThemeContextType {
  theme: Theme
  resolvedTheme: ResolvedTheme
  setTheme: (theme: Theme) => void
}

const STORAGE_KEY = "theme-preference"
const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

function getThemeByTime(date = new Date()): ResolvedTheme {
  const hour = date.getHours()
  return hour >= 7 && hour < 19 ? "light" : "dark"
}

export function ThemeProvider({
  children,
  defaultTheme = "auto",
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(defaultTheme)
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>("light")

  useEffect(() => {
    const savedTheme = localStorage.getItem(STORAGE_KEY) as Theme | null
    if (savedTheme && ["light", "dark", "auto"].includes(savedTheme)) {
      setThemeState(savedTheme)
    }
  }, [])

  useEffect(() => {
    const root = window.document.documentElement
    const nextResolved = theme === "auto" ? getThemeByTime() : theme

    root.classList.remove("light", "dark")
    root.classList.add(nextResolved)
    root.dataset.themeMode = theme
    setResolvedTheme(nextResolved)

    if (theme !== "auto") return

    const interval = window.setInterval(() => {
      const autoResolved = getThemeByTime()
      root.classList.remove("light", "dark")
      root.classList.add(autoResolved)
      setResolvedTheme(autoResolved)
    }, 60_000)

    return () => window.clearInterval(interval)
  }, [theme])

  const setTheme = (nextTheme: Theme) => {
    setThemeState(nextTheme)
    localStorage.setItem(STORAGE_KEY, nextTheme)
  }

  const value = useMemo(
    () => ({
      theme,
      resolvedTheme,
      setTheme,
    }),
    [theme, resolvedTheme]
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}

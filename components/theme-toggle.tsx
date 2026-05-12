"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTranslation } from "@/lib/i18n/use-translation"
import { Clock3, Moon, Sun } from "lucide-react"
import { type Theme, useTheme } from "./theme-provider"

function ThemeIcon({ theme, resolvedTheme }: { theme: Theme; resolvedTheme: "light" | "dark" }) {
  if (theme === "auto") {
    return (
      <span className="relative flex items-center justify-center">
        {resolvedTheme === "dark" ? (
          <Moon className="h-5 w-5 text-[var(--sakura-300)]" />
        ) : (
          <Sun className="h-5 w-5 text-amber-500" />
        )}
        <Clock3 className="absolute -right-2 -top-1 h-3.5 w-3.5 rounded-full bg-[var(--card)] p-[1px] text-[var(--foreground)]" />
      </span>
    )
  }

  return theme === "dark" ? (
    <Moon className="h-5 w-5 text-[var(--sakura-300)]" />
  ) : (
    <Sun className="h-5 w-5 text-amber-500" />
  )
}

export function ThemeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme()
  const { t } = useTranslation()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="relative h-12 w-12 rounded-full border border-[var(--border)] bg-[var(--card)] shadow-sm transition-all duration-300 hover:scale-110 hover:shadow-md"
          aria-label={t("theme.toggleTheme")}
        >
          <div
            className={`absolute inset-0 rounded-full transition-all duration-500 ${
              resolvedTheme === "dark"
                ? "bg-[var(--sakura-300)]/20 shadow-[0_0_20px_rgba(253,164,200,0.35)]"
                : "bg-amber-200/20 shadow-[0_0_20px_rgba(251,191,36,0.25)]"
            }`}
          />
          <span className="relative z-10 flex items-center justify-center">
            <ThemeIcon theme={theme} resolvedTheme={resolvedTheme} />
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuLabel>{t("theme.menu")}</DropdownMenuLabel>
        <DropdownMenuRadioGroup value={theme} onValueChange={(value) => setTheme(value as Theme)}>
          <DropdownMenuRadioItem value="auto">{t("theme.auto")}</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="light">{t("theme.light")}</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="dark">{t("theme.dark")}</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

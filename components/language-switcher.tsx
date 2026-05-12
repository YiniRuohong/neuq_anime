"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useLanguage, useTranslation } from "@/lib/i18n/use-translation"
import { Languages } from "lucide-react"

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()
  const { t } = useTranslation()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Languages className="h-4 w-4" />
          <span>{t(`language.${language}`)}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setLanguage("en")}>{t("language.en")}</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("zh")}>{t("language.zh")}</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("ja")}>{t("language.ja")}</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

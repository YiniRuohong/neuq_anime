"use client"

import { useEffect, useState } from "react"
import { useTranslation } from "@/lib/i18n/use-translation"

export function PageDots({ current, total, onChange }: { current: number; total: number; onChange: (i: number) => void }) {
  const { t } = useTranslation()
  const [active, setActive] = useState(current)

  useEffect(() => {
    setActive(current)
  }, [current])

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4">
      {Array.from({ length: total }, (_, i) => (
        <button
          key={i}
          onClick={() => onChange(i)}
          className={`relative w-3 h-3 rounded-full transition-all duration-300 ${
            active === i
              ? "bg-[var(--sakura-500)] scale-125 shadow-[0_0_8px_rgba(244,63,136,0.6)]"
              : "bg-[var(--border)] hover:bg-[var(--sakura-300)]"
          }`}
          aria-label={t("actions.goToPage", { page: i + 1 })}
        />
      ))}
    </div>
  )
}

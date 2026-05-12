"use client"

import { useState, useEffect, useRef } from "react"
import { ArrowUp } from "lucide-react"
import { useTranslation } from "@/lib/i18n/use-translation"

export function BackToTopButton() {
  const { t } = useTranslation()
  const [isVisible, setIsVisible] = useState(false)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const toggleVisibility = () => {
      const main = document.querySelector("main") as HTMLElement | null
      const scrollY = main ? main.scrollTop : window.scrollY
      setIsVisible(scrollY > 500)
    }

    // 用 RAF 防抖
    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(toggleVisibility)
    }

    const main = document.querySelector("main")
    const target = main || window
    target.addEventListener("scroll", onScroll, { passive: true })
    toggleVisibility()

    return () => {
      target.removeEventListener("scroll", onScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const scrollToTop = () => {
    const main = document.querySelector("main") as HTMLElement | null
    if (main) {
      main.scrollTo({ top: 0, behavior: "smooth" })
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 z-40 w-14 h-14 rounded-full bg-[var(--primary)] text-white shadow-lg transition-all duration-500 hover:scale-110 hover:shadow-xl ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0 pointer-events-none"
      }`}
      aria-label={t("actions.backToTop")}
    >
      <div className="absolute inset-0 rounded-full bg-[var(--primary)] animate-ping opacity-20" />
      <div className="relative flex items-center justify-center">
        <ArrowUp className="w-6 h-6" />
      </div>
      <div className="absolute inset-0 rounded-full border-2 border-white/30" />
    </button>
  )
}

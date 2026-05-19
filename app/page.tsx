"use client"

import Image from "next/image"
import { ImageGallery } from "@/components/image-gallery"
import { PhotoGallery } from "@/components/photo-gallery"
import { SistersOverview } from "@/components/sisters-overview"
import { ThemeToggle } from "@/components/theme-toggle"
import { BackToTopButton } from "@/components/back-to-top-button"
import { PageDots } from "@/components/page-dots"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useEffect, useState, useRef, useCallback } from "react"
import { useTranslation } from "@/lib/i18n/use-translation"
import { siteConfig } from "@/lib/site-config"

interface Petal {
  id: number
  left: number
  delay: number
  duration: number
}

const TOTAL_PAGES = 3

export default function Home() {
  const { t } = useTranslation()
  const [petals, setPetals] = useState<Petal[]>([])
  const [currentPage, setCurrentPage] = useState(0)
  const [mounted, setMounted] = useState(false)
  const sectionRefs = useRef<(HTMLElement | null)[]>([])
  const containerRef = useRef<HTMLElement | null>(null)
  const isProgrammaticScroll = useRef(false)

  // 生成樱花花瓣
  useEffect(() => {
    const newPetals: Petal[] = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      left: 5 + Math.random() * 90,
      delay: Math.random() * 8,
      duration: 6 + Math.random() * 4,
    }))
    setPetals(newPetals)
    setMounted(true)
  }, [])

  // 监听 IntersectionObserver 更新当前页
  useEffect(() => {
    if (!containerRef.current) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (isProgrammaticScroll.current) return
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number((entry.target as HTMLElement).dataset.page)
            if (!isNaN(idx)) setCurrentPage(idx)
          }
        })
      },
      { threshold: 0.6, root: containerRef.current }
    )

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })
    return () => observer.disconnect()
  }, [mounted])

  const scrollToPage = useCallback((index: number) => {
    const clamped = Math.max(0, Math.min(index, TOTAL_PAGES - 1))
    const el = sectionRefs.current[clamped]
    if (!el) return
    isProgrammaticScroll.current = true
    setCurrentPage(clamped)
    el.scrollIntoView({ behavior: "smooth", block: "start" })
    window.setTimeout(() => {
      isProgrammaticScroll.current = false
    }, 700)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "PageDown" || e.key === "ArrowRight") {
        e.preventDefault()
        scrollToPage(currentPage + 1)
      } else if (e.key === "ArrowUp" || e.key === "PageUp" || e.key === "ArrowLeft") {
        e.preventDefault()
        scrollToPage(currentPage - 1)
      } else if (e.key === "Home") {
        e.preventDefault()
        scrollToPage(0)
      } else if (e.key === "End") {
        e.preventDefault()
        scrollToPage(TOTAL_PAGES - 1)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [currentPage, scrollToPage])

  if (!mounted) {
    return (
      <main className="h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-[var(--sakura-300)] border-t-transparent rounded-full animate-spin" />
      </main>
    )
  }

  return (
    <main
      ref={containerRef}
      className="h-screen overflow-y-auto snap-y snap-mandatory scroll-smooth overscroll-y-contain touch-pan-y"
    >
      {/* 飘落樱花花瓣 */}
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="sakura-petal"
          style={{
            left: `${petal.left}%`,
            animationDelay: `${petal.delay}s`,
            animationDuration: `${petal.duration}s`,
          }}
        />
      ))}

      {/* 顶部导航栏 */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="mx-auto max-w-7xl px-6 py-4 flex justify-end gap-3">
          <ThemeToggle />
          <LanguageSwitcher />
        </div>
      </header>

      {/* 分页导航圆点 */}
      <PageDots current={currentPage} total={TOTAL_PAGES} onChange={scrollToPage} />

      {/* 第一页：社娘总览 */}
      <section
        ref={(el) => { sectionRefs.current[0] = el }}
        data-page={0}
        className="page-section relative"
      >
        <SistersOverview onViewDetail={() => scrollToPage(1)} />
      </section>

      {/* 第二页：角色详情 */}
      <section
        ref={(el) => { sectionRefs.current[1] = el }}
        data-page={1}
        className="page-section relative"
      >
        <div className="max-w-6xl mx-auto w-full px-4">
          <div className="relative text-center mb-8 md:mb-10">
            <div className="pointer-events-none absolute -right-2 -top-10 hidden md:block">
              <div className="chibi-sticker chibi-bob-delayed rotate-[8deg] scale-90">
                <Image
                  src={siteConfig.assets.chibi.older}
                  alt="社娘姐姐 Q版点缀"
                  width={104}
                  height={120}
                  className="h-auto w-[88px] lg:w-[104px]"
                />
              </div>
            </div>
            <h2 className="font-handwriting text-3xl sm:text-4xl font-bold mb-2">
              <span className="text-[var(--sakura-500)]">🐾</span> {t("detail.title")}
            </h2>
            <p className="opacity-60">{t("detail.subtitle")}</p>
          </div>
          <ImageGallery />
        </div>
      </section>

      {/* 第三页：照片画廊 */}
      <section
        ref={(el) => { sectionRefs.current[2] = el }}
        data-page={2}
        className="page-section relative"
      >
        <div className="max-w-6xl mx-auto w-full px-4 flex h-full flex-col justify-between gap-12">
          <PhotoGallery />
          <footer className="text-center text-sm opacity-50 py-6 border-t border-[var(--border)]">
            <p>{t("footer.club")}</p>
            <p className="mt-1">{t("footer.producedBy")}</p>
            <p className="mt-1">{t("footer.madeWith")}</p>
          </footer>
        </div>
      </section>

      {/* 返回顶部按钮 */}
      <BackToTopButton />
    </main>
  )
}

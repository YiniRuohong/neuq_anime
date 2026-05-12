"use client"

import Image from "next/image"
import { Sparkles, ChevronDown } from "lucide-react"
import { useTranslation } from "@/lib/i18n/use-translation"
import { siteConfig } from "@/lib/site-config"

export function SistersOverview({ onViewDetail }: { onViewDetail: () => void }) {
  const { t } = useTranslation()

  return (
    <div className="w-full max-w-6xl mx-auto px-4 select-none">
      <div className="relative flex flex-col items-center justify-center text-center overflow-visible">
        <div className="pointer-events-none absolute left-0 top-1/2 hidden -translate-y-1/2 lg:block">
          <div className="chibi-sticker chibi-bob -rotate-6">
            <Image
              src={siteConfig.assets.chibi.younger}
              alt="社娘妹妹 Q版形象"
              width={220}
              height={252}
              className="h-auto w-[180px] xl:w-[220px]"
              priority
            />
          </div>
        </div>

        <div className="pointer-events-none absolute right-0 top-[18%] hidden lg:block">
          <div className="chibi-sticker chibi-bob-delayed rotate-6">
            <Image
              src={siteConfig.assets.chibi.older}
              alt="社娘姐姐 Q版形象"
              width={220}
              height={252}
              className="h-auto w-[180px] xl:w-[220px]"
              priority
            />
          </div>
        </div>

        {/* 顶部标签 pill */}
        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--sakura-50)] dark:bg-[var(--indigo-800)]/50 border border-[var(--border)] mb-10 animate-fade-in-up">
          <Sparkles className="w-4 h-4 text-[var(--sakura-500)]" />
          <span className="text-sm font-medium tracking-wide">
            {t("home.pill")}
          </span>
        </div>

        <div className="mb-8 flex items-end justify-center gap-3 lg:hidden animate-fade-in-up" style={{ animationDelay: "0.12s" }}>
          <div className="chibi-sticker chibi-bob -rotate-6">
            <Image
              src={siteConfig.assets.chibi.younger}
              alt="社娘妹妹 Q版形象"
              width={136}
              height={156}
              className="h-auto w-[112px] sm:w-[136px]"
              priority
            />
          </div>
          <div className="chibi-sticker chibi-bob-delayed rotate-6">
            <Image
              src={siteConfig.assets.chibi.older}
              alt="社娘姐姐 Q版形象"
              width={136}
              height={156}
              className="h-auto w-[112px] sm:w-[136px]"
              priority
            />
          </div>
        </div>

        {/* 主标题 */}
        <h1 className="font-handwriting text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-6 tracking-tight animate-fade-in-up" style={{ animationDelay: "0.15s" }}>
          <span className="inline-block mr-2">🌸</span>
          {t("home.title")}
        </h1>

        {/* 副标题 */}
        <p className="text-lg md:text-xl max-w-lg mx-auto opacity-60 leading-relaxed animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
          {t("home.subtitle")}
        </p>

        <div
          className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/70 px-4 py-2 text-sm text-[var(--sakura-500)] shadow-[0_12px_30px_rgba(236,72,153,0.12)] backdrop-blur-md dark:border-white/10 dark:bg-[var(--indigo-900)]/50 animate-fade-in-up"
          style={{ animationDelay: "0.4s" }}
        >
          <span>{t("home.sticker")}</span>
          <span className="text-base">🐾</span>
        </div>

        {/* 向下滚动提示 */}
        <button
          onClick={onViewDetail}
          className="mt-16 animate-fade-in-up flex flex-col items-center gap-2 opacity-50 hover:opacity-100 transition-opacity duration-300 group"
          style={{ animationDelay: "0.5s" }}
        >
          <span className="text-xs">{t("home.explore")}</span>
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </button>
      </div>
    </div>
  )
}

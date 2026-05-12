"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Sparkles, Heart, Star, Zap, BookOpen, Calendar, Ruler, User } from "lucide-react"
import { useTranslation } from "@/lib/i18n/use-translation"
import { getSisterConfig, type SisterId, siteConfig } from "@/lib/site-config"

// 统计装饰小图标
function StatBadge({ icon: Icon, label, value, color }: { icon: any, label: string, value: string, color: string }) {
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/70 dark:bg-slate-800/50 backdrop-blur-sm border border-[var(--border)] transition-all duration-300 hover:scale-105 hover:shadow-md">
      <Icon className="w-3.5 h-3.5" style={{ color }} />
      <span className="text-xs">
        <span className="opacity-60">{label}</span> {value}
      </span>
    </div>
  )
}

// 信息小卡片
function InfoCard({ title, content, color }: { title: string, content: string, color: string }) {
  return (
    <div className="bg-white/50 dark:bg-[var(--indigo-800)]/30 border border-[var(--border)] rounded-xl p-3 transition-all duration-300 hover:shadow-md">
      <div className="text-xs font-semibold mb-1" style={{ color }}>{title}</div>
      <div className="text-xs opacity-70">{content}</div>
    </div>
  )
}

export function ImageGallery() {
  const { t } = useTranslation()
  const [current, setCurrent] = useState<SisterId>("younger")
  const [animating, setAnimating] = useState(false)
  const [showMore, setShowMore] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const currentSister = getSisterConfig(current)
  if (!currentSister) {
    return null
  }
  const baseKey = `sisters.${current}` as const

  const handleSwitch = (type: SisterId) => {
    if (type === current || animating) return
    setAnimating(true)
    setShowMore(false) // 重置展开状态
    setCurrent(type)
    setTimeout(() => setAnimating(false), 500)
  }

  if (!mounted) {
    return (
      <div className="wagahai-card p-8 md:p-12">
        <div className="h-[400px] animate-pulse bg-slate-200 rounded-2xl" />
      </div>
    )
  }

  return (
    <div className="wagahai-card p-6 md:p-10 lg:p-12 overflow-hidden relative">
      {/* 装饰背景圆圈 */}
      <div 
        className="absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-20 blur-3xl transition-all duration-700"
        style={{ backgroundColor: currentSister.color }}
      />
      <div 
        className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full opacity-15 blur-3xl transition-all duration-700"
        style={{ backgroundColor: currentSister.accent }}
      />

      <div className="relative flex flex-col lg:flex-row items-start gap-8 lg:gap-12">
        {/* 左侧：角色信息 */}
        <div className="order-2 lg:order-1 flex flex-col lg:items-start gap-5 w-full lg:w-5/12">
          {/* 角色标签切换 */}
          <div className="tab-group">
            {siteConfig.sisters.map((sister) => (
              <button
                key={sister.id}
                onClick={() => handleSwitch(sister.id)}
                className={`tab-button ${current === sister.id ? "active" : ""}`}
                style={
                  current === sister.id 
                    ? { backgroundColor: sister.accent, color: "#fff" } 
                    : {}
                }
              >
                <span className="flex items-center gap-1.5">
                  {sister.id === "younger" ? (
                    <Sparkles className="w-3.5 h-3.5" />
                  ) : (
                    <Star className="w-3.5 h-3.5" />
                  )}
                  {t(`sisters.${sister.id}.label`)}
                </span>
              </button>
            ))}
          </div>

          {/* 角色信息卡片 */}
          <div className="w-full space-y-4">
            {/* 性格标签 */}
            <div
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-sm font-medium"
              style={{ backgroundColor: `${currentSister.color}40`, color: currentSister.accent }}
            >
              <Heart className="w-3.5 h-3.5 fill-current" />
              {t(`${baseKey}.personality`)}
            </div>

            {/* 名字 */}
            <div>
              <h2 className="font-handwriting text-3xl md:text-4xl font-bold">
                {t(`${baseKey}.name`)}
              </h2>
              <div className="text-sm opacity-60 mt-1">
                {t(`${baseKey}.realName`)}
              </div>
            </div>

            {/* 统计数据 */}
            <div className="flex flex-wrap gap-2">
              <StatBadge icon={Calendar} label={t("detail.stats.age")} value={t(`${baseKey}.age`)} color={currentSister.accent} />
              <StatBadge icon={Heart} label={t("detail.stats.birthday")} value={t(`${baseKey}.birthday`)} color={currentSister.accent} />
              <StatBadge icon={Ruler} label={t("detail.stats.height")} value={t(`${baseKey}.height`)} color={currentSister.accent} />
              <StatBadge icon={User} label={t("detail.stats.identity")} value={t(`${baseKey}.identity`)} color={currentSister.accent} />
            </div>

            {/* 简介 - 可展开 */}
            <div className="relative">
              <div 
                className="absolute left-0 top-0 bottom-0 w-0.5 rounded-full"
                style={{ backgroundColor: currentSister.accent }}
              />
              <div className="pl-5">
                <p className="text-[15px] leading-relaxed opacity-80">
                  {t(`${baseKey}.bio`)}
                </p>
                {showMore && (
                  <p className="text-[15px] leading-relaxed opacity-80 mt-3">
                    {t(`${baseKey}.bioExtended`)}
                  </p>
                )}
                <button 
                  onClick={() => setShowMore(!showMore)}
                  className="inline-block mt-2 text-xs font-medium opacity-60 hover:opacity-100 transition-opacity"
                  style={{ color: currentSister.accent }}
                >
                  {showMore ? t("actions.viewLess") : t("actions.viewMore")}
                </button>
              </div>
            </div>

            {/* 信息小卡片组 */}
            <div className="grid grid-cols-2 gap-2">
              <InfoCard 
                title={`🪄 ${t("detail.cards.ability")}`} 
                content={t(`${baseKey}.specialAbility`)} 
                color={currentSister.accent}
              />
              <InfoCard 
                title={`💖 ${t("detail.cards.hobby")}`} 
                content={t(`${baseKey}.hobby`)} 
                color={currentSister.accent}
              />
            </div>

            {/* 档案编号 */}
            <div className="pt-2 flex items-center gap-3 text-xs opacity-50">
              <span>{`🌸 ${t("detail.archive")}`}</span>
              <span className="w-1 h-1 rounded-full bg-current" />
              <span>{t("detail.recordNumber", { number: currentSister.archiveNumber })}</span>
            </div>
          </div>
        </div>

        {/* 右侧：角色大图展示 */}
        <div className="order-1 lg:order-2 w-full lg:w-7/12 flex justify-center">
          <div className="relative character-container">
            {/* 发光背景 */}
            <div 
              className="absolute inset-0 blur-2xl opacity-30 scale-110 transition-all duration-500"
              style={{ backgroundColor: currentSister.color }}
            />
            
            {/* 图片容器 */}
            <div className="relative rounded-2xl overflow-hidden image-hover-glow">
              <Image
                src={currentSister.image}
                alt={t(`${baseKey}.name`)}
                width={420}
                height={560}
                className={`rounded-2xl object-cover w-[300px] h-[400px] sm:w-[380px] sm:h-[500px] lg:w-[420px] lg:h-[560px] transition-opacity duration-300 ${animating ? 'opacity-0' : 'opacity-100'}`}
                priority
                unoptimized
              />
              
              {/* 内阴影边框效果 */}
              <div className="absolute inset-0 rounded-2xl shadow-[inset_0_0_30px_rgba(0,0,0,0.1)] pointer-events-none" />
            </div>

            {/* 浮动装饰元素 */}
            <div
              className="absolute -top-4 -right-4 w-16 h-16 rounded-full flex items-center justify-center text-2xl shadow-lg animate-float"
              style={{ backgroundColor: currentSister.color }}
            >
              {currentSister.floatEmoji}
            </div>

            {/* 底部装饰线 */}
            <div 
              className="absolute -bottom-3 left-1/2 -translate-x-1/2 h-1.5 rounded-full transition-all duration-500"
              style={{ 
                background: `linear-gradient(90deg, transparent, ${currentSister.accent}, transparent)`,
                width: "60%"
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

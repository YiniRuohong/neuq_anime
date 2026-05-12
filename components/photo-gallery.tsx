"use client"

import { useState, useEffect } from "react"
import NextImage from "next/image"
import { X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react"
import { useTranslation } from "@/lib/i18n/use-translation"
import { siteConfig } from "@/lib/site-config"

export function PhotoGallery() {
  const { t } = useTranslation()
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set())
  const [isOpen, setIsOpen] = useState(false)

  // 打开模态框
  const openModal = (index: number) => {
    setSelectedIndex(index)
    setIsOpen(true)
    document.body.style.overflow = 'hidden'
  }

  // 关闭模态框
  const closeModal = () => {
    setIsOpen(false)
    document.body.style.overflow = 'auto'
    setTimeout(() => setSelectedIndex(null), 300)
  }

  // 导航图片
  const navigateImage = (direction: 'prev' | 'next') => {
    if (selectedIndex === null) return
    if (direction === 'prev') {
      setSelectedIndex(selectedIndex === 0 ? siteConfig.photoGallery.length - 1 : selectedIndex - 1)
    } else {
      setSelectedIndex(selectedIndex === siteConfig.photoGallery.length - 1 ? 0 : selectedIndex + 1)
    }
  }

  // 处理键盘事件
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return
      if (e.key === "Escape") closeModal()
      if (e.key === "ArrowLeft") navigateImage('prev')
      if (e.key === "ArrowRight") navigateImage('next')
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, selectedIndex])

  const handleImageLoad = (src: string) => {
    setLoadedImages((prev) => new Set([...prev, src]))
  }

  return (
    <section id="gallery" className="py-12">
      {/* 标题 */}
      <div className="text-center mb-12">
        <h2 className="font-handwriting text-3xl md:text-4xl font-bold mb-3">
          {t("gallery.title")}
        </h2>
        <p className="opacity-60">{t("gallery.subtitle")}</p>
      </div>

      {/* 照片网格 - 瀑布流布局 */}
      <div className="columns-1 md:columns-2 lg:columns-3 gap-5 space-y-5">
        {siteConfig.photoGallery.map((image, index) => (
          <div
            key={index}
            className="break-inside-avoid wagahai-card overflow-hidden cursor-pointer group"
            onClick={() => openModal(index)}
          >
            {/* 图片容器 */}
            <div className="relative overflow-hidden">
              {/* 加载占位 */}
              {!loadedImages.has(image.src) && (
                <div className="aspect-square bg-[var(--muted)] flex items-center justify-center">
                  <div className="w-8 h-8 border-2 border-[var(--sakura-300)] border-t-transparent rounded-full animate-spin" />
                </div>
              )}
              
              {/* 实际图片 */}
              <NextImage
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                className={`w-full h-auto object-cover transition-all duration-500 group-hover:scale-105 ${
                  loadedImages.has(image.src) ? 'opacity-100' : 'opacity-0 absolute inset-0'
                }`}
                loading="lazy"
                onLoad={() => handleImageLoad(image.src)}
                unoptimized
              />

              {/* 悬停遮罩 */}
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--indigo-900)]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4 pt-12">
                  <div className="flex items-center justify-between">
                    <span className="text-white text-sm font-medium">
                      {t("gallery.imageAlt")}
                    </span>
                    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white">
                      <ZoomIn className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </div>

              {/* 角落装饰 */}
              <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-white/0 group-hover:border-white/40 transition-all duration-300 rounded-tr-lg" />
            </div>
          </div>
        ))}
      </div>

      {/* 模态框 - 使用原生实现确保工作 */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center"
          onClick={closeModal}
        >
          {/* 背景遮罩 */}
          <div className="absolute inset-0 bg-[var(--indigo-950)]/90 backdrop-blur-sm animate-fade-in" />
          
          {/* 关闭按钮 */}
          <button
            onClick={closeModal}
            className="absolute top-6 right-6 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
          >
            <X className="w-6 h-6" />
          </button>

          {/* 导航按钮 - 仅当有多张图片时显示 */}
          {siteConfig.photoGallery.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); navigateImage('prev'); }}
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); navigateImage('next'); }}
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* 图片容器 */}
          <div 
            className="relative z-10 max-w-[90vw] max-h-[85vh] animate-fade-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            {selectedIndex !== null && (
              <NextImage
                src={siteConfig.photoGallery[selectedIndex].src}
                alt={t("gallery.imageAlt")}
                width={siteConfig.photoGallery[selectedIndex].width}
                height={siteConfig.photoGallery[selectedIndex].height}
                className="max-w-full max-h-[85vh] w-auto h-auto object-contain rounded-xl shadow-2xl"
                unoptimized
              />
            )}
          </div>

          {/* 图片计数器 */}
          {siteConfig.photoGallery.length > 1 && selectedIndex !== null && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm">
              {selectedIndex + 1} / {siteConfig.photoGallery.length}
            </div>
          )}
        </div>
      )}
    </section>
  )
}

"use client"
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { CharacterCard } from "@/components/character-card"
const ImageGallery = dynamic(
  () => import('@/components/image-gallery').then(mod => mod.ImageGallery),
  { ssr: false, loading: () => <div className="h-60 bg-gray-200 animate-pulse rounded-md mb-4" /> }
)
import { AuthorInfo } from "@/components/author-info"
import { LanguageSwitcher } from "@/components/language-switcher"
import { Providers } from "@/components/providers"
const PhotoGallery = dynamic(
  () => import('@/components/photo-gallery').then(mod => mod.PhotoGallery),
  { ssr: false, loading: () => <div className="h-60 bg-gray-200 animate-pulse rounded-md mb-4" /> }
)
import { ScrollHandler } from "@/components/scroll-handler"
import { ThemeToggle } from "@/components/theme-toggle"
import { BackToTopButton } from "@/components/back-to-top-button"

export default function Home() {
  return <Providers>
    <ScrollHandler />
    <main className="min-h-screen bg-white dark:bg-slate-900 py-12 px-6 md:px-8 lg:px-16">
      <div className="mx-auto max-w-6xl flex flex-col space-y-12">
        <div className="flex justify-end gap-3">
          <ThemeToggle />
          <LanguageSwitcher />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-12 gap-y-8 items-start">
          {/* Row 1, Col 1 */}
          <div className="lg:col-span-1">
            <Suspense fallback={<div className="h-80 bg-gray-200 animate-pulse rounded-md mb-4" />}>
              <CharacterCard />
            </Suspense>
          </div>
          {/* Row 1, Col 2–3 */}
          <div className="lg:col-span-2">
            <Suspense>
              <ImageGallery />
            </Suspense>
          </div>
          {/* Row 2, Col 1 */}
          <div className="lg:col-span-1" />
          {/* Row 2, Col 2–3 */}
          <div className="lg:col-span-2">
            <div className="mb-16">
              <AuthorInfo />
            </div>
          </div>
        </div>
      </div>

      <section className="mt-16">
        <Suspense>
          <PhotoGallery />
        </Suspense>
      </section>

      <BackToTopButton />
    </main>
  </Providers>
}

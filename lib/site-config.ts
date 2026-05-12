import type { StaticImageData } from "next/image"
import mapImage from "../public/map.png"

export type SiteLanguage = "en" | "zh" | "ja"
export type SisterId = "younger" | "older"

export interface LocalizedText {
  en: string
  zh: string
  ja: string
}

export interface GalleryImageConfig {
  src: string
  alt: string
  width: number
  height: number
}

export interface SisterConfig {
  id: SisterId
  image: string
  color: string
  accent: string
  floatEmoji: string
  archiveNumber: string
}

export const siteConfig = {
  metadata: {
    title: "🌸 NEUQ动漫社",
    description: "东北大学秦皇岛分校动漫社·社娘展示",
  },
  assets: {
    map: mapImage as StaticImageData,
    authorAvatar: "/placeholder-user.jpg",
    chibi: {
      younger: "/characters/chibi-she-niang-1.png",
      older: "/characters/chibi-she-niang-2.png",
    },
  },
  links: {
    officialSite: "https://neuq-ani.me",
    twitter: "https://x.com/Yini_Ruohong",
  },
  author: {
    name: {
      en: "Huozhanshu Anime Club",
      zh: "火占术动漫社",
      ja: "火占術動漫社",
    } satisfies LocalizedText,
    description: {
      en: "Character designer & illustrator",
      zh: "角色设计师 & 插画师",
      ja: "キャラクターデザイナー＆イラストレーター",
    } satisfies LocalizedText,
    officialSiteLabel: {
      en: "Official Site",
      zh: "官方网站",
      ja: "公式サイト",
    } satisfies LocalizedText,
  },
  footer: {
    club: {
      en: "Northeastern University at Qinhuangdao · Anime Club",
      zh: "东北大学秦皇岛分校 · 动漫社",
      ja: "東北大学秦皇島分校 · アニメクラブ",
    } satisfies LocalizedText,
    madeWith: {
      en: "Made with 🌸 in NEUQ",
      zh: "Made with 🌸 in NEUQ",
      ja: "Made with 🌸 in NEUQ",
    } satisfies LocalizedText,
  },
  sisters: [
    {
      id: "younger",
      image: "https://cdn.sa.net/2025/06/04/Sq9BGrQWCpklULV.jpg",
      color: "#fda4c8",
      accent: "#f43f88",
      floatEmoji: "🐱",
      archiveNumber: "001",
    },
    {
      id: "older",
      image: "https://cdn.sa.net/2025/06/04/xAcSilVetdIU8r2.jpg",
      color: "#a78bfa",
      accent: "#8b5cf6",
      floatEmoji: "✨",
      archiveNumber: "002",
    },
  ] satisfies SisterConfig[],
  photoGallery: [
    // Add or remove gallery images here without touching UI components.
    { src: "https://cdn.sa.net/2025/06/04/9PZeMyUaOBt1bX2.png", alt: "社团活动", width: 1200, height: 800 },
  ] satisfies GalleryImageConfig[],
} as const

export function getLocalizedText(text: LocalizedText, language: SiteLanguage) {
  return text[language]
}

export function getSisterConfig(id: SisterId) {
  return siteConfig.sisters.find((sister) => sister.id === id)
}

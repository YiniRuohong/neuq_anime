import type { Metadata } from "next"
import { Providers } from "@/components/providers"
import { siteConfig } from "@/lib/site-config"
import "./globals.css"

export const metadata: Metadata = {
  title: siteConfig.metadata.title,
  description: siteConfig.metadata.description,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className="antialiased">
        <Providers>
          {/* 渐变网格背景 */}
          <div className="gradient-mesh" />
          {/* 纹理噪点层 */}
          <div className="noise-overlay" />
          {children}
        </Providers>
      </body>
    </html>
  )
}

"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useTranslation } from "@/lib/i18n/use-translation"
import { Globe, Twitter } from "lucide-react"
import Link from "next/link"
import { siteConfig } from "@/lib/site-config"

export function AuthorInfo() {
  const { t } = useTranslation()

  return (
    <Card className="shadow-md">
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Avatar className="h-16 w-16 border-2 border-purple-500">
            <AvatarImage src={siteConfig.assets.authorAvatar} alt={t("author.name")} />
            <AvatarFallback>FZ</AvatarFallback>
          </Avatar>

          <div className="flex-1 text-center sm:text-left">
            <h3 className="text-xl font-bold">{t("author.name")}</h3>
            <p className="text-muted-foreground mt-1">{t("author.description")}</p>
          </div>

          <div className="flex gap-2 mt-4 sm:mt-0">
            <Button variant="outline" size="icon" asChild>
              <Link href={siteConfig.links.officialSite} target="_blank" aria-label={t("author.blog")}>
                <Globe className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="icon" asChild>
              <Link href={siteConfig.links.twitter} target="_blank" aria-label="Twitter">
                <Twitter className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

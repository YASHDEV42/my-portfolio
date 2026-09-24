import type { MetadataRoute } from "next"
import { routing } from "@/i18n/routing"
import { projectSlugs, site } from "@/lib/site"

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", ...projectSlugs.map((slug) => `/work/${slug}`)]
  return paths.flatMap((path) => routing.locales.map((locale) => ({
    url: `${site.url}/${locale}${path}`,
    lastModified: new Date(),
    alternates: { languages: Object.fromEntries(routing.locales.map((language) => [language, `${site.url}/${language}${path}`])) }
  })))
}

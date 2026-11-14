import type { Metadata, Viewport } from "next"
import type { ReactNode } from "react"
import { NextIntlClientProvider } from "next-intl"
import { getTranslations, setRequestLocale } from "next-intl/server"
import type { AppLocale } from "@/i18n/routing"
import { site } from "@/lib/site"
import { MotionProvider } from "@/components/motion-provider"
import "../globals.css"

/*
  The site has two root layouts that render the same document:

    app/[locale]/layout.tsx   en, tr   Latin fonts
    app/ar/layout.tsx         ar       Latin + Arabic fonts

  They are separate only so that next/font scopes the Arabic faces to /ar
  (see fonts-arabic.ts). Everything they share lives here. A new route has to
  be added under both trees; keep the route files thin and put the page itself
  in app/_shared.
*/

export const rootViewport: Viewport = { themeColor: "#13100d", colorScheme: "dark", width: "device-width", initialScale: 1 }

export async function rootMetadata(locale: AppLocale): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "Metadata" })
  const canonical = `${site.url}/${locale}`
  return {
    metadataBase: new URL(site.url),
    title: { default: t("title"), template: `%s — ${site.name}` },
    description: t("description"),
    keywords: ["Yahya Chanat", "Full-Stack Engineer", "Software Engineer", "Next.js", "React", "NestJS", "SaaS", "Web Applications"],
    authors: [{ name: site.name, url: site.url }], creator: site.name,
    alternates: { canonical, languages: { en: `${site.url}/en`, tr: `${site.url}/tr`, ar: `${site.url}/ar`, "x-default": `${site.url}/en` } },
    openGraph: { type: "website", locale: locale === "ar" ? "ar_AR" : locale === "tr" ? "tr_TR" : "en_US", url: canonical, title: t("title"), description: t("description"), siteName: site.name, images: [{ url: "/og.png", width: 1200, height: 630, alt: t("title") }] },
    twitter: { card: "summary_large_image", title: t("title"), description: t("description"), images: ["/og.png"] },
    icons: { icon: [{ url: "/favicon.svg", type: "image/svg+xml" }] }, robots: { index: true, follow: true }
  }
}

export async function RootDocument({
  locale,
  fontVariables,
  children,
}: {
  locale: AppLocale
  /** CSS-variable classes of the fonts this layout loads. */
  fontVariables: string
  children: ReactNode
}) {
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: "Navigation" })
  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"} className={`${fontVariables} bg-background`}>
      <body className="grain antialiased">
        <a
          href="#main"
          className="fixed start-4 top-4 z-[60] -translate-y-[200%] rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition-transform focus-visible:translate-y-0"
        >
          {t("skipToContent")}
        </a>
        <NextIntlClientProvider>
          <MotionProvider>{children}</MotionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

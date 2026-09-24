import type { Metadata, Viewport } from "next"
import { Fraunces, Geist, Noto_Naskh_Arabic, Noto_Sans_Arabic } from "next/font/google"
import { hasLocale } from "next-intl"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { NextIntlClientProvider } from "next-intl"
import { notFound } from "next/navigation"
import { routing } from "@/i18n/routing"
import { site } from "@/lib/site"
import "../globals.css"

const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces", display: "swap", axes: ["opsz", "SOFT", "WONK"] })
const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" })
const notoNaskhArabic = Noto_Naskh_Arabic({ subsets: ["arabic"], variable: "--font-noto-naskh-arabic", display: "swap", weight: "variable" })
const notoSansArabic = Noto_Sans_Arabic({ subsets: ["arabic"], variable: "--font-noto-sans-arabic", display: "swap", weight: "variable" })

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) return {}
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

export const viewport: Viewport = { themeColor: "#201f1d", colorScheme: "dark", width: "device-width", initialScale: 1 }

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)
  return (
    <html
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      className={`${fraunces.variable} ${geist.variable} ${locale === "ar" ? `${notoNaskhArabic.variable} ${notoSansArabic.variable}` : ""} bg-background`}
    >
      <body className="grain antialiased"><NextIntlClientProvider>{children}</NextIntlClientProvider></body>
    </html>
  )
}

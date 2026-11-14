import type { Metadata } from "next"
import { hasLocale } from "next-intl"
import { notFound } from "next/navigation"
import { latinLocales } from "@/i18n/routing"
import { latinFontVariables } from "../_shared/fonts"
import { RootDocument, rootMetadata, rootViewport } from "../_shared/root-document"

/* Root layout for the Latin-script locales. Arabic has its own in app/ar. */

export function generateStaticParams() {
  return latinLocales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return hasLocale(latinLocales, locale) ? rootMetadata(locale) : {}
}

export const viewport = rootViewport

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!hasLocale(latinLocales, locale)) notFound()
  return (
    <RootDocument locale={locale} fontVariables={latinFontVariables}>
      {children}
    </RootDocument>
  )
}

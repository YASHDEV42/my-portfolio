import { hasLocale } from "next-intl"
import { notFound } from "next/navigation"
import { latinLocales } from "@/i18n/routing"
import { HomePage } from "../_shared/home-page"

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!hasLocale(latinLocales, locale)) notFound()
  return <HomePage locale={locale} />
}

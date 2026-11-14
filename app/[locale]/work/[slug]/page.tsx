import type { Metadata } from "next"
import { hasLocale } from "next-intl"
import { notFound } from "next/navigation"
import { latinLocales } from "@/i18n/routing"
import { projectSlugs } from "@/lib/site"
import { CaseStudyPage, caseStudyMetadata } from "../../../_shared/case-study-page"

type Props = { params: Promise<{ locale: string; slug: string }> }

export function generateStaticParams() {
  return latinLocales.flatMap((locale) => projectSlugs.map((slug) => ({ locale, slug })))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  return hasLocale(latinLocales, locale) ? caseStudyMetadata(locale, slug) : {}
}

export default async function Page({ params }: Props) {
  const { locale, slug } = await params
  if (!hasLocale(latinLocales, locale)) notFound()
  return <CaseStudyPage locale={locale} slug={slug} />
}

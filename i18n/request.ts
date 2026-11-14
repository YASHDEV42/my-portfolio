import * as rootParams from "next/root-params"
import { hasLocale } from "next-intl"
import { getRequestConfig } from "next-intl/server"
import { notFound } from "next/navigation"
import { routing } from "./routing"

export default getRequestConfig(async ({ locale, requestLocale }) => {
  // An explicit locale wins, then the [locale] root param. The Arabic tree
  // (app/ar) is a static segment with its own root layout, so the param is
  // undefined there and the locale comes from setRequestLocale("ar").
  const resolvedLocale = locale ?? (await rootParams.locale()) ?? (await requestLocale)
  if (!hasLocale(routing.locales, resolvedLocale)) notFound()

  return {
    locale: resolvedLocale,
    messages: (await import(`../messages/${resolvedLocale}.json`)).default,
  }
})

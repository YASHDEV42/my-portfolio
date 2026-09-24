import * as rootParams from "next/root-params"
import { hasLocale } from "next-intl"
import { getRequestConfig } from "next-intl/server"
import { notFound } from "next/navigation"
import { routing } from "./routing"

export default getRequestConfig(async ({ locale }) => {
  const resolvedLocale = locale ?? (await rootParams.locale())
  if (!hasLocale(routing.locales, resolvedLocale)) notFound()

  return {
    locale: resolvedLocale,
    messages: (await import(`../messages/${resolvedLocale}.json`)).default,
  }
})

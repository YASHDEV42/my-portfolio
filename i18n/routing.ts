import { defineRouting } from "next-intl/routing"

export const routing = defineRouting({
  locales: ["en", "tr", "ar"],
  defaultLocale: "en",
  localePrefix: "always",
  localeDetection: false,
})

export type AppLocale = (typeof routing.locales)[number]

/* Arabic is served from its own route tree (app/ar) so that its fonts load
   only there; app/[locale] handles the rest. */
export const latinLocales = routing.locales.filter((locale) => locale !== "ar")

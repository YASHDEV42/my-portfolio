import { Noto_Naskh_Arabic, Noto_Sans_Arabic } from "next/font/google"

/* Arabic faces. Only app/ar/layout.tsx may import this module: next/font
   preloads (and ships the @font-face rules for) a font on every route under
   the layout that imports it, so importing it from the shared [locale] layout
   would make en and tr download ~260 KB of Arabic type they never render. */
export const notoNaskhArabic = Noto_Naskh_Arabic({ subsets: ["arabic"], variable: "--font-noto-naskh-arabic", display: "swap", weight: "variable" })
export const notoSansArabic = Noto_Sans_Arabic({ subsets: ["arabic"], variable: "--font-noto-sans-arabic", display: "swap", weight: "variable" })

export const arabicFontVariables = `${notoNaskhArabic.variable} ${notoSansArabic.variable}`

import { Fraunces, Geist } from "next/font/google"

/* Latin faces, used by every locale. */
export const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces", display: "swap", axes: ["opsz"] })
export const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" })

export const latinFontVariables = `${fraunces.variable} ${geist.variable}`

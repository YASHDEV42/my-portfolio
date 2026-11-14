import type { Metadata } from "next"
import { latinFontVariables } from "../_shared/fonts"
import { arabicFontVariables } from "../_shared/fonts-arabic"
import { RootDocument, rootMetadata, rootViewport } from "../_shared/root-document"

/* Root layout for Arabic: the only place the Arabic fonts are imported, so
   they are loaded and preloaded on /ar and nowhere else. */

export function generateMetadata(): Promise<Metadata> {
  return rootMetadata("ar")
}

export const viewport = rootViewport

export default function ArabicLayout({ children }: { children: React.ReactNode }) {
  return (
    <RootDocument locale="ar" fontVariables={`${latinFontVariables} ${arabicFontVariables}`}>
      {children}
    </RootDocument>
  )
}

"use client"

import { ArrowUpRight, Copy, Check } from "lucide-react"
import { useState } from "react"
import { useTranslations } from "next-intl"
import { site, socials } from "@/lib/site"
import { Reveal, Magnetic } from "./motion-primitives"

export function Contact() {
  const t = useTranslations("Contact")
  const siteT = useTranslations("Site")
  const [copied, setCopied] = useState(false)

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(site.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      setCopied(false)
    }
  }

  return (
    <section id="contact" className="relative scroll-mt-20 bg-paper px-5 py-24 text-ink md:px-8 md:py-36">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="mb-14 flex items-center gap-4">
            <span className="label text-ink/50">{t("index")}</span>
            <span className="h-px flex-1 bg-ink/15" />
            <span className="label text-ink/50">{siteT("availability")}</span>
          </div>
        </Reveal>

        <Reveal>
          <h2 className="max-w-4xl font-serif text-[clamp(2.5rem,7vw,5.5rem)] font-medium leading-[0.98] tracking-[-0.02em] text-balance">
            {t("headingBefore")} <span className="italic text-accent">{t("headingAccent")}</span>{t("headingAfter")}
          </h2>
        </Reveal>

        <Reveal delay={0.08}>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink/70 text-pretty">
            {t("intro")}
          </p>
        </Reveal>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Magnetic>
            <a
              href={`mailto:${site.email}`}
              className="group inline-flex items-center gap-3 rounded-full bg-ink px-7 py-4 text-lg font-medium text-paper transition-transform"
            >
              <bdi>{site.email}</bdi>
              <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </Magnetic>
          <button
            onClick={copyEmail}
            className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-5 py-4 font-medium text-ink transition-colors hover:border-ink/50"
            aria-label={t("copyEmail")}
          >
            {copied ? <Check className="h-4 w-4 text-accent" /> : <Copy className="h-4 w-4" />}
            {copied ? t("copied") : t("copy")}
          </button>
        </div>

        <div className="mt-16 border-t border-ink/15 pt-8">
          <p className="label mb-5 text-ink/50">{t("elsewhere")}</p>
          <ul className="grid gap-x-8 gap-y-1 sm:grid-cols-2 lg:grid-cols-3">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between border-b border-ink/10 py-4 transition-colors hover:border-ink/40"
                >
                  <span className="flex items-baseline gap-3">
                    <span className="font-serif text-xl font-semibold">{s.label}</span>
                    <span className="text-sm text-ink/50" dir="ltr">{s.label === "YouTube" ? t("channel") : s.handle}</span>
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-ink/40 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent rtl:rotate-[-90deg]" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

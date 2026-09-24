"use client"

import { motion } from "motion/react"
import { Check, ImageIcon } from "lucide-react"
import { useTranslations } from "next-intl"
import { about, site } from "@/lib/site"
import { Reveal, useParallax } from "./motion-primitives"

export function About() {
  const t = useTranslations("About")
  const siteT = useTranslations("Site")
  const paragraphs = [t("p1"), t("p2"), t("p3")]
  const enjoys = [t("e1"), t("e2"), t("e3"), t("e4")]
  const { ref, y } = useParallax(40)

  return (
    <section id="about" className="relative scroll-mt-20 bg-paper px-5 py-24 text-ink md:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="mb-14 flex items-center gap-4">
            <span className="label text-ink/50">{t("index")}</span>
            <span className="h-px flex-1 bg-ink/15" />
            <span className="label text-ink/50">{t("label")}</span>
          </div>
        </Reveal>

        <div className="grid gap-12 md:grid-cols-[0.85fr_1.15fr] md:gap-16">
          {/* Portrait placeholder */}
          <div>
            <div ref={ref} className="relative">
              <motion.div style={{ y }} className="relative">
                <div className="relative aspect-[4/5] overflow-hidden rounded-lg border border-ink/15 bg-ink/5">
                  {about.portrait ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={about.portrait} alt={t("portraitAlt")} className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center gap-3 p-6 text-center">
                      <ImageIcon className="h-8 w-8 text-ink/40" strokeWidth={1.5} />
                      <p className="label text-ink/60">{t("portrait")}</p>
                      <p className="max-w-[16rem] text-sm text-ink/50 text-pretty">
                        {t("portraitHelp")}
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
              <div className="mt-4 flex items-center justify-between">
                <span className="font-serif text-lg font-semibold">{site.name}</span>
                <span className="label text-ink/50">{siteT("location")}</span>
              </div>
            </div>
          </div>

          {/* Bio + enjoys */}
          <div>
            <Reveal>
              <h2 className="display-heading font-serif text-[clamp(1.75rem,3.5vw,2.75rem)] font-medium tracking-[-0.01em] text-balance">
                {t("heading")}
              </h2>
            </Reveal>

            <div className="mt-8 space-y-5">
              {paragraphs.map((p, i) => (
                <Reveal key={i} delay={0.05 * i}>
                  <p className="text-lg leading-relaxed text-ink/70 text-pretty">{p}</p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.1}>
              <div className="mt-10 border-t border-ink/15 pt-8">
                <p className="label mb-5 text-ink/50">{t("enjoy")}</p>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {enjoys.map((e) => (
                    <li key={e} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-accent">
                        <Check className="h-3 w-3 text-accent-foreground" strokeWidth={3} />
                      </span>
                      <span className="text-ink/80">{e}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

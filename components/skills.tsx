"use client"

import { useTranslations } from "next-intl"
import { SectionHeading } from "./section-heading"
import { Reveal } from "./motion-primitives"

export function Skills() {
  const t = useTranslations("Skills")
  const strengths = [1, 2, 3].map((i) => ({ title: t(`strength${i}`), body: t(`strength${i}Body`) }))
  const skillGroups = [
    { category: t("frontend"), note: t("frontendNote"), items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Shadcn/ui", "Framer Motion", "i18n"] },
    { category: t("backend"), note: t("backendNote"), items: ["Node.js", "NestJS", "Express.js", "REST APIs", "Authentication", "Webhooks", "Socket.io"] },
    { category: t("dataJobs"), note: t("dataNote"), items: ["PostgreSQL", "MongoDB", "Redis", "BullMQ", "Prisma"] },
    { category: t("delivery"), note: t("deliveryNote"), items: ["Docker", "Nginx", "Git", "Stripe", "Paddle", "Cloudinary", "AI SDK"] },
  ]
  return (
    <section id="skills" className="relative scroll-mt-20 px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index={t("index")}
          label={t("label")}
          title={
            <>
              {t("titleBefore")} <span className="italic text-accent">{t("titleAccent")}</span> {t("titleAfter")}
            </>
          }
          intro={t("intro")}
        />

        {/* Strengths */}
        <div className="grid gap-6 md:grid-cols-3">
          {strengths.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.06}>
              <div className="h-full rounded-lg border border-border bg-card p-6">
                <span className="font-serif text-lg font-semibold text-accent">{`0${i + 1}`}</span>
                <h3 className="mt-3 font-serif text-xl font-semibold tracking-tight">{s.title}</h3>
                <p className="mt-2 leading-relaxed text-muted-foreground text-pretty">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Skill groups */}
        <div className="mt-6 grid gap-px overflow-hidden rounded-lg border border-border bg-border md:mt-8 md:grid-cols-2">
          {skillGroups.map((g, i) => (
            <Reveal key={g.category} delay={(i % 2) * 0.06}>
              <div className="h-full bg-background p-6 md:p-8">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-serif text-2xl font-semibold tracking-tight">{g.category}</h3>
                  <span className="label text-muted-foreground">{`0${i + 1}`}</span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground text-pretty">{g.note}</p>
                <ul className="mt-5 flex flex-wrap gap-2" dir="ltr">
                  {g.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-border px-3 py-1.5 text-sm transition-colors hover:border-accent hover:text-accent"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

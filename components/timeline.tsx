"use client"

import { Briefcase, GraduationCap, MapPin } from "lucide-react"
import { useFormatter, useTranslations } from "next-intl"
import { SectionHeading } from "./section-heading"
import { Reveal } from "./motion-primitives"

export function Timeline() {
  const t = useTranslations("Journey")
  const format = useFormatter()
  const monthYear = (year: number, month: number) =>
    format.dateTime(new Date(Date.UTC(year, month - 1, 1)), {
      year: "numeric",
      month: "long",
      timeZone: "UTC",
    })
  const year = (value: number) => format.number(value, { useGrouping: false })
  const timeline: TimelineItem[] = [
    {
      period: t("dateRange", { start: monthYear(2026, 6), end: t("present") }),
      title: t("flyTitle"),
      org: `FlyRank AI · ${t("internship")}`,
      kind: "work",
      location: t("flyLocation"),
      body: t("flyBody"),
      skills: [t("flyBackend"), t("flyAi")],
    },
    { period: t("ongoing"), title: t("independent"), org: t("selfDirected"), kind: "work", body: t("independentBody") },
    { period: t("expected", { year: year(2028) }), title: t("degree"), org: t("university"), kind: "education", body: t("degreeBody") },
  ]
  const experience = timeline.filter((item) => item.kind === "work")
  const education = timeline.filter((item) => item.kind === "education")

  return (
    <section id="journey" className="relative scroll-mt-20 px-5 py-24 md:px-8 md:py-32">
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

        <div className="grid gap-6 lg:grid-cols-2">
          <JourneyGroup title={t("experience")} icon={Briefcase} items={experience} />
          <JourneyGroup title={t("education")} icon={GraduationCap} items={education} />
        </div>
      </div>
    </section>
  )
}

type TimelineItem = {
  period: string
  title: string
  org: string
  kind: "work" | "education"
  location?: string
  body: string
  skills?: string[]
}

function JourneyGroup({
  title,
  icon: Icon,
  items,
}: {
  title: string
  icon: typeof Briefcase
  items: TimelineItem[]
}) {
  return (
    <div className="rounded-sm border border-border bg-card p-6 md:p-8">
      <div className="mb-8 flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-accent-foreground">
          <Icon className="h-4 w-4" aria-hidden="true" />
        </span>
        <h3 className="font-serif text-2xl font-semibold tracking-tight">{title}</h3>
      </div>

      <ol className="relative border-s border-border ps-8">
        {items.map((item) => (
          <li key={`${item.org}-${item.title}`} className="relative pb-10 last:pb-0">
            <span
              className="absolute -start-[calc(2rem+5px)] top-1 h-2.5 w-2.5 rounded-full border border-accent bg-card"
              aria-hidden="true"
            />
            <Reveal>
              <span className="label text-muted-foreground">{item.period}</span>
              <h4 className="mt-2 font-serif text-2xl font-semibold tracking-tight">{item.title}</h4>
              <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-accent">
                <span>{item.org}</span>
                {item.location && (
                  <span className="inline-flex items-center gap-1 text-sm leading-relaxed text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5 flex-none" aria-hidden="true" />
                    {item.location}
                  </span>
                )}
              </div>
              <p className="mt-3 leading-relaxed text-muted-foreground text-pretty">{item.body}</p>
              {item.skills && (
                <ul className="mt-4 flex flex-wrap gap-2">
                  {item.skills.map((skill) => (
                    <li key={skill} className="rounded-full border border-border px-2.5 py-1 text-xs leading-relaxed text-muted-foreground">
                      {skill}
                    </li>
                  ))}
                </ul>
              )}
            </Reveal>
          </li>
        ))}
      </ol>
    </div>
  )
}

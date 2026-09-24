"use client"

import { skillGroups, strengths } from "@/lib/site"
import { SectionHeading } from "./section-heading"
import { Reveal } from "./motion-primitives"

export function Skills() {
  return (
    <section id="skills" className="relative px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="04 — Capabilities"
          label="Skills & strengths"
          title={
            <>
              The toolkit, and how I <span className="italic text-accent">use</span> it.
            </>
          }
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
                <ul className="mt-5 flex flex-wrap gap-2">
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

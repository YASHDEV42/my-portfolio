"use client"

import { GraduationCap, Briefcase } from "lucide-react"
import { timeline } from "@/lib/site"
import { SectionHeading } from "./section-heading"
import { Reveal } from "./motion-primitives"

export function Timeline() {
  return (
    <section id="timeline" className="relative px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="05 — Path"
          label="Experience & education"
          title={
            <>
              Where I&apos;ve <span className="italic text-accent">studied</span> and built.
            </>
          }
        />

        <ol className="relative border-l border-border pl-8 md:pl-10">
          {timeline.map((item, i) => (
            <li key={i} className="relative pb-12 last:pb-0">
              <span
                className="absolute -left-[calc(2rem+9px)] top-1 flex h-[18px] w-[18px] items-center justify-center rounded-full border border-border bg-card md:-left-[calc(2.5rem+9px)]"
                aria-hidden="true"
              >
                {item.kind === "education" ? (
                  <GraduationCap className="h-2.5 w-2.5 text-accent" />
                ) : (
                  <Briefcase className="h-2.5 w-2.5 text-accent" />
                )}
              </span>
              <Reveal>
                <span className="label text-muted-foreground">{item.period}</span>
                <h3 className="mt-2 font-serif text-2xl font-semibold tracking-tight">{item.title}</h3>
                <p className="mt-1 text-accent">{item.org}</p>
                <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground text-pretty">{item.body}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

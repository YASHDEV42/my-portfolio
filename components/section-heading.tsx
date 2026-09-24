import type { ReactNode } from "react"
import { Reveal } from "./motion-primitives"

export function SectionHeading({
  index,
  label,
  title,
  intro,
  className,
}: {
  index: string
  label: string
  title: ReactNode
  intro?: string
  className?: string
}) {
  return (
    <div className={`mb-14 md:mb-20 ${className ?? ""}`}>
      <Reveal>
        <div className="mb-6 flex items-center gap-4">
          <span className="label text-accent">{index}</span>
          <span className="h-px flex-1 bg-border" />
          <span className="label text-muted-foreground">{label}</span>
        </div>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="max-w-4xl font-serif text-[clamp(2rem,5vw,3.75rem)] font-medium leading-[1.02] tracking-[-0.02em] text-balance">
          {title}
        </h2>
      </Reveal>
      {intro && (
        <Reveal delay={0.1}>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground text-pretty">{intro}</p>
        </Reveal>
      )}
    </div>
  )
}

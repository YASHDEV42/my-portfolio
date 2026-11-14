"use client"

import { Link } from "@/i18n/navigation"
import { useFormatter, useTranslations } from "next-intl"
import { useRef, useState } from "react"
import { useReducedMotion } from "motion/react"
import { ArrowUpRight, Play } from "lucide-react"
import { getProjects, type Project } from "@/lib/site"
import { SectionHeading } from "./section-heading"
import { Reveal } from "./motion-primitives"
import { BrowserFrame, displayHost } from "./browser-frame"
import { ProjectPreview } from "./project-preview"

/* Every card is the same size, so the screenshot slot is too:
   card column − card padding, at each breakpoint. */
const previewSizes = "(min-width: 1216px) 528px, (min-width: 768px) calc(50vw - 80px), calc(100vw - 66px)"

export function SelectedWork() {
  const t = useTranslations()
  const projects = getProjects(t)
  return (
    <section id="work" className="relative scroll-mt-20 px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index={t("Work.index")}
          label={t("Work.label")}
          title={
            <>
              {t("Work.titleBefore")} <span className="italic text-accent">{t("Work.titleAccent")}</span> {t("Work.titleAfter")}
            </>
          }
          intro={t("Work.intro")}
        />

        <div className="grid gap-6 md:grid-cols-2 md:gap-8">
          {projects.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 2) * 0.08}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ project }: { project: Project }) {
  const t = useTranslations("Work")
  const format = useFormatter()
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduce || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const rx = ((e.clientY - rect.top) / rect.height - 0.5) * -6
    const ry = ((e.clientX - rect.left) / rect.width - 0.5) * 6
    ref.current.style.setProperty("--rx", `${rx}deg`)
    ref.current.style.setProperty("--ry", `${ry}deg`)
  }

  function reset() {
    if (!ref.current) return
    ref.current.style.setProperty("--rx", "0deg")
    ref.current.style.setProperty("--ry", "0deg")
  }

  return (
    <Link
      href={`/work/${project.slug}`}
      className="group block h-full"
      aria-label={`${t("viewCaseStudy", { name: project.name, tagline: project.tagline })}${project.videos?.length ? `; ${t("demoAvailable")}` : ""}`}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
    >
      <div
        ref={ref}
        onMouseMove={handleMove}
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => {
          reset()
          setActive(false)
        }}
        className="relative flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card transition-colors duration-500 group-hover:border-accent/50"
        style={{
          transform: "perspective(1000px) rotateX(var(--rx,0)) rotateY(var(--ry,0))",
          transformStyle: "preserve-3d",
          transition: "transform 0.3s ease-out, border-color 0.5s",
        }}
      >
        {/* Framed preview: the screenshot sits in a small browser window with
            room around it instead of running edge to edge. */}
        <div className="p-3 pb-0 sm:p-4 sm:pb-0">
          <BrowserFrame label={displayHost(project.live)}>
            <div className="relative aspect-video overflow-hidden">
              <ProjectPreview
                project={project}
                alt={t("interfaceAlt", { name: project.name })}
                animatedAlt={t("previewAlt", { name: project.name })}
                sizes={previewSizes}
                active={active}
              />
              <span
                aria-hidden="true"
                className="absolute end-3 top-3 flex h-10 w-10 scale-[0.6] items-center justify-center rounded-full bg-accent text-accent-foreground opacity-0 transition duration-300 group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100"
              >
                <ArrowUpRight className="h-5 w-5 rtl:rotate-[-90deg]" />
              </span>
            </div>
          </BrowserFrame>
        </div>

        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-muted-foreground">
            <span className="label">{project.category}</span>
            {project.videos?.length && (
              <span className="label inline-flex items-center gap-1.5">
                <Play className="h-2.5 w-2.5 fill-current rtl:rotate-180" aria-hidden="true" />
                {project.videos.length > 1 ? t("demoVideos") : t("demoVideo")}
              </span>
            )}
            <span className="label ms-auto">{format.number(Number(project.year), { useGrouping: false })}</span>
          </div>
          <h3 className="mt-3 font-serif text-2xl font-semibold leading-tight tracking-tight">{project.name}</h3>
          <p className="mt-2 text-muted-foreground text-pretty">{project.tagline}</p>
          <div className="mt-auto flex flex-wrap gap-2 pt-6">
            {project.stack.map((s) => (
              <span key={s} className="rounded-full border border-border px-2.5 py-1 text-xs leading-relaxed text-muted-foreground">
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  )
}

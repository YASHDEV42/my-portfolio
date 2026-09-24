"use client"

import Image from "next/image"
import { Link } from "@/i18n/navigation"
import { useFormatter, useTranslations } from "next-intl"
import { useRef, useState } from "react"
import { motion, useReducedMotion } from "motion/react"
import { ArrowUpRight, Play } from "lucide-react"
import { getProjects, type Project } from "@/lib/site"
import { SectionHeading } from "./section-heading"
import { Reveal } from "./motion-primitives"

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
            <Reveal key={p.slug} delay={(i % 2) * 0.08} className={i % 3 === 0 ? "md:col-span-2" : ""}>
              <ProjectCard project={p} wide={i % 3 === 0} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ project, wide }: { project: Project; wide: boolean }) {
  const t = useTranslations("Work")
  const format = useFormatter()
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)

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
    >
      <div
        ref={ref}
        onMouseMove={handleMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => {
          reset()
          setHovered(false)
        }}
        className="relative flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card transition-colors duration-500 group-hover:border-accent/50"
        style={{
          transform: "perspective(1000px) rotateX(var(--rx,0)) rotateY(var(--ry,0))",
          transformStyle: "preserve-3d",
          transition: "transform 0.3s ease-out, border-color 0.5s",
        }}
      >
        <div className={`relative overflow-hidden ${wide ? "aspect-[16/8]" : "aspect-[16/10]"}`}>
          <Image
            src={project.image || "/placeholder.svg"}
            alt={t("interfaceAlt", { name: project.name })}
            fill
            sizes={wide ? "(max-width: 768px) 100vw, 1152px" : "(max-width: 768px) 100vw, 576px"}
            className="object-cover object-top transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/10 to-transparent" />
          <div className="absolute start-4 top-4 flex flex-wrap gap-2">
            <span className="rounded-full bg-background/70 px-3 py-1 text-xs font-medium leading-relaxed backdrop-blur-sm">
              {project.category}
            </span>
            {project.videos?.length && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-background/70 px-3 py-1 text-xs font-medium leading-relaxed backdrop-blur-sm">
                <Play className="h-3 w-3 fill-current" aria-hidden="true" />
                {project.videos.length > 1 ? t("demoVideos") : t("demoVideo")}
              </span>
            )}
          </div>
          <motion.div
            className="absolute end-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-accent text-accent-foreground"
            initial={false}
            animate={reduce ? {} : { scale: hovered ? 1 : 0.6, opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ArrowUpRight className="h-5 w-5 rtl:rotate-[-90deg]" />
          </motion.div>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="font-serif text-2xl font-semibold leading-tight tracking-tight">{project.name}</h3>
            <span className="label text-muted-foreground">{format.number(Number(project.year), { useGrouping: false })}</span>
          </div>
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

import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowUpRight, CodeXml } from "lucide-react"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { routing } from "@/i18n/routing"
import { Link } from "@/i18n/navigation"
import { getProjects, projectSlugs, site } from "@/lib/site"
import { Reveal } from "@/components/motion-primitives"
import { SiteFooter } from "@/components/site-footer"
import { ProjectMedia } from "@/components/project-media"
import { LanguageSelector } from "@/components/site-nav"

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => projectSlugs.map((slug) => ({ locale, slug })))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params
  const t = await getTranslations({ locale })
  const project = getProjects(t).find((item) => item.slug === slug)
  if (!project) return {}
  const path = `/work/${slug}`
  const canonical = `${site.url}/${locale}${path}`
  return {
    title: `${project.name} — ${project.tagline}`,
    description: project.problem,
    alternates: { canonical, languages: { en: `${site.url}/en${path}`, tr: `${site.url}/tr${path}`, ar: `${site.url}/ar${path}`, "x-default": `${site.url}/en${path}` } },
    openGraph: { url: canonical, locale: locale === "ar" ? "ar_AR" : locale === "tr" ? "tr_TR" : "en_US", title: `${project.name} — ${project.tagline}`, description: project.problem, images: [{ url: project.image }] }
  }
}

export default async function CaseStudyPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale })
  const projects = getProjects(t)
  const project = projects.find((item) => item.slug === slug)
  if (!project) notFound()
  const next = projects[(projects.findIndex((item) => item.slug === slug) + 1) % projects.length]

  return <><main className="relative px-5 pb-24 pt-28 md:px-8 md:pt-32"><div className="absolute end-5 top-5 z-50 md:end-8 md:top-6"><LanguageSelector /></div><article className="mx-auto max-w-5xl">
    <Reveal><Link href="/#work" className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-accent"><ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5 rtl:rotate-180 rtl:group-hover:translate-x-0.5" />{t("CaseStudy.allWork")}</Link></Reveal>
    <header className="mt-8 border-b border-border pb-10">
      <Reveal><div className="flex flex-wrap items-center gap-3"><span className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">{project.category}</span><span className="label text-muted-foreground" dir="ltr">{project.year}</span></div></Reveal>
      <Reveal delay={0.05}><h1 className="mt-5 font-serif text-[clamp(2.5rem,7vw,5rem)] font-medium leading-[0.98] tracking-[-0.02em] text-balance" dir="ltr">{project.name}</h1></Reveal>
      <Reveal delay={0.1}><p className="mt-4 max-w-2xl text-xl text-muted-foreground text-pretty">{project.tagline}</p></Reveal>
      <Reveal delay={0.15}><div className="mt-8 flex flex-wrap gap-4">
        <a href={project.live} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 font-medium text-accent-foreground">{t("CaseStudy.visit")}<ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:rotate-[-90deg]" /></a>
        {project.repo && <a href={project.repo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 font-medium transition-colors hover:border-accent hover:text-accent"><CodeXml className="h-4 w-4" />{t("CaseStudy.source")}</a>}
        {project.repoPrivate && <button type="button" aria-disabled="true" className="group/private relative inline-flex cursor-not-allowed items-center gap-2 rounded-full border border-border px-5 py-3 font-medium text-muted-foreground opacity-65" aria-describedby="private-repository-note" title={t("CaseStudy.privateRepository")}><CodeXml className="h-4 w-4" aria-hidden="true" /><span className="hidden sm:inline">{t("CaseStudy.source")}</span><span className="sm:hidden">{t("CaseStudy.privateSource")}</span><span id="private-repository-note" role="tooltip" className="pointer-events-none absolute start-0 top-full z-10 mt-2 hidden whitespace-nowrap rounded-sm border border-border bg-card px-3 py-2 text-xs font-normal text-foreground opacity-0 shadow-xl transition-opacity group-hover/private:opacity-100 group-focus-visible/private:opacity-100 sm:block">{t("CaseStudy.privateRepository")}</span></button>}
      </div></Reveal>
    </header>
    <Reveal delay={0.05}><ProjectMedia name={project.name} image={project.image} videos={project.videos} /></Reveal>
    <div className="mt-16 grid gap-12 md:grid-cols-[1fr_2fr] md:gap-16"><aside className="md:sticky md:top-28 md:self-start"><Reveal><dl className="space-y-6">
      <div><dt className="label text-muted-foreground">{t("CaseStudy.role")}</dt><dd className="mt-1.5">{project.role}</dd></div>
      <div><dt className="label text-muted-foreground">{t("CaseStudy.year")}</dt><dd className="mt-1.5" dir="ltr">{project.year}</dd></div>
      <div><dt className="label text-muted-foreground">{t("CaseStudy.stack")}</dt><dd className="mt-2 flex flex-wrap gap-2" dir="ltr">{project.stack.map((value) => <span key={value} className="rounded-full border border-border px-2.5 py-1 text-xs text-muted-foreground">{value}</span>)}</dd></div>
    </dl></Reveal></aside>
    <div className="space-y-12"><CaseBlock title={t("CaseStudy.problem")} body={project.problem} /><CaseBlock title={t("CaseStudy.contribution")} body={project.contribution} />
      <div><Reveal><h2 className="font-serif text-2xl font-semibold tracking-tight">{t("CaseStudy.decisions")}</h2></Reveal><ul className="mt-5 space-y-4">{project.decisions.map((decision, index) => <Reveal key={index} delay={index * 0.05}><li className="flex gap-4 border-s-2 border-accent/40 ps-4"><span className="font-serif text-accent" dir="ltr">{`0${index + 1}`}</span><span className="leading-relaxed text-muted-foreground text-pretty">{decision}</span></li></Reveal>)}</ul></div>
      <CaseBlock title={t("CaseStudy.outcome")} body={project.outcome} />
    </div></div>
    <Reveal><Link href={`/work/${next.slug}`} className="group mt-24 flex items-center justify-between border-t border-border pt-10"><div><span className="label text-muted-foreground">{t("CaseStudy.next")}</span><p className="mt-2 font-serif text-3xl font-semibold tracking-tight transition-colors group-hover:text-accent md:text-4xl" dir="ltr">{next.name}</p></div><ArrowUpRight className="h-8 w-8 text-muted-foreground transition-all group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-accent rtl:rotate-[-90deg]" /></Link></Reveal>
  </article></main><SiteFooter /></>
}

function CaseBlock({ title, body }: { title: string; body: string }) {
  return <div><Reveal><h2 className="font-serif text-2xl font-semibold tracking-tight">{title}</h2></Reveal><Reveal delay={0.05}><p className="mt-4 text-lg leading-relaxed text-muted-foreground text-pretty">{body}</p></Reveal></div>
}

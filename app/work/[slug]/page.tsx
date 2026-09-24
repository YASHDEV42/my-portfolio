import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowUpRight, CodeXml } from "lucide-react"
import { projects } from "@/lib/site"
import { Reveal } from "@/components/motion-primitives"
import { SiteFooter } from "@/components/site-footer"

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)
  if (!project) return {}
  return {
    title: `${project.name} — ${project.tagline}`,
    description: project.problem,
    openGraph: {
      title: `${project.name} — ${project.tagline}`,
      description: project.problem,
      images: [{ url: project.image }],
    },
  }
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)
  if (!project) notFound()

  const index = projects.findIndex((p) => p.slug === slug)
  const next = projects[(index + 1) % projects.length]

  return (
    <>
      <main className="px-5 pb-24 pt-28 md:px-8 md:pt-32">
        <article className="mx-auto max-w-5xl">
          <Reveal>
            <Link
              href="/#work"
              className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-accent"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
              All work
            </Link>
          </Reveal>

          <header className="mt-8 border-b border-border pb-10">
            <Reveal>
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
                  {project.category}
                </span>
                <span className="label text-muted-foreground">{project.year}</span>
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="mt-5 font-serif text-[clamp(2.5rem,7vw,5rem)] font-medium leading-[0.98] tracking-[-0.02em] text-balance">
                {project.name}
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-4 max-w-2xl text-xl text-muted-foreground text-pretty">{project.tagline}</p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 font-medium text-accent-foreground"
                >
                  Visit live site
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
                {project.repo && (
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 font-medium transition-colors hover:border-accent hover:text-accent"
                  >
                    <CodeXml className="h-4 w-4" />
                    Source
                  </a>
                )}
              </div>
            </Reveal>
          </header>

          <Reveal delay={0.05}>
            <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-lg border border-border bg-card">
              <Image
                src={project.image || "/placeholder.svg"}
                alt={`${project.name} interface`}
                fill
                sizes="(max-width: 1024px) 100vw, 1024px"
                className="object-cover object-top"
                priority
              />
            </div>
          </Reveal>

          <div className="mt-16 grid gap-12 md:grid-cols-[1fr_2fr] md:gap-16">
            <aside className="md:sticky md:top-28 md:self-start">
              <Reveal>
                <dl className="space-y-6">
                  <div>
                    <dt className="label text-muted-foreground">Role</dt>
                    <dd className="mt-1.5">{project.role}</dd>
                  </div>
                  <div>
                    <dt className="label text-muted-foreground">Year</dt>
                    <dd className="mt-1.5">{project.year}</dd>
                  </div>
                  <div>
                    <dt className="label text-muted-foreground">Stack</dt>
                    <dd className="mt-2 flex flex-wrap gap-2">
                      {project.stack.map((s) => (
                        <span key={s} className="rounded-full border border-border px-2.5 py-1 text-xs text-muted-foreground">
                          {s}
                        </span>
                      ))}
                    </dd>
                  </div>
                </dl>
              </Reveal>
            </aside>

            <div className="space-y-12">
              <CaseBlock title="The problem" body={project.problem} />
              <CaseBlock title="My contribution" body={project.contribution} />
              <div>
                <Reveal>
                  <h2 className="font-serif text-2xl font-semibold tracking-tight">Key decisions</h2>
                </Reveal>
                <ul className="mt-5 space-y-4">
                  {project.decisions.map((d, i) => (
                    <Reveal key={i} delay={i * 0.05}>
                      <li className="flex gap-4 border-l-2 border-accent/40 pl-4">
                        <span className="font-serif text-accent">{`0${i + 1}`}</span>
                        <span className="leading-relaxed text-muted-foreground text-pretty">{d}</span>
                      </li>
                    </Reveal>
                  ))}
                </ul>
              </div>
              <CaseBlock title="Outcome" body={project.outcome} />
            </div>
          </div>

          {/* Next project */}
          <Reveal>
            <Link
              href={`/work/${next.slug}`}
              className="group mt-24 flex items-center justify-between border-t border-border pt-10"
            >
              <div>
                <span className="label text-muted-foreground">Next project</span>
                <p className="mt-2 font-serif text-3xl font-semibold tracking-tight transition-colors group-hover:text-accent md:text-4xl">
                  {next.name}
                </p>
              </div>
              <ArrowUpRight className="h-8 w-8 text-muted-foreground transition-all group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-accent" />
            </Link>
          </Reveal>
        </article>
      </main>
      <SiteFooter />
    </>
  )
}

function CaseBlock({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <Reveal>
        <h2 className="font-serif text-2xl font-semibold tracking-tight">{title}</h2>
      </Reveal>
      <Reveal delay={0.05}>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground text-pretty">{body}</p>
      </Reveal>
    </div>
  )
}

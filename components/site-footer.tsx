import { site } from "@/lib/site"

export function SiteFooter() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-border px-5 py-10 md:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div>
          <p className="font-serif text-lg font-semibold">{site.name}</p>
          <p className="mt-1 text-sm text-muted-foreground">{site.role}</p>
        </div>
        <div className="flex flex-col items-start gap-1 md:items-end">
          <a
            href={`mailto:${site.email}`}
            className="text-sm text-muted-foreground transition-colors hover:text-accent"
          >
            {site.email}
          </a>
          <p className="text-sm text-muted-foreground">
            &copy; {year} {site.name}. Built with Next.js.
          </p>
        </div>
      </div>
    </footer>
  )
}

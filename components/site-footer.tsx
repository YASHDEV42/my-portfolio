import { site } from "@/lib/site";
import { useFormatter, useTranslations } from "next-intl";

export function SiteFooter() {
  const t = useTranslations("Footer");
  const siteT = useTranslations("Site");
  const format = useFormatter();
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border px-5 py-10 md:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div>
          <p className="font-serif text-lg font-semibold">{site.name}</p>
          <p className="mt-1 text-sm text-muted-foreground">{siteT("role")}</p>
        </div>
        <div className="flex flex-col items-start gap-1 md:items-end">
          <a
            href={`mailto:${site.email}`}
            className="text-sm text-muted-foreground transition-colors hover:text-accent"
          >
            <bdi>{site.email}</bdi>
          </a>
          <p className="text-sm text-muted-foreground">
            {t("copyright", { year: format.number(year, { useGrouping: false }) })}
          </p>
        </div>
      </div>
    </footer>
  );
}

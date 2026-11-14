import { getTranslations, setRequestLocale } from "next-intl/server"
import { site, socials } from "@/lib/site"
import { SiteNav } from "@/components/site-nav"
import { Hero } from "@/components/hero"
import { SelectedWork } from "@/components/selected-work"
import { About } from "@/components/about"
import { Process } from "@/components/process"
import { Skills } from "@/components/skills"
import { Timeline } from "@/components/timeline"
import { Contact } from "@/components/contact"
import { SiteFooter } from "@/components/site-footer"

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: "Site" })

  // schema.org Person, so search engines can tie the site to the profiles.
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    url: `${site.url}/${locale}`,
    jobTitle: t("role"),
    // Profile pages only: the WhatsApp entry is a click-to-chat link, not a
    // page that identifies the person.
    sameAs: socials.filter((social) => !social.href.startsWith("https://wa.me/")).map((social) => social.href),
  }

  return (
    <>
      <script
        type="application/ld+json"
        // "<" is escaped so the payload can never close the script element.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(person).replace(/</g, "\\u003c") }}
      />
      <SiteNav />
      <main id="main">
        <Hero />
        <SelectedWork />
        <About />
        <Process />
        <Skills />
        <Timeline />
        <Contact />
      </main>
      <SiteFooter />
    </>
  )
}

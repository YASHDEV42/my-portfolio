import { SiteNav } from "@/components/site-nav"
import { Hero } from "@/components/hero"
import { SelectedWork } from "@/components/selected-work"
import { About } from "@/components/about"
import { Process } from "@/components/process"
import { Skills } from "@/components/skills"
import { Timeline } from "@/components/timeline"
import { Contact } from "@/components/contact"
import { SiteFooter } from "@/components/site-footer"

export default function HomePage() {
  return (
    <>
      <SiteNav />
      <main>
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

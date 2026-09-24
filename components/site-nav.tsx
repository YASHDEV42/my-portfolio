"use client"

import { useEffect, useId, useRef, useState } from "react"
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react"
import { Check, Globe2 } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"
import { usePathname, useRouter } from "@/i18n/navigation"
import { Magnetic } from "./motion-primitives"

const languages = [
  { labelKey: "english", locale: "en" },
  { labelKey: "turkish", locale: "tr" },
  { labelKey: "arabic", locale: "ar" },
] as const

export function LanguageSelector({ mobile = false }: { mobile?: boolean }) {
  const t = useTranslations("Navigation")
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const menuId = useId()

  useEffect(() => {
    if (!open) return

    const closeOnOutsideClick = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false)
    }
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false)
        triggerRef.current?.focus()
      }
    }

    document.addEventListener("pointerdown", closeOnOutsideClick)
    document.addEventListener("keydown", closeOnEscape)
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick)
      document.removeEventListener("keydown", closeOnEscape)
    }
  }, [open])

  const focusMenuItem = (index: number) => {
    const items = containerRef.current?.querySelectorAll<HTMLButtonElement>("[role='menuitemradio']")
    items?.[index]?.focus()
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        className={`inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card transition-colors hover:border-accent hover:text-accent ${
          mobile ? "h-12 px-5 font-medium" : "h-10 w-10"
        }`}
        aria-label={t("chooseLanguage")}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((value) => !value)}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown") {
            event.preventDefault()
            setOpen(true)
            requestAnimationFrame(() => focusMenuItem(0))
          }
        }}
      >
        <Globe2 className="h-4 w-4" aria-hidden="true" />
        {mobile && <span>{t("language")}</span>}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id={menuId}
            role="menu"
            aria-label={t("languages")}
            className={`absolute top-full z-50 mt-2 w-52 overflow-hidden rounded-sm border border-border bg-card p-1 shadow-2xl ${
              mobile ? "start-0" : "end-0"
            }`}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.16 }}
            onKeyDown={(event) => {
              const items = Array.from(
                containerRef.current?.querySelectorAll<HTMLButtonElement>("[role='menuitemradio']") ?? [],
              )
              const currentIndex = items.indexOf(document.activeElement as HTMLButtonElement)

              if (event.key === "ArrowDown" || event.key === "ArrowUp") {
                event.preventDefault()
                const direction = event.key === "ArrowDown" ? 1 : -1
                items[(currentIndex + direction + items.length) % items.length]?.focus()
              } else if (event.key === "Home" || event.key === "End") {
                event.preventDefault()
                items[event.key === "Home" ? 0 : items.length - 1]?.focus()
              }
            }}
          >
            {languages.map((language) => (
              <button
                key={language.locale}
                type="button"
                role="menuitemradio"
                aria-checked={language.locale === locale}
                lang={language.locale}
                dir={language.locale === "ar" ? "rtl" : "ltr"}
                className="flex w-full items-center justify-between rounded-sm px-3 py-2.5 text-start text-sm text-foreground transition-colors hover:bg-muted focus-visible:bg-muted"
                onClick={() => {
                  setOpen(false)
                  if (language.locale !== locale) router.replace(`${pathname}${window.location.hash}` as never, { locale: language.locale })
                }}
              >
                <span>{t(language.labelKey)}</span>
                {language.locale === locale && (
                  <Check className="h-4 w-4 text-accent" aria-hidden="true" />
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function SiteNav() {
  const t = useTranslations("Navigation")
  const locale = useLocale()
  const links = [
    { label: t("work"), href: "#work" }, { label: t("about"), href: "#about" },
    { label: t("process"), href: "#process" }, { label: t("skills"), href: "#skills" },
    { label: t("journey"), href: "#journey" },
  ]
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.2 })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          scrolled ? "backdrop-blur-md" : ""
        }`}
        style={{
          backgroundColor: scrolled ? "color-mix(in oklch, var(--background) 78%, transparent)" : "transparent",
          borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
        }}
      >
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-8">
          <a href="#top" className="group flex items-center gap-2" aria-label={t("home")}>
            <span className="font-serif text-xl font-semibold tracking-tight">Yahya Chanat</span>
            <span className="h-1.5 w-1.5 rounded-full bg-accent transition-transform duration-300 group-hover:scale-150" />
          </a>

          <ul className="hidden items-center gap-8 md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="label text-muted-foreground transition-colors hover:text-foreground"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-3 md:flex">
            <Magnetic>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                </span>
                {t("contact")}
              </a>
            </Magnetic>
            <LanguageSelector />
          </div>

          <button
            className="relative z-50 flex h-10 w-10 items-center justify-center md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? t("closeMenu") : t("openMenu")}
            aria-expanded={open}
          >
            <span className="sr-only">{open ? t("closeMenu") : t("openMenu")}</span>
            <div className="relative h-4 w-6">
              <span
                className={`absolute start-0 h-0.5 w-6 bg-foreground transition-all duration-300 ${
                  open ? "top-1.5 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute start-0 top-1.5 h-0.5 w-6 bg-foreground transition-all duration-300 ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute start-0 h-0.5 w-6 bg-foreground transition-all duration-300 ${
                  open ? "top-1.5 -rotate-45" : "top-3"
                }`}
              />
            </div>
          </button>
        </nav>

        <motion.div
          className="h-px origin-left bg-accent rtl:origin-right"
          style={{ scaleX: progress }}
          aria-hidden="true"
        />
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col justify-center bg-background px-6 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ul className="flex flex-col gap-2">
              {links.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, x: locale === "ar" ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + i * 0.06 }}
                >
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block font-serif text-4xl font-semibold tracking-tight text-foreground"
                  >
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-10 inline-flex w-fit items-center gap-2 rounded-full bg-accent px-5 py-3 font-medium text-accent-foreground"
            >
              {t("contact")}
            </a>
            <div className="mt-4">
              <LanguageSelector mobile />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

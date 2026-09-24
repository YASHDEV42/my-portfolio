"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { ArrowDownRight, Download } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { site } from "@/lib/site";
import { Magnetic, RevealLines } from "./motion-primitives";

export function Hero() {
  const t = useTranslations("Hero");
  const locale = useLocale();
  const headline = [t("headline1"), t("headline2"), t("headline3"), t("headline4")];
  const stats = [{ value: t("stat1Value"), label: t("stat1Label") }, { value: t("stat2Value"), label: t("stat2Label") }, { value: t("stat3Value"), label: t("stat3Label") }];
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const textY = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? [0, 0] : [0, 120],
  );
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // function handlePointer(e: React.PointerEvent<HTMLElement>) {
  //   if (reduce || !ref.current) return;
  //   const rect = ref.current.getBoundingClientRect();
  //   ref.current.style.setProperty(
  //     "--mx",
  //     `${((e.clientX - rect.left) / rect.width) * 100}%`,
  //   );
  //   ref.current.style.setProperty(
  //     "--my",
  //     `${((e.clientY - rect.top) / rect.height) * 100}%`,
  //   );
  // }

  return (
    <section
      ref={ref}
      id="top"
      // onPointerMove={handlePointer}
      className="relative flex min-h-svh scroll-mt-20 flex-col justify-center overflow-hidden px-5 pb-16 pt-28 md:px-8"
      style={{
        background:
          "radial-gradient(560px circle at var(--mx,30%) var(--my,20%), color-mix(in oklch, var(--accent) 12%, transparent), transparent 60%)",
      }}
    >
      {/* faint hairline grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />

      <motion.div
        style={{ y: textY, opacity: fade }}
        className="relative mx-auto w-full max-w-6xl"
      >
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 flex flex-wrap items-center gap-x-4 gap-y-2"
        >
          {site.availabilityOpen && (
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1.5 text-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              {t("availability")}
            </span>
          )}
        </motion.div>

        <h1 className="hero-headline font-serif text-[clamp(2.75rem,9vw,7.5rem)] font-medium leading-[0.92] tracking-[-0.02em] text-balance">
          <RevealLines
            lines={headline}
            accentIndex={1}
            lineWrapperClassName="hero-reveal-line"
            unmasked={locale === "ar"}
          />
        </h1>

        <div className="mt-10 grid gap-10 md:grid-cols-[1.1fr_1fr] md:items-end">
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="max-w-xl text-lg leading-relaxed text-muted-foreground text-pretty"
          >
            {t("intro")}
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.62 }}
            className="flex flex-wrap items-center gap-4 md:justify-end"
          >
            <Magnetic>
              <a
                href="#work"
                className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 font-medium text-accent-foreground transition-transform"
              >
                {t("viewWork")}
                <ArrowDownRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5 rtl:rotate-90" />
              </a>
            </Magnetic>
            <Magnetic strength={0.25}>
              <a
                href={site.resume}
                download
                className="group inline-flex items-center gap-2 rounded-full border border-border px-6 py-3.5 font-medium transition-colors hover:border-accent hover:text-accent"
              >
                <Download className="h-4 w-4" />
                {t("downloadCv")}
              </a>
            </Magnetic>
          </motion.div>
        </div>

        <motion.dl
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-14 grid max-w-2xl grid-cols-3 gap-6 border-t border-border pt-6"
        >
          {stats.map((s) => (
            <div key={s.label}>
              <dt className="font-serif text-2xl font-semibold md:text-3xl">
                {s.value}
              </dt>
              <dd className="mt-1 text-sm text-muted-foreground">{s.label}</dd>
            </div>
          ))}
        </motion.dl>
      </motion.div>

      <motion.a
        href="#work"
        aria-label={t("scrollToWork")}
        style={{ opacity: fade }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-muted-foreground md:flex"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
      >
        <span className="label">{t("scroll")}</span>
        <motion.span
          animate={reduce ? {} : { y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
        >
          <ArrowDownRight className="h-4 w-4" />
        </motion.span>
      </motion.a>
    </section>
  );
}

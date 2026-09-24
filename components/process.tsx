"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { useTranslations } from "next-intl";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./motion-primitives";

export function Process() {
  const t = useTranslations("Process");
  const process = [1, 2, 3, 4, 5].map((step) => ({ step: `0${step}`, title: t(`s${step}Title`), body: t(`s${step}Body`) }));
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });

  return (
    <section id="process" className="relative scroll-mt-20 px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index={t("index")}
          label={t("label")}
          title={
            <>
              {t("titleBefore")} <span className="italic text-accent">{t("titleAccent")}</span> {t("titleAfter")}
            </>
          }
          intro={t("intro")}
        />

        <div ref={ref} className="relative ps-10 md:ps-0">
          {/* Spine (mobile: left, desktop: center) */}
          <div
            className="absolute start-[7px] top-2 h-full w-px bg-border md:start-1/2 md:-translate-x-1/2 rtl:md:translate-x-1/2"
            aria-hidden="true"
          >
            <motion.div
              className="absolute inset-x-0 top-0 origin-top bg-accent"
              style={{ height: "100%", scaleY }}
            />
          </div>

          <ol className="space-y-12 md:space-y-0">
            {process.map((p, i) => (
              <li
                key={p.step}
                className="relative md:grid md:min-h-34 md:grid-cols-2 md:gap-16"
              >
                {/* node */}
                <span
                  className="absolute start-[37px] top-1.5 z-10 flex h-4 w-4 items-center justify-center rounded-full border border-accent bg-background md:start-1/2 md:-translate-x-1/2 rtl:md:translate-x-1/2"
                  aria-hidden="true"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                </span>

                <div
                  className={
                    i % 2 === 0
                      ? "md:col-start-1 md:pb-12 md:text-end rtl:md:col-start-2"
                      : "md:col-start-2 md:pb-12 rtl:md:col-start-1"
                  }
                >
                  <Reveal>
                    <div
                      className={`flex items-baseline gap-3 ${i % 2 === 0 ? "md:justify-end rtl:md:justify-start" : "rtl:md:justify-end"}`}
                    >
                      <span className="font-serif text-4xl font-semibold text-accent/80">
                        {p.step}
                      </span>
                      <h3 className="font-serif text-2xl font-semibold tracking-tight">
                        {p.title}
                      </h3>
                    </div>
                    <p className="mt-3 max-w-md leading-relaxed text-muted-foreground text-pretty md:inline-block">
                      {p.body}
                    </p>
                  </Reveal>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

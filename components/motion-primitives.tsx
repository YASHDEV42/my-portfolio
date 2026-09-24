"use client"

import { type ReactNode, useRef } from "react"
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react"

/* Scroll-triggered reveal. Falls back to a plain, instant element when the
   user prefers reduced motion. */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
  as = "div",
}: {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
  as?: "div" | "span" | "li" | "section"
}) {
  const reduce = useReducedMotion()
  const MotionTag = motion[as] as typeof motion.div

  if (reduce) {
    const Tag = as
    return <Tag className={className}>{children}</Tag>
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  )
}

/* Staggered word/line reveal for editorial headlines. */
export function RevealLines({
  lines,
  className,
  lineClassName,
  lineWrapperClassName,
  accentIndex,
}: {
  lines: string[]
  className?: string
  lineClassName?: string
  lineWrapperClassName?: string
  accentIndex?: number
}) {
  const reduce = useReducedMotion()

  return (
    <span className={className}>
      {lines.map((line, i) => (
        <span key={i} className={`reveal-line-mask block ${lineWrapperClassName ?? ""}`}>
          <motion.span
            className={`block ${lineClassName ?? ""} ${i === accentIndex ? "text-accent italic" : ""}`}
            initial={reduce ? false : { y: "145%" }}
            animate={reduce ? {} : { y: 0 }}
            transition={{
              duration: 0.9,
              delay: 0.15 + i * 0.09,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

/* Magnetic hover element — subtly pulls toward the cursor. Disabled for
   reduced-motion and touch (no hover). */
export function Magnetic({
  children,
  className,
  strength = 0.35,
}: {
  children: ReactNode
  className?: string
  strength?: number
}) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const x = useSpring(0, { stiffness: 220, damping: 18, mass: 0.4 })
  const y = useSpring(0, { stiffness: 220, damping: 18, mass: 0.4 })

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduce || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const relX = e.clientX - (rect.left + rect.width / 2)
    const relY = e.clientY - (rect.top + rect.height / 2)
    x.set(relX * strength)
    y.set(relY * strength)
  }

  function handleLeave() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x, y }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* Returns a parallax MotionValue tied to element scroll progress. */
export function useParallax(range = 60): {
  ref: React.RefObject<HTMLDivElement | null>
  y: MotionValue<number>
} {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [range, -range])
  return { ref, y }
}

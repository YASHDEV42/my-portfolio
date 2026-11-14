"use client"

import type { ReactNode } from "react"
import { MotionConfig } from "motion/react"

/* Site-wide motion settings. `reducedMotion="user"` makes every motion
   component honour prefers-reduced-motion (transforms are applied without
   animating), so individual components don't each have to remember to. */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}

"use client"

import { useCallback, useSyncExternalStore } from "react"

/* Hydration-safe media query: reports `false` on the server and during
   hydration, then the real value. Use this (not motion's useReducedMotion)
   for anything that changes the rendered markup, so server and client HTML
   always agree. */
export function useMediaQuery(query: string) {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const media = window.matchMedia(query)
      media.addEventListener("change", onChange)
      return () => media.removeEventListener("change", onChange)
    },
    [query],
  )
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  )
}

export const usePrefersReducedMotion = () => useMediaQuery("(prefers-reduced-motion: reduce)")

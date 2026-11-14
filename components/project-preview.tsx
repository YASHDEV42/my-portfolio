"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { useInView } from "motion/react"
import type { Project } from "@/lib/site"
import { projectPreviews } from "./project-previews"
import { useMediaQuery, usePrefersReducedMotion } from "./use-media-query"

/*
  The media inside a project card's browser frame. Fills its (relative,
  aspect-ratio'd) parent. What it renders is decided by `project.preview`:

    image      the static screenshot (default)
    video      a muted loop over an optimised poster; plays on hover/focus on
               desktop, while in view on touch, never under reduced motion
    component  an animated preview from components/project-previews
*/
export function ProjectPreview({
  project,
  alt,
  animatedAlt,
  sizes,
  active,
}: {
  project: Project
  alt: string
  /** Accessible name used when the preview is an animation, not a screenshot. */
  animatedAlt: string
  sizes: string
  /** The card is hovered or focused. */
  active: boolean
}) {
  const preview = project.preview ?? { type: "image" }

  if (preview.type === "component") {
    const Component = projectPreviews[preview.id]
    if (Component) return <ComponentPreview Component={Component} label={animatedAlt} />
  }

  const still = (
    <Image
      src={(preview.type === "video" && preview.poster) || project.image || "/placeholder.svg"}
      alt={alt}
      fill
      sizes={sizes}
      className="object-cover object-top transition-transform duration-[900ms] ease-out group-hover:scale-[1.03]"
    />
  )

  if (preview.type === "video") {
    return (
      <VideoPreview src={preview.src} active={active}>
        {still}
      </VideoPreview>
    )
  }

  return still
}

function ComponentPreview({
  Component,
  label,
}: {
  Component: (typeof projectPreviews)[string]
  label: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: 0.4 })
  const reduce = usePrefersReducedMotion()
  return (
    <div ref={ref} role="img" aria-label={label} className="absolute inset-0">
      <Component playing={inView && !reduce} />
    </div>
  )
}

function VideoPreview({ src, active, children }: { src: string; active: boolean; children: React.ReactNode }) {
  const wrapper = useRef<HTMLDivElement>(null)
  const video = useRef<HTMLVideoElement>(null)
  const [started, setStarted] = useState(false)
  const inView = useInView(wrapper, { amount: 0.5 })
  const reduce = usePrefersReducedMotion()
  const canHover = useMediaQuery("(hover: hover) and (pointer: fine)")
  const shouldPlay = !reduce && inView && (canHover ? active : true)

  useEffect(() => {
    const element = video.current
    if (!element) return
    if (shouldPlay) {
      // preload="none": nothing is downloaded until the first play().
      element.play().catch(() => {})
    } else {
      element.pause()
    }
  }, [shouldPlay])

  return (
    <div ref={wrapper} className="absolute inset-0">
      {children}
      <video
        ref={video}
        src={src}
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
        tabIndex={-1}
        onPlaying={() => setStarted(true)}
        className={`absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-500 ${
          started ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  )
}

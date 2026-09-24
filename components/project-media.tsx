"use client"

import Image from "next/image"
import { useState } from "react"
import { ArrowUpRight, Play } from "lucide-react"
import { useTranslations } from "next-intl"
import type { ProjectVideo } from "@/lib/site"

export function ProjectMedia({
  name,
  image,
  videos,
}: {
  name: string
  image: string
  videos?: ProjectVideo[]
}) {
  const t = useTranslations("Media")
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null)
  const activeVideo = videos?.find((video) => video.youtubeId === activeVideoId)
  const firstVideo = videos?.[0]

  if (!firstVideo) {
    return (
      <div className="relative mt-10 aspect-video overflow-hidden rounded-lg border border-border bg-card">
        <Image
          src={image || "/placeholder.svg"}
          alt={t("interfaceAlt", { name })}
          fill
          sizes="(max-width: 1024px) 100vw, 1024px"
          className="object-cover object-top"
          priority
        />
      </div>
    )
  }

  return (
    <div className="mt-10">
      <div className="relative aspect-video overflow-hidden rounded-lg border border-border bg-card">
        {activeVideo ? (
          <iframe
            key={activeVideo.youtubeId}
            src={`https://www.youtube-nocookie.com/embed/${activeVideo.youtubeId}`}
              title={`${name} — ${activeVideo.label}`}
            className="absolute inset-0 h-full w-full"
            loading="lazy"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
          <>
            <Image
              src={image || "/placeholder.svg"}
              alt={t("interfaceAlt", { name })}
              fill
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover object-top"
              priority
            />
            <div className="absolute inset-0 bg-background/35" aria-hidden="true" />
            <button
              type="button"
              onClick={() => setActiveVideoId(firstVideo.youtubeId)}
              className="group absolute inset-0 flex flex-col items-center justify-center gap-3 text-foreground"
              aria-label={t("load", { label: firstVideo.label, name })}
            >
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-2xl transition-transform duration-300 group-hover:scale-110">
                <Play className="ms-1 h-6 w-6 fill-current rtl:rotate-180" aria-hidden="true" />
              </span>
              <span className="rounded-full bg-background/80 px-4 py-2 text-sm font-medium backdrop-blur-sm">
                {t("play", { label: firstVideo.label })}
              </span>
            </button>
          </>
        )}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <span className="label me-1 text-muted-foreground">{videos.length > 1 ? t("demoVideos") : t("demoVideo")}</span>
        {videos.map((video) => (
          <button
            key={video.youtubeId}
            type="button"
            onClick={() => setActiveVideoId(video.youtubeId)}
            aria-pressed={activeVideoId === video.youtubeId}
            className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${
              activeVideoId === video.youtubeId
                ? "border-accent bg-accent text-accent-foreground"
                : "border-border text-muted-foreground hover:border-accent hover:text-accent"
            }`}
          >
            {video.label}
          </button>
        ))}
        {videos.map((video) => (
          <a
            key={`${video.youtubeId}-fallback`}
            href={video.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-accent"
          >
            {t("watch", { label: video.label })}
            <ArrowUpRight className="h-3.5 w-3.5 rtl:rotate-[-90deg]" aria-hidden="true" />
          </a>
        ))}
      </div>
    </div>
  )
}

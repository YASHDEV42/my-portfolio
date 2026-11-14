import type { ComponentType } from "react"
import dynamic from "next/dynamic"

/*
  Registry of animated project previews.

  To add one:
    1. Create components/project-previews/<id>.tsx exporting a component that
       takes `ProjectPreviewProps`. It is rendered inside the 16:9 viewport of
       the browser frame, so make it fill its parent (`absolute inset-0`) and
       size things in `cqw` units so it scales with the card.
    2. Register it below under its id.
    3. Point a project at it in lib/site.ts:
         preview: { type: "component", id: "<id>" }

  Keep previews abstract and light: tokens from globals.css, a few shapes,
  one short loop. `playing` is false while the card is offscreen or the user
  prefers reduced motion — render a finished, static state in that case.
*/

export type ProjectPreviewProps = {
  playing: boolean
}

export const projectPreviews: Record<string, ComponentType<ProjectPreviewProps>> = {
  "chat-realtime": dynamic(() => import("./chat-realtime").then((module) => module.ChatRealtimePreview)),
}

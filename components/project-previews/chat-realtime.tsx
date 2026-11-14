"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import type { ProjectPreviewProps } from "."

/*
  YASHCHAT — a one-to-one conversation arriving in real time.
  Abstract on purpose: skeleton lines instead of copy (nothing to translate),
  the design tokens instead of the product's own colours. Everything is sized
  in cqw so the scene scales with the frame it sits in.
*/

type Message = { from: "them" | "me"; lines: number[] }

const messages: Message[] = [
  { from: "them", lines: [30, 19] },
  { from: "me", lines: [22] },
  { from: "them", lines: [15] },
  { from: "me", lines: [27, 12] },
]

/* One step per second: how many messages are on screen, and whether the
   other person is typing. The last step is the resting state. */
const steps = [
  { count: 0, typing: true },
  { count: 1, typing: false },
  { count: 2, typing: false },
  { count: 2, typing: true },
  { count: 3, typing: false },
  { count: 4, typing: false },
  { count: 4, typing: false },
  { count: 4, typing: false },
]
const REST = steps.length - 1
const STEP_MS = 1000

const enter = { height: "auto", opacity: 1 }
const leave = { height: 0, opacity: 0 }
const transition = { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const }

export function ChatRealtimePreview({ playing }: ProjectPreviewProps) {
  const [step, setStep] = useState(REST)

  useEffect(() => {
    if (!playing) return
    const id = window.setInterval(() => setStep((current) => (current + 1) % steps.length), STEP_MS)
    return () => window.clearInterval(id)
  }, [playing])

  const { count, typing } = steps[step]

  return (
    <div dir="ltr" aria-hidden="true" className="@container absolute inset-0 bg-background">
      <div className="flex h-full flex-col px-[7cqw] pb-[3cqw] pt-[2.5cqw]">
        {/* Contact row with the live-connection signal */}
        <div className="flex items-center gap-[1.8cqw] border-b border-border pb-[2.2cqw]">
          <span className="h-[3.6cqw] w-[3.6cqw] rounded-full border border-border bg-card" />
          <span className="h-[1.2cqw] w-[15cqw] rounded-full bg-muted-foreground/40" />
          <span className="relative ms-auto flex h-[1.4cqw] w-[1.4cqw]">
            {playing && <span className="absolute inset-0 animate-ping rounded-full bg-accent opacity-60" />}
            <span className="relative h-full w-full rounded-full bg-accent" />
          </span>
        </div>

        {/* Conversation, growing from the bottom */}
        <div className="flex min-h-0 flex-1 flex-col justify-end overflow-hidden">
          <AnimatePresence initial={false}>
            {messages.slice(0, count).map((message, index) => (
              <motion.div
                key={index}
                initial={leave}
                animate={enter}
                exit={leave}
                transition={transition}
                className={`flex ${message.from === "me" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`mt-[1.6cqw] flex flex-col gap-[1.1cqw] rounded-[2cqw] border px-[2.4cqw] py-[1.7cqw] ${
                    message.from === "me"
                      ? "rounded-br-[0.5cqw] border-accent/35 bg-accent/10"
                      : "rounded-bl-[0.5cqw] border-border bg-card"
                  }`}
                >
                  {message.lines.map((width, line) => (
                    <span
                      key={line}
                      style={{ width: `${width}cqw` }}
                      className={`h-[1.2cqw] rounded-full ${message.from === "me" ? "bg-accent/70" : "bg-muted-foreground/45"}`}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
            {typing && (
              <motion.div key="typing" initial={leave} animate={enter} exit={leave} transition={transition} className="flex">
                <div className="mt-[1.6cqw] flex items-center gap-[0.9cqw] rounded-[2cqw] rounded-bl-[0.5cqw] border border-border bg-card px-[2.4cqw] py-[1.7cqw]">
                  {[0, 1, 2].map((dot) => (
                    <span
                      key={dot}
                      style={{ animationDelay: `${dot * 160}ms` }}
                      className="h-[1.2cqw] w-[1.2cqw] animate-pulse rounded-full bg-muted-foreground/70"
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Composer */}
        <div className="mt-[2.6cqw] flex items-center gap-[1.8cqw]">
          <span className="flex h-[5cqw] flex-1 items-center rounded-full border border-border px-[2.4cqw]">
            <span className="h-[1.2cqw] w-[12cqw] rounded-full bg-border" />
          </span>
          <span className="h-[5cqw] w-[5cqw] rounded-full border border-accent/50" />
        </div>
      </div>
    </div>
  )
}

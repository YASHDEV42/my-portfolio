import type { ReactNode } from "react"

/* Minimal browser-window chrome for project media: a thin title bar with
   three dots and an optional address label, built from the card/border
   tokens. Children are the viewport — give them their own aspect ratio.
   The bar is decorative and always laid out left-to-right, like the window
   it depicts. */
export function BrowserFrame({
  label,
  children,
  className,
}: {
  label?: string
  children: ReactNode
  className?: string
}) {
  return (
    <div className={`overflow-hidden rounded-md border border-border bg-background ${className ?? ""}`}>
      <div
        aria-hidden="true"
        dir="ltr"
        className="grid h-7 grid-cols-[1fr_auto_1fr] items-center gap-3 border-b border-border bg-muted px-3"
      >
        <span className="flex gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-border" />
          <span className="h-1.5 w-1.5 rounded-full bg-border" />
          <span className="h-1.5 w-1.5 rounded-full bg-border" />
        </span>
        {label && (
          <span className="max-w-[60vw] truncate text-[0.6875rem] leading-none tracking-wide text-muted-foreground/80 sm:max-w-xs">
            {label}
          </span>
        )}
      </div>
      {children}
    </div>
  )
}

/* "https://www.example.com/path" → "example.com", for the frame's label. */
export function displayHost(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "")
  } catch {
    return undefined
  }
}

"use client"

import { useEffect, useRef, type RefObject } from "react"

/*
  Hero background — a golden rectangle subdividing into a Fibonacci spiral,
  drafted like an architectural construction drawing.

  - Hairline construction lines in --border, the spiral is the single --accent
    element. Colours are read from the CSS variables at runtime.
  - The figure is laid out against the headline box (`anchorRef`): it sits on
    the end side of the container, shares the headline's vertical centre and
    never grows taller than it, so it frames the type instead of crossing the
    stats row. Everything is computed in LTR and mirrored for dir="rtl".
  - Draws itself once (~3.2s, ease-out), then goes idle: the rAF loop only runs
    while something is actually changing (intro, or easing toward the pointer).
    It also stops while the hero is offscreen or the tab is hidden.
  - prefers-reduced-motion: the finished drawing is painted once, no loop.
*/

const PHI = (1 + Math.sqrt(5)) / 2
const DRAW_MS = 3200
const DELAY_MS = 300
const PARALLAX_PX = 5
const QUARTER = Math.PI / 2

type Timed = { start: number; span: number }
type Rule = Timed & { x1: number; y1: number; x2: number; y2: number }
type Arc = Timed & { cx: number; cy: number; r: number; a0: number }
type Figure = {
  x: number
  y: number
  w: number
  h: number
  rules: Rule[]
  arcs: Arc[]
  eye: { x: number; y: number }
}

const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v))
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)
const smooth = (t: number) => t * t * (3 - 2 * t)
/* Centre a 1px stroke on the pixel grid so hairlines stay crisp. */
const crisp = (v: number) => Math.round(v - 0.5) + 0.5

/* Builds the construction for a golden rectangle whose top-left corner is
   (x, y) and whose width is w. Squares are cut off in the order end side →
   top → start side → bottom, so the spiral winds inward to an eye that sits
   in the lower start-side third of the rectangle. */
function buildFigure(x: number, y: number, w: number): Figure {
  const h = w / PHI
  const rules: Rule[] = []
  const arcs: Arc[] = []
  let cursor = 0
  let arcEnd = 0

  const time = (length: number, isArc: boolean): Timed => {
    // Longer strokes take longer, but sub-linearly, so the small inner
    // squares still read as individual moves instead of flashing by.
    const span = Math.pow(length, 0.6)
    let start = cursor
    if (isArc) {
      // The spiral is one continuous line: an arc never starts before the
      // previous one has finished.
      start = Math.max(start, arcEnd)
      arcEnd = start + span
    }
    cursor = start + span * 0.7
    return { start, span }
  }

  /* A construction line, extended past both ends the way a drafted line
     overshoots its corner. */
  const rule = (x1: number, y1: number, x2: number, y2: number, over: number) => {
    const length = Math.hypot(x2 - x1, y2 - y1)
    const ux = (x2 - x1) / length
    const uy = (y2 - y1) / length
    const vertical = x1 === x2
    const ax = vertical ? crisp(x1) : x1 - ux * over
    const bx = vertical ? crisp(x2) : x2 + ux * over
    const ay = vertical ? y1 - uy * over : crisp(y1)
    const by = vertical ? y2 + uy * over : crisp(y2)
    rules.push({ x1: ax, y1: ay, x2: bx, y2: by, ...time(length + over * 2, false) })
  }

  const over = clamp(w * 0.012, 3, 8)
  rule(x, y, x + w, y, over)
  rule(x + w, y, x + w, y + h, over)
  rule(x + w, y + h, x, y + h, over)
  rule(x, y + h, x, y, over)

  let rx = x
  let ry = y
  let rw = w
  let rh = h
  for (let i = 0; i < 24; i++) {
    const side = i % 4
    const s = side % 2 === 0 ? rh : rw
    if (s < 1.5) break
    let cx: number
    let cy: number
    let cut: [number, number, number, number]
    if (side === 0) {
      cx = rx + rw - s
      cy = ry + rh
      cut = [cx, ry, cx, ry + rh]
      rw -= s
    } else if (side === 1) {
      cx = rx + rw
      cy = ry + s
      cut = [rx + rw, cy, rx, cy]
      ry += s
      rh -= s
    } else if (side === 2) {
      cx = rx + s
      cy = ry
      cut = [cx, ry + rh, cx, ry]
      rx += s
      rw -= s
    } else {
      cx = rx
      cy = ry + rh - s
      cut = [rx, cy, rx + rw, cy]
      rh -= s
    }
    // Below a few pixels the subdivision lines would only add mud.
    if (s >= 7) rule(...cut, Math.min(over, s * 0.05))
    arcs.push({ cx, cy, r: s, a0: -i * QUARTER, ...time(s * QUARTER, true) })
  }

  const total = Math.max(cursor, arcEnd)
  for (const stroke of [...rules, ...arcs]) {
    stroke.start /= total
    stroke.span /= total
  }

  const k = 1 / (1 + PHI * PHI)
  return { x, y, w, h, rules, arcs, eye: { x: x + w * k, y: y + h * (1 - k) } }
}

/* Position of `el` inside `root`, ignoring transforms (the headline's parent
   is scroll-parallaxed, which must not move the drawing). */
function offsetWithin(el: HTMLElement, root: HTMLElement) {
  let x = 0
  let y = 0
  let node: HTMLElement | null = el
  while (node && node !== root) {
    x += node.offsetLeft
    y += node.offsetTop
    node = node.offsetParent as HTMLElement | null
  }
  return { x, y }
}

/* Width of the widest rendered line of text inside `el`. Text-node ranges are
   used so the result doesn't depend on the markup, and widths are unaffected
   by the reveal animation's vertical transforms. */
function widestLine(el: HTMLElement) {
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT)
  const range = document.createRange()
  let widest = 0
  while (walker.nextNode()) {
    range.selectNodeContents(walker.currentNode)
    for (const rect of range.getClientRects()) widest = Math.max(widest, rect.width)
  }
  return widest
}

export function HeroGoldenCanvas({ anchorRef }: { anchorRef?: RefObject<HTMLElement | null> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const host = canvas?.parentElement
    const ctx = canvas?.getContext("2d")
    if (!canvas || !host || !ctx) return
    const anchor = anchorRef?.current ?? null

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    const pointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)")

    let reduce = motionQuery.matches
    let width = 0
    let height = 0
    let dpr = 1
    let rtl = false
    let figure: Figure | null = null
    let fadeSpan = 0
    let colors = { rule: "", label: "", accent: "", serif: "serif" }

    let raf = 0
    let last = 0
    let elapsed = 0
    let inView = true
    const offset = { x: 0, y: 0 }
    const target = { x: 0, y: 0 }

    const readTheme = () => {
      const style = getComputedStyle(canvas)
      const value = (name: string) => style.getPropertyValue(name).trim()
      rtl = style.direction === "rtl"
      colors = {
        rule: value("--border"),
        label: value("--muted-foreground"),
        accent: value("--accent"),
        serif: [value("--font-fraunces"), "ui-serif", "Georgia", "serif"].filter(Boolean).join(", "),
      }
    }

    const layout = () => {
      width = host.clientWidth
      height = host.clientHeight
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      const pixelWidth = Math.round(width * dpr)
      const pixelHeight = Math.round(height * dpr)
      if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
        canvas.width = pixelWidth
        canvas.height = pixelHeight
      }

      // Anchor box in logical (LTR) coordinates. In RTL the canvas is
      // mirrored at paint time, so "start" is always the left here.
      let box = { x: width * 0.08, y: height * 0.2, w: width * 0.84, h: height * 0.5 }
      let textWidth = 0
      if (anchor) {
        const position = offsetWithin(anchor, host)
        const left = rtl ? width - position.x - anchor.offsetWidth : position.x
        box = { x: left, y: position.y, w: anchor.offsetWidth, h: anchor.offsetHeight }
        textWidth = widestLine(anchor)
      }

      // The figure starts just past the widest headline line and bleeds past
      // the container on the end side. The start is limited to a band, so an
      // unusually long line runs under the faded edge of the drawing instead
      // of crushing it; `fadeSpan` widens that fade by however far it intrudes.
      const wide = width >= 768
      const end = box.x + box.w + (wide ? clamp(box.w * 0.12, 28, 140) : box.w * 0.4)
      const clearance = textWidth + clamp(box.w * 0.02, 8, 24)
      const inset = clamp(clearance, box.w * 0.42, box.w * (wide ? 0.66 : 0.7))
      let figureWidth = end - (box.x + inset)
      figureWidth = Math.min(figureWidth, box.h * PHI)
      fadeSpan = Math.max(figureWidth * 0.4, clearance - inset + figureWidth * 0.25)
      const figureHeight = figureWidth / PHI
      figure = buildFigure(
        Math.round(end - figureWidth),
        Math.round(box.y + (box.h - figureHeight) / 2),
        Math.round(figureWidth),
      )
    }

    const paint = () => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, width, height)
      if (!figure || width === 0) return

      const progress = reduce ? 1 : easeOutCubic(clamp((elapsed - DELAY_MS) / DRAW_MS))
      const at = (stroke: Timed) => clamp((progress - stroke.start) / stroke.span)
      const { x, y, w, h, eye } = figure

      ctx.save()
      if (rtl) {
        ctx.translate(width, 0)
        ctx.scale(-1, 1)
      }
      ctx.translate(rtl ? -offset.x : offset.x, offset.y)
      ctx.lineCap = "butt"

      // Construction lines — one path, so crossings don't double their alpha.
      ctx.beginPath()
      for (const line of figure.rules) {
        const p = at(line)
        if (p <= 0) continue
        ctx.moveTo(line.x1, line.y1)
        ctx.lineTo(line.x1 + (line.x2 - line.x1) * p, line.y1 + (line.y2 - line.y1) * p)
      }
      ctx.strokeStyle = colors.rule
      ctx.lineWidth = 1
      ctx.stroke()

      // Annotations fade in once the drawing has mostly settled.
      const notes = smooth(clamp((progress - 0.7) / 0.3))
      if (notes > 0) {
        const gap = clamp(w * 0.03, 12, 22)
        const dimY = crisp(y - gap)
        const mid = x + w / 2
        const labelSize = clamp(w * 0.022, 12, 15)
        ctx.globalAlpha = notes
        ctx.beginPath()
        // dimension line, broken around its label
        ctx.moveTo(x, dimY)
        ctx.lineTo(mid - labelSize, dimY)
        ctx.moveTo(mid + labelSize, dimY)
        ctx.lineTo(x + w, dimY)
        // end ticks, and one where the first square is cut off
        for (const tickX of [x, x + w - h, x + w]) {
          ctx.moveTo(crisp(tickX), dimY - 3.5)
          ctx.lineTo(crisp(tickX), dimY + 3.5)
        }
        // the eye
        const ring = clamp(w * 0.011, 4.5, 8)
        ctx.moveTo(eye.x + ring, eye.y)
        ctx.arc(eye.x, eye.y, ring, 0, Math.PI * 2)
        ctx.stroke()

        ctx.save()
        ctx.translate(mid, dimY)
        if (rtl) ctx.scale(-1, 1) // keep the glyph readable in the mirrored canvas
        ctx.globalAlpha = notes * 0.75
        ctx.fillStyle = colors.label
        ctx.font = `italic 400 ${labelSize}px ${colors.serif}`
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillText("φ", 0, 0)
        ctx.restore()
        ctx.globalAlpha = 1
      }

      // The spiral — the one accent element. A single continuous path.
      let tip: { x: number; y: number } | null = null
      ctx.beginPath()
      for (const arc of figure.arcs) {
        const p = at(arc)
        if (p <= 0) break
        const endAngle = arc.a0 - QUARTER * p
        ctx.arc(arc.cx, arc.cy, arc.r, arc.a0, endAngle, true)
        tip = { x: arc.cx + Math.cos(endAngle) * arc.r, y: arc.cy + Math.sin(endAngle) * arc.r }
      }
      if (tip) {
        ctx.strokeStyle = colors.accent
        ctx.lineWidth = 1.25
        ctx.globalAlpha = 0.55
        ctx.stroke()
        // Its leading point, which comes to rest in the eye.
        const point = progress >= 1 ? eye : tip
        ctx.beginPath()
        ctx.arc(point.x, point.y, 1.75, 0, Math.PI * 2)
        ctx.fillStyle = colors.accent
        ctx.globalAlpha = 0.9
        ctx.fill()
        ctx.globalAlpha = 1
      }

      // Thin the drawing out toward the headline so type always wins.
      const fade = ctx.createLinearGradient(x, 0, x + fadeSpan, 0)
      fade.addColorStop(0, "rgba(0,0,0,0.24)")
      fade.addColorStop(1, "rgba(0,0,0,1)")
      ctx.globalCompositeOperation = "destination-in"
      ctx.fillStyle = fade
      ctx.fillRect(-width, -height, width * 3, height * 3)
      ctx.restore()
    }

    const settled = () =>
      elapsed >= DELAY_MS + DRAW_MS &&
      Math.abs(target.x - offset.x) < 0.05 &&
      Math.abs(target.y - offset.y) < 0.05

    // Time is taken from the rAF timestamps themselves, so the intro runs on
    // the wall clock no matter how much other work shares the frame.
    const tick = (now: number) => {
      const delta = last ? Math.min(now - last, 64) : 16
      last = now
      elapsed += delta
      const ease = 1 - Math.exp(-delta / 220)
      offset.x += (target.x - offset.x) * ease
      offset.y += (target.y - offset.y) * ease
      paint()
      raf = settled() ? 0 : requestAnimationFrame(tick)
    }

    const wake = () => {
      if (raf || reduce || !inView || document.hidden) return
      last = 0 // time spent asleep doesn't count
      raf = requestAnimationFrame(tick)
    }

    const sleep = () => {
      if (raf) cancelAnimationFrame(raf)
      raf = 0
    }

    const refresh = () => {
      readTheme()
      layout()
      paint()
      if (!settled()) wake()
    }

    const onPointerMove = (event: PointerEvent) => {
      if (reduce || !pointerQuery.matches) return
      // Drift a few pixels against the pointer, like a sheet lying further back.
      target.x = -(event.clientX / window.innerWidth - 0.5) * 2 * PARALLAX_PX
      target.y = -(event.clientY / window.innerHeight - 0.5) * 2 * PARALLAX_PX
      wake()
    }

    const onVisibility = () => (document.hidden ? sleep() : wake())

    const onMotionChange = () => {
      reduce = motionQuery.matches
      if (reduce) {
        sleep()
        offset.x = offset.y = target.x = target.y = 0
        paint()
      } else {
        wake()
      }
    }

    const resizeObserver = new ResizeObserver(refresh)
    resizeObserver.observe(host)
    if (anchor) resizeObserver.observe(anchor)

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting
      if (inView) wake()
      else sleep()
    })
    intersectionObserver.observe(canvas)

    // Stay in sync if the theme is ever switched on <html>.
    const themeObserver = new MutationObserver(refresh)
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "style", "data-theme", "dir"],
    })

    window.addEventListener("pointermove", onPointerMove, { passive: true })
    document.addEventListener("visibilitychange", onVisibility)
    motionQuery.addEventListener("change", onMotionChange)
    // The φ label uses the display face; repaint once it has loaded.
    let disposed = false
    document.fonts?.ready.then(() => {
      if (!disposed) paint()
    })

    refresh()

    return () => {
      disposed = true
      sleep()
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
      themeObserver.disconnect()
      window.removeEventListener("pointermove", onPointerMove)
      document.removeEventListener("visibilitychange", onVisibility)
      motionQuery.removeEventListener("change", onMotionChange)
    }
  }, [anchorRef])

  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full" />
}

"use client"

import * as React from "react"

/*
 * The FrameX intro's gold dust, drawn on a canvas around the Wordmark: from
 * the hit on, motes drift up around the lockup, swaying and twinkling, and
 * fade within 4.2 s.
 *
 * The canvas keeps the logo's time: it carries a CSS animation that changes
 * nothing (framex-dust-clock), timed like every other moving part, and each
 * frame is drawn from that animation's current time. Whatever starts, holds
 * or restarts the logo's animations — LogoIntro, LogoSound — moves the dust
 * with them. Every path is closed-form in time and seeded, so a frame is the
 * same at any frame rate and on every run.
 */

/** Seconds after the hit when the last mote is gone (the clock's duration). */
const END = 4.2
const TAU = Math.PI * 2

/** Seeded PRNG (mulberry32): the same dust every run. */
function seeded(seed: number) {
  let s = seed | 0
  return () => {
    s = (s + 0x6d2b79f5) | 0
    let t = Math.imul(s ^ (s >>> 15), 1 | s)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** Gold from pale to deep: `heat` 0–1 → an rgb() colour. */
function goldAt(heat: number) {
  const stops = [
    [255, 251, 238],
    [255, 233, 170],
    [246, 200, 96],
    [219, 150, 48],
  ] as const
  const x = Math.max(0, Math.min(1, heat)) * (stops.length - 1)
  const i = Math.min(stops.length - 2, Math.floor(x))
  const [a, b] = [stops[i] ?? stops[0], stops[i + 1] ?? stops[0]]
  return `rgb(${a.map((v, k) => Math.round(v + ((b[k] ?? v) - v) * (x - i))).join(",")})`
}

/**
 * The motes: where each shows up around the lockup (x, y: -1…1 of its
 * half-size, spread wider), when after the hit and for how long (s), how fast
 * it rises and drifts (stage heights per second — the stage being about 5.4
 * lockups tall), how it sways and twinkles (Hz), its size (px at a 56 px
 * wordmark) and colour.
 */
const DUST = (() => {
  const r = seeded(1930)
  return Array.from({ length: 56 }, () => {
    const born = 0.08 + 1.6 * Math.pow(r(), 1.5)
    return {
      born,
      life: Math.min(1.4 + 1.6 * r(), END - born),
      x: r() * 2 - 1,
      y: r() * 2 - 1,
      rise: 0.015 + 0.045 * r(),
      drift: (r() * 2 - 1) * 0.012,
      sway: 0.6 + 0.8 * r(),
      size: 0.6 + 1.4 * r(),
      twinkle: 2 + 3 * r(),
      phase: r() * TAU,
      color: goldAt(0.12 + 0.3 * r()),
    }
  })
})()

/** A soft round light, drawn once and stamped under each mote. */
function glowSprite() {
  const size = 64
  const c = document.createElement("canvas")
  c.width = c.height = size
  const g = c.getContext("2d")
  if (!g) return c
  const r = size / 2
  const fill = g.createRadialGradient(r, r, 0, r, r, r)
  fill.addColorStop(0, "rgba(255,247,224,1)")
  fill.addColorStop(0.18, "rgba(255,222,150,0.55)")
  fill.addColorStop(0.5, "rgba(244,186,84,0.14)")
  fill.addColorStop(1, "rgba(230,160,60,0)")
  g.fillStyle = fill
  g.fillRect(0, 0, size, size)
  return c
}

/** Seconds since the hit on the canvas's clock animation, or null when it has none. */
function clockTime(canvas: HTMLCanvasElement) {
  const clock = canvas.getAnimations().find((a) => (a as CSSAnimation).animationName === "framex-dust-clock")
  const timing = clock?.effect?.getComputedTiming()
  if (!clock || !timing || timing.localTime == null) return null
  const local = Number(timing.localTime)
  return { clock, t: (local - Number(clock.effect?.getTiming().delay ?? 0)) / 1000 }
}

/** Draws the dust on `canvas` whenever its clock runs. Returns a cleanup. */
function animate(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d")
  const lockup = canvas.parentElement
  if (!ctx || !lockup) return () => {}
  const glow = glowSprite()
  let dpr = 1
  let blank = false

  /** Matches the canvas to its box; resizing clears it. */
  const resize = () => {
    dpr = Math.min(2, window.devicePixelRatio || 1)
    const [width, height] = [Math.round(canvas.clientWidth * dpr), Math.round(canvas.clientHeight * dpr)]
    if (width === canvas.width && height === canvas.height) return
    canvas.width = width
    canvas.height = height
    blank = true
  }

  const paint = (t: number | null) => {
    const shows = t !== null && t >= 0 && t < END
    if (!shows && blank) return
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.globalAlpha = 1
    ctx.globalCompositeOperation = "source-over"
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    blank = !shows
    if (!shows) return
    // Layout sizes, not boxes on screen: the lockup's shake moves the canvas with it.
    const w = lockup.offsetWidth
    const h = lockup.offsetHeight
    const cx = (w / 2 - canvas.offsetLeft) * dpr
    const cy = (h / 2 - canvas.offsetTop) * dpr
    const stage = h * 5.4 * dpr
    const scale = (h / 69) * dpr
    ctx.globalCompositeOperation = "lighter"
    for (const d of DUST) {
      const age = t - d.born
      if (age <= 0 || age >= d.life) continue
      const u = age / d.life
      const x = cx + d.x * (w / 2) * 1.2 * dpr + d.drift * stage * age + Math.sin(TAU * d.sway * age + d.phase) * 0.006 * stage
      const y = cy + d.y * (h / 2) * 1.8 * dpr - d.rise * stage * age
      const alpha = 0.9 * Math.pow(Math.sin(Math.PI * u), 1.2) * (0.55 + 0.45 * Math.sin(TAU * d.twinkle * age + d.phase))
      const g = d.size * 5 * scale
      ctx.globalAlpha = alpha * 0.6
      ctx.drawImage(glow, x - g, y - g, g * 2, g * 2)
      ctx.globalAlpha = alpha
      ctx.fillStyle = d.color
      ctx.beginPath()
      ctx.arc(x, y, d.size * 0.5 * scale, 0, TAU)
      ctx.fill()
    }
  }

  // Runs while the clock runs (its delay included); a paused or finished
  // clock stops it, and the clock's next start wakes it up again.
  let frame = 0
  const tick = () => {
    frame = 0
    const now = clockTime(canvas)
    paint(now?.t ?? null)
    if (now?.clock.playState === "running") frame = requestAnimationFrame(tick)
  }
  const wake = () => {
    if (!frame) frame = requestAnimationFrame(tick)
  }

  resize()
  // The box follows the lockup, which widens and narrows while the name tracks
  // in: redraw right away, or the cleared canvas is what gets shown.
  const observer = new ResizeObserver(() => {
    resize()
    paint(clockTime(canvas)?.t ?? null)
    wake()
  })
  observer.observe(canvas)
  canvas.addEventListener("animationstart", wake)
  wake()
  return () => {
    cancelAnimationFrame(frame)
    observer.disconnect()
    canvas.removeEventListener("animationstart", wake)
  }
}

/**
 * Gold dust around the FrameX Wordmark during its intro. `hit`: seconds
 * from the start of the intro to the impact. Sits in the Wordmark (which is
 * `relative`), reaching past it on every side.
 */
function FrameXDust({ hit }: { hit: number }) {
  const ref = React.useRef<HTMLCanvasElement>(null)
  React.useEffect(() => (ref.current ? animate(ref.current) : undefined), [])
  return (
    <canvas
      ref={ref}
      aria-hidden
      data-slot="logo-dust"
      className="pointer-events-none absolute -top-[150%] -left-[16%] h-[310%] w-[132%] animate-framex-dust-clock mix-blend-screen motion-reduce:hidden motion-reduce:animate-none"
      style={{ "--logo-delay": `${Math.round(hit * 1000)}ms` } as React.CSSProperties}
    />
  )
}

export { FrameXDust }

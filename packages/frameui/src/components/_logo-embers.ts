/*
 * The FrameX intro's gold dust, drawn on a canvas over the stage: from the
 * hit on, embers drift up around the logo, swaying and twinkling, and fade.
 *
 * Every path is closed-form in time, so each frame is drawn from the clock
 * alone: in step with the sound at any frame rate, and the same on every run
 * (seeded).
 */

type EmbersOptions = {
  /** The canvas, covering the stage. */
  canvas: HTMLCanvasElement
  /** The logo the embers rise around. */
  logo: Element
  /** When they start (the hit), as a `performance.now()` time. */
  at: number
}

const TAU = Math.PI * 2
/** Seconds after `at` when the last ember is gone. */
const END = 4.2

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

/** Gold, from pale to deep, as 64 ready-made colours. */
const RAMP = (() => {
  const stops = [
    [255, 251, 238],
    [255, 233, 170],
    [246, 200, 96],
    [219, 150, 48],
  ] as const
  return Array.from({ length: 64 }, (_, i) => {
    const x = (i / 63) * (stops.length - 1)
    const a = stops[Math.floor(x)] ?? stops[0]
    const b = stops[Math.min(stops.length - 1, Math.floor(x) + 1)] ?? a
    const f = x - Math.floor(x)
    return `rgb(${a.map((v, k) => Math.round(v + ((b[k] ?? v) - v) * f)).join(",")})`
  })
})()
const color = (u: number) => RAMP[Math.max(0, Math.min(63, Math.round(u * 63)))] ?? "#f6c860"

/** A soft round light, drawn once and stamped. */
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

/**
 * Starts the embers; they draw themselves until `END`, then the canvas is
 * left clear. Returns a function that stops them early.
 */
function embers({ canvas, logo, at }: EmbersOptions) {
  const ctx = canvas.getContext("2d")
  if (!ctx) return () => {}
  const glow = glowSprite()
  const r = seeded(1930)

  const dust = Array.from({ length: 56 }, () => {
    const born = 0.08 + 1.6 * Math.pow(r(), 1.5)
    return {
      born,
      life: Math.min(1.4 + 1.6 * r(), END - born),
      x: r() * 2 - 1,
      y: r() * 2 - 1,
      rise: 0.015 + 0.045 * r(),
      driftX: (r() * 2 - 1) * 0.012,
      sway: 0.6 + 0.8 * r(),
      size: 0.6 + 1.4 * r(),
      twinkle: 2 + 3 * r(),
      phase: r() * TAU,
      heat: 0.12 + 0.3 * r(),
    }
  })

  let dpr = 1
  let width = 0
  let height = 0
  /** The logo's centre and half-size, in canvas pixels; measured on the first frame, kept. */
  let place: { x: number; y: number; w: number; h: number } | null = null

  const resize = () => {
    dpr = Math.min(2, window.devicePixelRatio || 1)
    width = Math.round(canvas.clientWidth * dpr)
    height = Math.round(canvas.clientHeight * dpr)
    canvas.width = width
    canvas.height = height
    place = null
  }
  const measure = () => {
    const box = canvas.getBoundingClientRect()
    const all = logo.getBoundingClientRect()
    return (place = {
      x: (all.left + all.width / 2 - box.left) * dpr,
      y: (all.top + all.height / 2 - box.top) * dpr,
      w: (all.width / 2) * dpr,
      h: (all.height / 2) * dpr,
    })
  }

  const draw = (now: number) => {
    const T = (now - at) / 1000
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.globalAlpha = 1
    ctx.globalCompositeOperation = "source-over"
    ctx.clearRect(0, 0, width, height)
    if (T >= END) return false
    if (T < 0) return true
    const p = place ?? measure()
    const S = Math.min(width, height)
    ctx.globalCompositeOperation = "lighter"
    for (const e of dust) {
      const t = T - e.born
      if (t <= 0 || t >= e.life) continue
      const u = t / e.life
      const x = p.x + e.x * p.w * 1.2 + e.driftX * S * t + Math.sin(TAU * e.sway * t + e.phase) * 0.006 * S
      const y = p.y + e.y * p.h * 1.8 - e.rise * S * t
      const alpha =
        0.9 * Math.pow(Math.sin(Math.PI * u), 1.2) * (0.55 + 0.45 * Math.sin(TAU * e.twinkle * t + e.phase))
      const g = e.size * 5 * dpr
      ctx.globalAlpha = alpha * 0.6
      ctx.drawImage(glow, x - g, y - g, g * 2, g * 2)
      ctx.globalAlpha = alpha
      ctx.fillStyle = color(e.heat)
      ctx.beginPath()
      ctx.arc(x, y, e.size * 0.5 * dpr, 0, TAU)
      ctx.fill()
    }
    return true
  }

  resize()
  const observer = new ResizeObserver(resize)
  observer.observe(canvas)
  let frame = 0
  const loop = (now: number) => {
    if (draw(now)) frame = requestAnimationFrame(loop)
    else observer.disconnect()
  }
  frame = requestAnimationFrame(loop)
  return () => {
    cancelAnimationFrame(frame)
    observer.disconnect()
    ctx.clearRect(0, 0, width, height)
  }
}

export { embers, type EmbersOptions }

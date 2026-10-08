"use client"

import * as React from "react"

import { cn } from "../lib/utils"
import { Button } from "./button"
import { playLogoSound, preloadLogoSound, stopLogoSound, type LogoSoundCue } from "./_logo-sound-player"

type IntroCue = Extract<LogoSoundCue, "frameon-intro" | "framex-intro">

/** How long each intro holds the screen before handing over to the film (ms). */
const LENGTH: Record<IntroCue, number> = { "frameon-intro": 2600, "framex-intro": 6600 }

/** Seeded PRNG: the same stage on the server and in the browser, every time. */
function seeded(seed: number) {
  let s = seed
  return () => ((s = (s * 1664525 + 1013904223) % 4294967296) / 4294967296)
}

type Particle = React.CSSProperties & Record<`--${string}`, string | number>

/** Gold dust drawn in from all around the frame, all arriving as the sound holds its breath (3.03 s). */
const CONVERGE: Particle[] = (() => {
  const r = seeded(7)
  return Array.from({ length: 28 }, (_, i) => {
    const angle = i * 2.39996 + r() * 0.4
    const radius = 28 + r() * 34
    const delay = (i % 7) * 0.17 + r() * 0.15
    const size = 0.35 + r() * 0.5
    return {
      width: `${size}cqmin`,
      height: `${size}cqmin`,
      "--dx": `${(Math.cos(angle) * radius).toFixed(1)}cqmin`,
      "--dy": `${(Math.sin(angle) * radius * 0.7).toFixed(1)}cqmin`,
      "--glow": (0.5 + r() * 0.5).toFixed(2),
      "--logo-delay": `${delay.toFixed(2)}s`,
      "--logo-duration": `${(3.03 - delay).toFixed(2)}s`,
    }
  })
})()

/** After the hit: dust lifting off the metal and drifting up. */
const DUST: Particle[] = (() => {
  const r = seeded(11)
  return Array.from({ length: 20 }, () => {
    const size = 0.35 + r() * 0.55
    return {
      width: `${size}cqmin`,
      height: `${size}cqmin`,
      "--dx": `${((r() - 0.5) * 20).toFixed(1)}cqmin`,
      "--dy": `${((r() - 0.5) * 9).toFixed(1)}cqmin`,
      "--drift": `${((r() - 0.5) * 12).toFixed(1)}cqmin`,
      "--glow": (0.4 + r() * 0.5).toFixed(2),
      "--logo-delay": `${(3.2 + r() * 1.6).toFixed(2)}s`,
      "--logo-duration": `${(2.6 + r() * 1.6).toFixed(2)}s`,
    }
  })
})()

const GOLD = "var(--framex-gold-1, #efc766)"
const SPARK = `radial-gradient(circle, #fff 0, ${GOLD} 45%, transparent 70%)`
/** A soft halo, so each speck glitters rather than dots. */
const HALO = `0 0 0.9cqmin 0.15cqmin color-mix(in srgb, ${GOLD} 70%, transparent)`

/**
 * The FrameX stage around the logo, on the logo's own clock — the hit at
 * 3.13 s. Centred on the mark through --fx-x / --fx-y, which `LogoIntro`
 * measures.
 */
function FrameXStage({ hidden }: { hidden: boolean }) {
  const at = { left: "var(--fx-x)", top: "var(--fx-y)" }
  const streak = (height: string, blur: string, opacity: number): React.CSSProperties => ({
    top: "var(--fx-y)",
    height,
    opacity,
    filter: blur === "0" ? undefined : `blur(${blur})`,
    transformOrigin: "var(--fx-x) 50%",
    background: `linear-gradient(90deg, transparent 0, color-mix(in srgb, ${GOLD} 55%, transparent) calc(var(--fx-x) - 32%), #fff var(--fx-x), color-mix(in srgb, ${GOLD} 55%, transparent) calc(var(--fx-x) + 32%), transparent 100%)`,
  })
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0", hidden && "invisible")}>
      {/* Rays behind the mark, opening on the hit and turning slowly. */}
      <span
        className="absolute size-[170cqmax] -translate-x-1/2 -translate-y-1/2 animate-framex-rays mix-blend-screen"
        style={{
          ...at,
          background: `repeating-conic-gradient(from 0deg, transparent 0deg 6deg, color-mix(in srgb, var(--framex-gold-2, #f8e2a2) 24%, transparent) 8.5deg, transparent 11deg 15deg)`,
          // Soft light, not a sunburst: blurred, and gone well before the edges.
          filter: "blur(0.5cqmin)",
          maskImage: "radial-gradient(circle, #000 0, rgb(0 0 0 / 0.45) 12%, transparent 32%)",
          WebkitMaskImage: "radial-gradient(circle, #000 0, rgb(0 0 0 / 0.45) 12%, transparent 32%)",
        }}
      />
      {/* Anamorphic streak: a soft wide glow and a sharp line. */}
      <span className="absolute inset-x-0 -translate-y-1/2 animate-framex-streak mix-blend-screen" style={streak("3cqmin", "1.5cqmin", 0.55)} />
      <span className="absolute inset-x-0 -translate-y-1/2 animate-framex-streak mix-blend-screen" style={streak("0.3cqmin", "0", 1)} />
      {CONVERGE.map((style, i) => (
        <span key={`c${i}`} className="absolute -translate-1/2 animate-framex-converge rounded-full mix-blend-screen" style={{ ...at, background: SPARK, boxShadow: HALO, ...style }} />
      ))}
      {DUST.map((style, i) => (
        <span key={`d${i}`} className="absolute -translate-1/2 animate-framex-dust rounded-full mix-blend-screen" style={{ ...at, background: SPARK, boxShadow: HALO, ...style }} />
      ))}
      {/* The whole frame lights up for an instant on the hit. */}
      <span
        className="absolute inset-0 animate-framex-flash opacity-0 mix-blend-screen"
        style={{
          background: `radial-gradient(circle at var(--fx-x) var(--fx-y), rgb(255 248 225 / 0.9), color-mix(in srgb, ${GOLD} 35%, transparent) 30%, transparent 70%)`,
        }}
      />
    </div>
  )
}
/** Fade of the stage into the film (ms) — the sound's last chord fades with it. */
const FADE = 600

type LogoIntroProps = {
  /** `"frameon-intro"` or, for FrameX members, `"framex-intro"` — match the logo inside. */
  cue: IntroCue
  /**
   * The intro is over (or skipped): start the film. Called as the stage
   * starts fading, so picture and sound cross into the film; the stage then
   * stays transparent and inert, unmount it whenever convenient.
   */
  onDone: () => void
  /**
   * Called inside the click on the start button, when the browser needed
   * one. Unlock the film's `<video>` there — `video.play()` then `pause()` —
   * so iOS lets it start with sound once the intro ends.
   */
  onStart?: (() => void) | undefined
  /** Label of the start button, shown when the browser blocks sound until a click. */
  startLabel?: React.ReactNode
  /** Label of the skip button, shown one second into the intro. */
  skipLabel?: React.ReactNode
  /** 0–1. Default 0.9. */
  volume?: number | undefined
  /** The logo, with `entrance="intro"`. */
  children: React.ReactNode
  className?: string | undefined
}

type Phase = "waiting" | "blocked" | "playing" | "leaving"

/** Lets Web Audio play through the iPhone's silent switch, like the film's own sound. */
function playbackSession() {
  const session = (navigator as { audioSession?: { type: string } }).audioSession
  if (session && session.type === "auto") session.type = "playback"
}

/**
 * The logo before the film, on the watch page: the intro plays with its
 * sound, then fades into the film. When the browser blocks sound until a
 * click — the visitor opened the page directly instead of pressing "watch" —
 * the stage waits behind a start button, as the film itself would have to.
 * Skippable. Visitors who ask for reduced motion go straight to the film.
 *
 * Covers its positioned parent (`absolute inset-0`): put it over the player.
 */
function LogoIntro({
  cue,
  onDone,
  onStart,
  startLabel = "Xem phim",
  skipLabel = "Bỏ qua",
  volume,
  children,
  className,
}: LogoIntroProps) {
  const root = React.useRef<HTMLDivElement>(null)
  const stage = React.useRef<HTMLDivElement>(null)
  const framex = cue === "framex-intro"
  const [phase, setPhase] = React.useState<Phase>("waiting")
  const [skippable, setSkippable] = React.useState(false)
  const timers = React.useRef<ReturnType<typeof setTimeout>[]>([])
  const sounding = React.useRef(false)
  const done = React.useRef(onDone)
  React.useLayoutEffect(() => {
    done.current = onDone
  })

  // The logo and the stage around it run on one clock.
  const animations = () => root.current?.getAnimations({ subtree: true }) ?? []

  // Centre the stage on the mark: where it sits in the frame, without the camera push's scale.
  React.useLayoutEffect(() => {
    const el = root.current
    const logo = stage.current
    if (!framex || !el || !logo) return
    const measure = () => {
      const mark = logo.querySelector('[data-slot="logo-mark"]') ?? logo
      const box = el.getBoundingClientRect()
      const wrap = logo.getBoundingClientRect()
      const m = mark.getBoundingClientRect()
      const scale = Number.parseFloat(getComputedStyle(logo).scale) || 1
      const cx = wrap.left + wrap.width / 2
      const cy = wrap.top + wrap.height / 2
      el.style.setProperty("--fx-x", `${cx - box.left + (m.left + m.width / 2 - cx) / scale}px`)
      el.style.setProperty("--fx-y", `${cy - box.top + (m.top + m.height / 2 - cy) / scale}px`)
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(el)
    return () => observer.disconnect()
  }, [framex])
  const later = (ms: number, fn: () => void) => timers.current.push(setTimeout(fn, Math.max(0, ms)))

  const finish = (fade: number) => {
    timers.current.forEach(clearTimeout)
    setPhase("leaving")
    if (sounding.current) stopLogoSound(fade)
    sounding.current = false
    done.current()
  }

  /** Starts picture and sound together; `fromClick` when the start button was pressed. */
  const start = async (fromClick: boolean) => {
    if (fromClick) onStart?.()
    const heardAt = await playLogoSound(cue, { volume })
    if (heardAt === null && !fromClick) {
      setPhase("blocked")
      return
    }
    // Even a click may not bring sound (no Web Audio): the intro then plays silent.
    const at = heardAt ?? performance.now()
    sounding.current = heardAt !== null
    for (const animation of animations()) animation.startTime = at
    setPhase("playing")
    later(at - performance.now() + 1000, () => setSkippable(true))
    later(at - performance.now() + LENGTH[cue], () => finish(FADE / 1000 + 0.6))
  }

  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      finish(0)
      return
    }
    playbackSession()
    void preloadLogoSound(cue)
    // Hold the logo on its first frame until we know whether sound may play.
    for (const animation of animations()) {
      animation.pause()
      animation.currentTime = 0
    }
    // Deferred, so Strict Mode's mount–unmount–mount starts it only once.
    const first = setTimeout(() => void start(false), 0)
    return () => {
      clearTimeout(first)
      timers.current.forEach(clearTimeout)
      if (sounding.current) stopLogoSound(0.3)
      sounding.current = false
    }
    // Mount only: the intro plays once per mount.
  }, [])

  return (
    <div
      ref={root}
      data-slot="logo-intro"
      data-phase={phase}
      className={cn(
        "absolute inset-0 z-10 grid place-items-center overflow-hidden bg-black transition-opacity ease-out [container-type:size]",
        phase === "leaving" && "pointer-events-none opacity-0",
        className
      )}
      style={{ transitionDuration: `${FADE}ms`, "--fx-x": "50%", "--fx-y": "50%" } as React.CSSProperties}
    >
      {/* Always rendered — hidden while waiting — so it restarts on the same clock as the logo. */}
      {framex ? <FrameXStage hidden={phase === "blocked"} /> : null}
      <div ref={stage} className={cn("relative", framex && "animate-framex-push", phase === "blocked" && "invisible")}>
        {children}
      </div>
      {/* Vignette: the edges of the frame fall into the dark. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse at center, transparent 55%, rgb(0 0 0 / 0.65))" }}
      />
      {phase === "blocked" ? (
        <Button
          variant={cue === "framex-intro" ? "golden" : "default"}
          size="lg"
          className="absolute rounded-full px-6"
          onClick={() => void start(true)}
        >
          <svg viewBox="12 8 12 16" aria-hidden className="size-4 fill-current">
            <path d="M12.8 10.1a1.1 1.1 0 0 1 1.66-.95l8.2 5.05a1.1 1.1 0 0 1 0 1.87l-8.2 5.05a1.1 1.1 0 0 1-1.66-.94z" />
          </svg>
          {startLabel}
        </Button>
      ) : null}
      {phase === "playing" && skippable ? (
        <Button
          variant="secondary"
          size="sm"
          className="absolute right-4 bottom-4 animate-pop"
          onClick={() => finish(0.4)}
        >
          {skipLabel}
        </Button>
      ) : null}
    </div>
  )
}

export { LogoIntro, type LogoIntroProps }

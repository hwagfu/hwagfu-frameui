"use client"

import * as React from "react"

import { cn } from "../lib/utils"
import { Button } from "./button"
import { playLogoSound, preloadLogoSound, stopLogoSound, type LogoSoundCue } from "./_logo-sound-player"

type IntroCue = Extract<LogoSoundCue, "frameon-intro" | "framex-intro">

/** How long each intro holds the screen before handing over to the film (ms). */
const LENGTH: Record<IntroCue, number> = { "frameon-intro": 2600, "framex-intro": 5200 }
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
  const stage = React.useRef<HTMLDivElement>(null)
  const [phase, setPhase] = React.useState<Phase>("waiting")
  const [skippable, setSkippable] = React.useState(false)
  const timers = React.useRef<ReturnType<typeof setTimeout>[]>([])
  const sounding = React.useRef(false)
  const done = React.useRef(onDone)
  React.useLayoutEffect(() => {
    done.current = onDone
  })

  const animations = () => stage.current?.getAnimations({ subtree: true }) ?? []
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
      data-slot="logo-intro"
      data-phase={phase}
      className={cn(
        "absolute inset-0 z-10 grid place-items-center overflow-hidden bg-black transition-opacity ease-out",
        phase === "leaving" && "pointer-events-none opacity-0",
        className
      )}
      style={{ transitionDuration: `${FADE}ms` }}
    >
      <div ref={stage} className={cn(phase === "blocked" && "invisible")}>
        {children}
      </div>
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

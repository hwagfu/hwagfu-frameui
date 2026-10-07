"use client"

import * as React from "react"

import { cn } from "../lib/utils"
import { playLogoSound, preloadLogoSound, type LogoSoundCue } from "./_logo-sound-player"

type LogoSoundProps = {
  /** Which sound — pick the one made for the logo's props (see `LogoSoundCue`). */
  cue: LogoSoundCue
  /**
   * When it plays.
   * - `"click"`: a click on the logo replays its animation, with the sound.
   * - `"mount"`: as the logo appears — when the browser allows sound by
   *   then: after a click or key press on the page (a client-side navigation
   *   keeps it), or for a site the visitor allowed sound on, an installed web
   *   app, a kiosk. Otherwise the logo plays silent. Made for a screen
   *   reached through a button, like "upgrade done".
   * - `"hover"`: when the pointer enters, at most every 1.8 s — for
   *   `shine="hover"` / `flare="hover"`.
   */
  trigger?: "click" | "mount" | "hover"
  /** 0–1. Default 0.9. */
  volume?: number | undefined
  /** The logo, usually a Server Component. */
  children: React.ReactNode
  className?: string | undefined
}

/**
 * Gives a logo its sound. The only client part of the logo: it wraps the
 * server-rendered logo without a box of its own (`display: contents`),
 * fetches the cue's MP3 while the browser is idle and, when it plays,
 * restarts the logo's CSS animations on the very frame the sound reaches the
 * speakers — output latency included — so picture and sound stay together.
 */
function LogoSound({ cue, trigger = "click", volume, children, className }: LogoSoundProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const lastHover = React.useRef(-Infinity)
  const mounted = React.useRef(false)

  const play = React.useCallback(
    async (restart: boolean) => {
      const heardAt = await playLogoSound(cue, { volume })
      const el = ref.current
      if (!restart || !el || heardAt === null) return
      // Same clock: the document timeline counts from performance.timeOrigin.
      for (const animation of el.getAnimations({ subtree: true })) animation.startTime = heardAt
    },
    [cue, volume]
  )

  // Fetch the MP3 early, when nothing else is going on, so the first play is not late.
  React.useEffect(() => {
    const preload = () => void preloadLogoSound(cue)
    if (typeof window.requestIdleCallback !== "function") {
      const timer = setTimeout(preload, 1000)
      return () => clearTimeout(timer)
    }
    const idle = window.requestIdleCallback(preload, { timeout: 3000 })
    return () => window.cancelIdleCallback(idle)
  }, [cue])

  React.useEffect(() => {
    // Once per mount, even when Strict Mode runs effects twice.
    if (trigger !== "mount" || mounted.current) return
    mounted.current = true
    void play(true)
  }, [trigger, play])

  return (
    <div
      ref={ref}
      data-slot="logo-sound"
      className={cn("contents", trigger === "click" && "cursor-pointer", className)}
      onClick={trigger === "click" ? () => void play(true) : undefined}
      onPointerEnter={
        trigger === "hover"
          ? () => {
              const now = performance.now()
              if (now - lastHover.current < 1800) return
              lastHover.current = now
              void play(false)
            }
          : undefined
      }
    >
      {children}
    </div>
  )
}

export { LogoSound, type LogoSoundProps }

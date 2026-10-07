"use client"

import * as React from "react"

import { Button } from "@hwagfu/frameui/button"
import { Wordmark } from "@hwagfu/frameui/logo"
import { LogoIntro } from "@hwagfu/frameui/logo-sound"
import { PosterArt } from "@hwagfu/frameui/poster-art"

export default function LogoIntroDemo() {
  const [tier, setTier] = React.useState<"frameon" | "framex">("framex")
  const [run, setRun] = React.useState(0)
  const [playing, setPlaying] = React.useState(false)

  const replay = (next: "frameon" | "framex") => {
    setPlaying(false)
    setTier(next)
    setRun((n) => n + 1)
  }

  return (
    <div className="flex w-full max-w-2xl flex-col gap-3">
      <div className="relative aspect-video overflow-hidden rounded-lg bg-black">
        {/* The film. In the app: the <video>, started from onDone. */}
        <PosterArt ratio="wide" lines={["sin", "tel"]} background="oklch(0.30 0.05 215)" color="oklch(0.89 0.06 200)" textSize={34} />
        {playing ? (
          <span className="absolute bottom-3 left-3 rounded-sm bg-black/60 px-2 py-1 text-caption text-heading">Đang phát phim</span>
        ) : null}
        <LogoIntro key={`${tier}-${run}`} cue={tier === "framex" ? "framex-intro" : "frameon-intro"} onDone={() => setPlaying(true)}>
          {tier === "framex" ? (
            <Wordmark variant="framex" size={56} entrance="intro" shine flare glow />
          ) : (
            <Wordmark size={36} entrance="intro" />
          )}
        </LogoIntro>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button size="sm" variant="secondary" onClick={() => replay("frameon")}>
          Xem với tài khoản thường
        </Button>
        <Button size="sm" variant="golden" onClick={() => replay("framex")}>
          Xem với FrameX
        </Button>
      </div>
    </div>
  )
}

import type * as React from "react"

import { cn } from "../lib/utils"

type PosterArtProps = React.ComponentProps<"div"> & {
  /** Lines of the typographic poster, one per row. */
  lines: string[]
  /** Poster background (FrameON's `c1`). */
  background: string
  /** Ink colour of the type (FrameON's `c2`). */
  color: string
  /** `modern`: heavy lowercase, tight. `classic`: uppercase, spaced, with an inner frame. */
  variant?: "modern" | "classic"
  /** Type size in `cqw` — a share of the poster's width, so it scales with any grid cell. */
  textSize?: number
  /** `poster` = 2:3, `wide` = 16:9 (type left-aligned and at half size). */
  ratio?: "poster" | "wide"
  /** Studio credit at the foot of a `poster`. */
  studio?: string
  /** Large frame (hero): smaller, lower studio credit. */
  big?: boolean
  dim?: boolean
}

/**
 * FrameON's poster backdrop. Without artwork it builds a poster out of type in
 * the film's own colours; pass the real image as `children` (`<img>`,
 * `<Image fill>`…) and it covers the type — which stays underneath, so a
 * broken or blocked image still leaves a decent poster.
 *
 * Fills its positioned parent (`absolute inset-0`): put it inside a
 * `PosterCardMedia`, an `AspectRatio` or any `relative` box. Every size is in
 * `cqw`, so it scales without measuring anything in JavaScript.
 */
function PosterArt({
  lines,
  background,
  color,
  variant = "modern",
  textSize = 20,
  ratio = "poster",
  studio,
  big = false,
  dim = false,
  className,
  style,
  children,
  ...props
}: PosterArtProps) {
  const wide = ratio === "wide"
  const classic = variant === "classic"

  return (
    <div
      data-slot="poster-art"
      data-variant={variant}
      className={cn(
        "@container absolute inset-0 flex items-center overflow-hidden font-sans",
        wide ? "justify-start" : "justify-center",
        dim && "opacity-80",
        "[&>img]:absolute [&>img]:inset-0 [&>img]:size-full [&>img]:object-cover",
        className
      )}
      style={{ background, color, ...style }}
      {...props}
    >
      {/* Slanted band for rhythm. */}
      <div className="pointer-events-none absolute top-1/2 -right-1/4 -left-1/4 h-[30%] rotate-[-9deg] bg-current opacity-10" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(115%_75%_at_28%_10%,rgb(255_255_255/0.2),transparent_62%)]" />

      <div
        aria-hidden
        className={cn(
          wide ? "px-[6cqw] text-left" : "text-center",
          classic
            ? cn("font-bold tracking-[0.06em] uppercase", wide ? "leading-[0.98]" : "px-[10cqw] leading-[1.06]")
            : cn("font-extrabold tracking-[-0.04em] lowercase", wide ? "leading-[0.98]" : "px-[8cqw] leading-[0.92]")
        )}
        style={{ fontSize: `${wide ? textSize * 0.5 : textSize}cqw` }}
      >
        {lines.map((line, i) => (
          <div key={i}>{line}</div>
        ))}
      </div>

      {children}

      {classic ? (
        <div
          className={cn(
            "pointer-events-none absolute border border-current opacity-40",
            wide ? "inset-[3cqw]" : "inset-[5cqw]"
          )}
        />
      ) : null}

      {/* Darker foot so text laid over the poster stays readable. */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_34%,rgb(0_0_0/0.58)),linear-gradient(90deg,rgb(0_0_0/0.28),transparent_48%)]" />

      {studio && !wide ? (
        <div
          className={cn(
            "pointer-events-none absolute inset-x-0 overflow-hidden text-center tracking-[0.12em] whitespace-nowrap uppercase opacity-55",
            big ? "bottom-[5cqw] text-[2.6cqw]" : "bottom-[17cqw] text-[3.6cqw]"
          )}
        >
          {studio}
        </div>
      ) : null}
    </div>
  )
}

export { PosterArt, type PosterArtProps }

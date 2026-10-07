import type * as React from "react"

import { renderElement, type useRender } from "../lib/render"
import { cn } from "../lib/utils"

/**
 * FrameON's film card: artwork with badges on top and chips at the foot, then
 * the title and a caption. A Server Component — the whole card is in the first
 * HTML. Make it a link with `render={<Link href="/film/…" />}`.
 */
function PosterCard({ className, render, ...props }: useRender.ComponentProps<"div">) {
  return renderElement(
    "div",
    render,
    {
      ...props,
      className: cn(
        "group/poster-card flex w-full min-w-0 flex-col gap-2 font-sans no-underline outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        className
      ),
    },
    { slot: "poster-card" }
  )
}

type PosterCardMediaProps = React.ComponentProps<"div"> & {
  /** `poster` = 2:3 (rails, grids), `wide` = 16:9 (the "recently updated" strip). */
  ratio?: "poster" | "wide"
  /** Top 10 look: the poster turned 14° in 3D, shaded on the far side. */
  tilt?: "left" | "right"
}

/**
 * The artwork frame. Holds a `PosterArt`, or an `<img>` that is stretched to
 * cover it, plus the overlay parts.
 */
function PosterCardMedia({ ratio = "poster", tilt, className, style, ...props }: PosterCardMediaProps) {
  return (
    <div
      data-slot="poster-card-media"
      data-ratio={ratio}
      data-tilt={tilt}
      className={cn(
        "group/poster-card-media relative w-full overflow-hidden rounded-md border border-border bg-card",
        ratio === "wide" ? "aspect-video" : "aspect-2/3",
        "[&>img]:absolute [&>img]:inset-0 [&>img]:size-full [&>img]:object-cover",
        tilt &&
          "shadow-elevated will-change-transform after:pointer-events-none after:absolute after:inset-0 after:from-black/40 after:to-transparent after:to-54%",
        tilt === "left" && "after:bg-linear-to-r",
        tilt === "right" && "after:bg-linear-to-l",
        className
      )}
      style={
        tilt
          ? { transform: `perspective(1500px) rotateY(${tilt === "right" ? 14 : -14}deg)`, ...style }
          : style
      }
      {...props}
    />
  )
}

/** Overlay row along the top edge: badges on the left, a score pushed right with `ml-auto`. */
function PosterCardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="poster-card-header"
      className={cn("absolute inset-x-1.5 top-1.5 z-10 flex items-start gap-1", className)}
      {...props}
    />
  )
}

/**
 * Overlay along the bottom edge, on a dark fade. Chips sit right-aligned; on a
 * `wide` card it stacks the title above them instead.
 */
function PosterCardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="poster-card-footer"
      className={cn(
        "absolute inset-x-0 bottom-0 z-10 flex flex-wrap items-end justify-end gap-1 bg-linear-to-t from-black/70 to-transparent px-1.5 pt-6 pb-1.5",
        "group-data-[ratio=wide]/poster-card-media:flex-col group-data-[ratio=wide]/poster-card-media:items-stretch group-data-[ratio=wide]/poster-card-media:gap-[5px] group-data-[ratio=wide]/poster-card-media:from-black/80 group-data-[ratio=wide]/poster-card-media:px-2.5 group-data-[ratio=wide]/poster-card-media:pt-8 group-data-[ratio=wide]/poster-card-media:pb-2.5",
        className
      )}
      {...props}
    />
  )
}

/** Watch progress along the very bottom edge, `value` from 0 to 100. */
function PosterCardProgress({
  value,
  className,
  ...props
}: Omit<React.ComponentProps<"div">, "children"> & { value: number }) {
  const percent = Math.min(100, Math.max(0, Math.round(value)))
  return (
    <div
      data-slot="poster-card-progress"
      role="progressbar"
      aria-valuenow={percent}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Đã xem"
      className={cn("absolute inset-x-0 bottom-0 z-10 h-[3px] bg-white/20", className)}
      {...props}
    >
      <div className="h-full bg-brand transition-[width] duration-300" style={{ width: `${percent}%` }} />
    </div>
  )
}

/** Film name — turns gold when the card is hovered. */
function PosterCardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="poster-card-title"
      className={cn(
        "truncate text-subtitle font-medium text-foreground transition-colors duration-150 group-hover/poster-card:text-brand",
        "group-data-[ratio=wide]/poster-card-media:font-bold group-data-[ratio=wide]/poster-card-media:text-heading",
        className
      )}
      {...props}
    />
  )
}

/** Second line: year · genres, episode state… */
function PosterCardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="poster-card-description"
      className={cn("truncate text-caption text-tertiary", className)}
      {...props}
    />
  )
}

export {
  PosterCard,
  PosterCardDescription,
  PosterCardFooter,
  PosterCardHeader,
  PosterCardMedia,
  PosterCardProgress,
  PosterCardTitle,
  type PosterCardMediaProps,
}

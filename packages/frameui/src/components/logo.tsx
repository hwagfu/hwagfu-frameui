import type * as React from "react"

import { renderElement, type useRender } from "../lib/render"
import { cn } from "../lib/utils"

/*
 * Geometry of the FrameON mark. These three strokes are the whole logo, and
 * every variant below (static mark, loading mark, 404 mark) is built from
 * them — changing the logo means changing exactly one place.
 *
 * A favicon should not reuse them as is: at 16px it needs a tighter viewBox
 * and a thicker stroke to stay legible.
 */

/** Top-left frame corner. */
const FRAME_TL = "M11.5 2.9H7A4.1 4.1 0 0 0 2.9 7v4.5"
/** Bottom-right frame corner — the top-left one mirrored through the centre (16, 16). */
const FRAME_BR = "M20.5 29.1H25a4.1 4.1 0 0 0 4.1-4.1v-4.5"
/** Play button in the middle of the frame. */
const PLAY =
  "M12.8 10.1a1.1 1.1 0 0 1 1.66-.95l8.2 5.05a1.1 1.1 0 0 1 0 1.87l-8.2 5.05a1.1 1.1 0 0 1-1.66-.94z"

const frameStroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const

/** With a label the mark is a meaningful image; without one (`""`) it is decoration. */
const a11y = (label?: string) =>
  label ? ({ role: "img", "aria-label": label } as const) : ({ "aria-hidden": true } as const)

type MarkProps = Omit<React.ComponentProps<"svg">, "children"> & {
  /** Width and height in px. */
  size?: number
  /** Accessible name. Pass `""` when text next to the mark already names it. */
  label?: string
}

/** The FrameON mark: two film-frame corners and a gold play button. */
function LogoMark({ size = 30, label = "FrameON", className, ...props }: MarkProps) {
  return (
    <svg
      data-slot="logo-mark"
      width={size}
      height={size}
      viewBox="0 0 32 32"
      className={cn("block shrink-0 text-heading", className)}
      {...a11y(label)}
      {...props}
    >
      <g {...frameStroke}>
        <path d={FRAME_TL} />
        <path d={FRAME_BR} />
      </g>
      <path d={PLAY} className="fill-brand" />
    </svg>
  )
}

/**
 * Loading mark. Still the FrameON logo: the frame turns around its centre and
 * the play button breathes in step. The corners are symmetric through the
 * centre, so each half turn lands on the same picture and the loop has no seam.
 *
 * Same size and footprint as a `LogoMark` of the same `size`, so one can stand
 * in for the other without the layout moving. Turning, the frame sweeps a
 * circle: the outer edge of a rounded corner is |(9, 9)| + 4.1 + 1.3 (half the
 * stroke) ≈ 18.1 units from the centre, past the 16-unit half of the box. The
 * SVG therefore draws outside its box (`overflow-visible`) — by up to 6.7% of
 * `size` per side at 45° and 135° — instead of clipping the corners. The frame
 * turns about its own fill-box, whose centre is (16, 16) as the corners mirror
 * each other.
 *
 * Pure SVG + CSS, no JavaScript, so a `loading.tsx` Server Component shows it in
 * the very first HTML. Both motions stop when the OS asks for reduced motion.
 */
function LogoSpinner({ size = 48, label, className, ...props }: MarkProps) {
  return (
    <svg
      data-slot="logo-spinner"
      width={size}
      height={size}
      viewBox="0 0 32 32"
      className={cn("block shrink-0 overflow-visible text-heading", className)}
      {...a11y(label)}
      {...props}
    >
      <g {...frameStroke} className="origin-center animate-brand-spin [transform-box:fill-box] motion-reduce:animate-none">
        <path d={FRAME_TL} />
        <path d={FRAME_BR} />
      </g>
      <path
        d={PLAY}
        className="origin-center animate-brand-pulse fill-brand [transform-box:fill-box] motion-reduce:animate-none"
      />
    </svg>
  )
}

/**
 * 404 mark. The frame is still there but its corners blink out of step, like a
 * signal being searched for, while the play button has slipped out of place and
 * wobbles — the same logo telling "not found" without any extra sign.
 */
function LogoLost({ size = 96, label, className, ...props }: MarkProps) {
  return (
    <svg
      data-slot="logo-lost"
      width={size}
      height={size}
      viewBox="0 0 32 32"
      className={cn("block shrink-0 text-heading", className)}
      {...a11y(label)}
      {...props}
    >
      <g {...frameStroke}>
        <path d={FRAME_TL} className="animate-brand-blink motion-reduce:animate-none" />
        {/* Half a beat behind, so the two corners take turns. */}
        <path d={FRAME_BR} className="animate-brand-blink [animation-delay:-1.1s] motion-reduce:animate-none" />
      </g>
      <path
        d={PLAY}
        className="origin-center animate-brand-tumble fill-brand opacity-80 [transform-box:fill-box] motion-reduce:animate-none"
      />
    </svg>
  )
}

type WordmarkProps = useRender.ComponentProps<"div"> & {
  /** Font size of the name in px; the mark and the gap scale with it. */
  size?: number
  /** Show the mark before the name. */
  mark?: boolean
}

/**
 * Mark + "FrameON". Pass `render={<Link href="/" />}` to make it a link, and
 * children to change the name (the docs use it for "FrameUI").
 */
function Wordmark({ size = 24, mark = true, render, className, style, children, ...props }: WordmarkProps) {
  return renderElement(
    "div",
    render,
    {
      ...props,
      className: cn("flex items-center no-underline select-none", className),
      style: { gap: Math.round(size * 0.34), ...style },
      children: (
        <>
          {mark ? <LogoMark size={Math.round(size * 1.24)} label="" /> : null}
          <span
            className="leading-none font-extrabold tracking-[-0.5px] text-heading"
            style={{ fontSize: size }}
          >
            {children ?? (
              <>
                Frame<span className="text-brand">ON</span>
              </>
            )}
          </span>
        </>
      ),
    },
    { slot: "wordmark" }
  )
}

export { LogoLost, LogoMark, LogoSpinner, Wordmark, type WordmarkProps }

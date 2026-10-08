import * as React from "react"

import { renderElement, type useRender } from "../lib/render"
import { cn } from "../lib/utils"

/*
 * Geometry of the FrameON mark. These three strokes are the whole logo, and
 * every variant below (static mark, loading mark, 404 mark, FrameX) is built
 * from them — changing the logo means changing exactly one place.
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

/* ------------------------------------------------------------------ *
 * FrameX — the premium tier. The same strokes cast in gold, a wide
 * uppercase name, and optional light and motion.
 * ------------------------------------------------------------------ */

/**
 * Gold foil, lit from the top left with a bright band across the middle.
 * The SVG gradient is per shape (objectBoundingBox), so each corner and the
 * play button catch the light the same way; the CSS one is for the X.
 */
const GOLD: ReadonlyArray<readonly [number, string]> = [
  [0, "#fff4d0"],
  [0.3, "#efc766"],
  [0.52, "#f8e2a2"],
  [0.76, "#cf9734"],
  [1, "#94661d"],
]
const GOLD_CSS = "linear-gradient(165deg, #fff4d0, #efc766 30%, #f8e2a2 52%, #cf9734 76%, #94661d)"
/** Warm ivory for "FRAME": white would leave the passing light nothing to brighten. */
const IVORY = "#e6e0d4"
/** The band of light on the name: a bright core with soft shoulders, 4em wide. */
const BAND_CSS =
  "linear-gradient(110deg, transparent 22%, rgb(255 253 245 / 0.72) 42%, #fffdf5 50%, rgb(255 253 245 / 0.72) 58%, transparent 78%)"
/**
 * The intro's splash of light, as polished metal shows it: a white-hot
 * highlight, a dark reflection right behind it, a second softer highlight.
 * Stops are [offset, colour, opacity], shared by the mark (SVG) and the name (CSS).
 */
const GLOSS: ReadonlyArray<readonly [number, string, number]> = [
  [0, "#fffaf0", 0],
  [0.24, "#fffaf0", 0.22],
  [0.38, "#fffefa", 1],
  [0.46, "#fff3d6", 0.85],
  [0.52, "#5c3f15", 0.6],
  [0.59, "#ffefc8", 0.75],
  [0.72, "#fffaf0", 0.16],
  [1, "#fffaf0", 0],
]
const GLOSS_CSS = `linear-gradient(105deg, ${GLOSS.map(([at, color, alpha]) => {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(color.slice(i, i + 2), 16))
  return `rgb(${r} ${g} ${b} / ${alpha}) ${at * 100}%`
}).join(", ")})`

/** Motion of the FrameX logo. Everything is CSS on the server-rendered SVG — no JavaScript. */
type FrameXMotion = {
  /**
   * A band of light crosses the mark, then the name, and rests: every 5.5 s.
   * `"hover"`: once, when the pointer enters.
   */
  shine?: boolean | "hover" | undefined
  /**
   * Glints where the light leaves the metal — the lower corner, then the X.
   * Without `shine` they walk the metal on their own: top corner, lower
   * corner, X, every 4.2 s. `"hover"`: once, when the pointer enters.
   */
  flare?: boolean | "hover" | undefined
  /** Warm light breathing behind the mark (and around the X of the name). */
  glow?: boolean | undefined
  /**
   * Plays once when the logo appears. `"reveal"`: the corners are drawn, the
   * play button lands, the name closes in (1.6 s). `"intro"`: the same after a
   * 1.2 s build of light, with an impact when the play button lands — a flash,
   * two shockwaves, a short shake — then, as the name settles (2.7 s), one
   * glossy splash of light across the metal of the mark and the name.
   * Made to sit on `<LogoSound cue="framex-intro">` (`logo-sound`).
   */
  entrance?: "reveal" | "intro" | undefined
}

/** FrameON's own motion: a short intro. */
type FrameOnMotion = {
  /**
   * `"intro"`: plays once as the logo appears (2.3 s) — the corners are
   * drawn, the play button lands, the name slides in, then "ON" and the play
   * button light up. Made to sit on `<LogoSound cue="frameon-intro">` (`logo-sound`).
   */
  entrance?: "intro" | undefined
}

/** FrameON takes only its intro; the light effects are FrameX's. */
type VariantProps =
  | ({ variant?: "frameon" } & FrameOnMotion & { shine?: never; flare?: never; glow?: never })
  | ({ variant: "framex" } & FrameXMotion)

/** A light effect either loops or runs once per hover. */
type Mode = "loop" | "hover"

/** Delay of one moving part, in seconds → its `--logo-delay`. */
const delay = (seconds: number) => ({ "--logo-delay": `${Math.round(seconds * 1000)}ms` }) as React.CSSProperties

/** Props that make a frame corner draw itself in, `seconds` after the start. */
const drawIn = (seconds: number) => ({
  pathLength: 1,
  className: "animate-logo-draw [stroke-dasharray:1_3] motion-reduce:animate-none",
  style: delay(seconds),
})

/**
 * When each moving part starts, worked out once from the effects in use —
 * the keyframes themselves (theme.css) carry no timing.
 */
function timeline({ shine, flare, glow = false, entrance }: FrameXMotion) {
  const pre = entrance === "intro" ? 1.2 : 0
  // Loops start once the entrance has played.
  const start = entrance === "intro" ? 2.7 : entrance === "reveal" ? 1.5 : 0
  const shineMode: Mode | null = shine === "hover" ? "hover" : shine ? "loop" : null
  const flareMode: Mode | null = flare === "hover" ? "hover" : flare ? "loop" : null
  // Glints ride the band when there is one; alone they walk the metal faster.
  const withBand = shineMode === "loop"
  return {
    shine: shineMode,
    flare: flareMode,
    glow,
    entrance: entrance ?? null,
    cycle: flareMode === "loop" && !withBand ? "4.2s" : "5.5s",
    pre,
    /** Delays (s) of the band and the glints, in the mode each one runs. */
    band: shineMode === "hover" ? 0 : start,
    sweepFrame: shineMode === "hover" ? 0.3 : start + 0.42,
    sweepX: shineMode === "hover" ? 0.62 : start + 0.9,
    flareTl: flareMode === "loop" && !withBand ? start : null,
    flareBr: flareMode === "hover" ? 0.5 : withBand ? start + 0.55 : start + 0.5,
    flareX: flareMode === "hover" ? 1.15 : withBand ? start + 1.45 : start + 1.05,
    breathe: start,
    /** The intro's one glossy splash, as the name settles; on the name it follows a little later. */
    splash: entrance === "intro" ? start : null,
  }
}
type Timeline = ReturnType<typeof timeline>

/** Gradients of one FrameX mark; ids are per instance so several marks can share a page. */
function GoldGradient({ id }: { id: string }) {
  return (
    <linearGradient id={`${id}-gold`} x1="0" y1="0" x2="1" y2="1">
      {GOLD.map(([offset, color]) => (
        <stop key={offset} offset={offset} stopColor={color} />
      ))}
    </linearGradient>
  )
}

function GlowGradient({ id }: { id: string }) {
  return (
    <radialGradient id={`${id}-glow`}>
      <stop offset="0" stopColor="#f0c766" stopOpacity="0.5" />
      <stop offset="0.55" stopColor="#f0c766" stopOpacity="0.12" />
      <stop offset="1" stopColor="#f0c766" stopOpacity="0" />
    </radialGradient>
  )
}

/** The splash's band (across, objectBoundingBox), and the glow of its light spilling just past the metal. */
function GlossGradients({ id }: { id: string }) {
  return (
    <>
      <linearGradient id={`${id}-gloss`}>
        {GLOSS.map(([offset, color, alpha]) => (
          <stop key={offset} offset={offset} stopColor={color} stopOpacity={alpha} />
        ))}
      </linearGradient>
      <filter id={`${id}-spill`} filterUnits="userSpaceOnUse" x="-8" y="-8" width="48" height="48">
        <feGaussianBlur stdDeviation="0.7" result="near" />
        <feGaussianBlur stdDeviation="2.4" result="far" />
        <feColorMatrix in="far" values="1 0 0 0 0  0 0.86 0 0 0  0 0 0.6 0 0  0 0 0 1.25 0" result="warm" />
        <feMerge>
          <feMergeNode in="warm" />
          <feMergeNode in="near" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </>
  )
}

/** Core, horizontal and vertical ray gradients of a glint. */
function GlintGradients({ id }: { id: string }) {
  const ray = (
    <>
      <stop offset="0" stopColor="#ffe7a8" stopOpacity="0" />
      <stop offset="0.5" stopColor="#fff" />
      <stop offset="1" stopColor="#ffe7a8" stopOpacity="0" />
    </>
  )
  return (
    <>
      <radialGradient id={`${id}-glint-core`}>
        <stop offset="0" stopColor="#fff" />
        <stop offset="0.22" stopColor="#fff7de" stopOpacity="0.9" />
        <stop offset="0.5" stopColor="#f3cf78" stopOpacity="0.28" />
        <stop offset="1" stopColor="#f0c766" stopOpacity="0" />
      </radialGradient>
      <linearGradient id={`${id}-glint-h`}>{ray}</linearGradient>
      <linearGradient id={`${id}-glint-v`} x2="0" y2="1">
        {ray}
      </linearGradient>
    </>
  )
}

/**
 * A specular glint centred on (x, y): soft core, long horizontal ray, shorter
 * vertical one, faint diagonals, and a thin streak like an anamorphic lens
 * flare. Hidden until its animation shows it.
 */
function Glint({ id, x, y, className, style }: { id: string; x: number; y: number; className: string; style: React.CSSProperties }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g
        className={cn("origin-center opacity-0 mix-blend-screen [transform-box:fill-box] motion-reduce:animate-none", className)}
        style={style}
      >
        <rect x="-24" y="-0.2" width="48" height="0.4" fill={`url(#${id}-glint-h)`} opacity="0.55" />
        <circle r="4.4" fill={`url(#${id}-glint-core)`} />
        <path d="M-12.5 0L0-.6L12.5 0L0 .6Z" fill={`url(#${id}-glint-h)`} />
        <path d="M0-7.8L.5 0L0 7.8L-.5 0Z" fill={`url(#${id}-glint-v)`} />
        <g transform="rotate(45)" opacity="0.55" fill="#fff">
          <path d="M-4.4 0L0-.3L4.4 0L0 .3Z" />
          <path d="M0-4.4L.3 0L0 4.4L-.3 0Z" />
        </g>
        <circle r="1.05" fill="#fff" />
      </g>
    </g>
  )
}

/** Animation class of a glint for its mode; `big` for the X, the finale. */
const glintClass = (mode: Mode, big = false) =>
  mode === "hover"
    ? "motion-safe:group-hover/framex:animate-framex-flare-once"
    : big
      ? "animate-framex-flare-big"
      : "animate-framex-flare"

/** Draws the FrameX mark. `shake` is off inside a Wordmark, which shakes as a whole. */
function FrameXMark({
  size,
  label,
  motion,
  shake,
  className,
  style,
  ...props
}: Omit<MarkProps, "size"> & { size: number; motion: Timeline; shake: boolean }) {
  const id = React.useId()
  const { shine, flare, glow, entrance, pre } = motion
  const intro = entrance === "intro"
  const splash = motion.splash !== null
  const gold = `url(#${id}-gold)`
  const moving = Boolean(shine || flare || glow || entrance)
  const hover = shine === "hover" || flare === "hover"
  return (
    <svg
      data-slot="logo-mark"
      data-variant="framex"
      width={size}
      height={size}
      viewBox="0 0 32 32"
      className={cn(
        "block shrink-0",
        // Glow, glints and shockwaves reach past the box.
        moving && "overflow-visible",
        hover && "group/framex",
        intro && shake && "animate-framex-shake motion-reduce:animate-none",
        className
      )}
      style={{ ...(intro && shake ? delay(pre + 0.73) : {}), ...style }}
      {...a11y(label)}
      {...props}
    >
      <defs>
        <GoldGradient id={id} />
        {glow || intro ? <GlowGradient id={id} /> : null}
        {flare ? <GlintGradients id={id} /> : null}
        {shine ? (
          <linearGradient id={`${id}-band`}>
            <stop offset="0" stopColor="#fff" stopOpacity="0" />
            <stop offset="0.38" stopColor="#fffaf0" stopOpacity="0.55" />
            <stop offset="0.5" stopColor="#fff" />
            <stop offset="0.62" stopColor="#fffaf0" stopOpacity="0.55" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
        ) : null}
        {splash ? <GlossGradients id={id} /> : null}
        {shine || splash ? (
          // The light only shows on the metal: the strokes, in white, are its mask.
          <mask id={`${id}-metal`} maskUnits="userSpaceOnUse" x="-4" y="-4" width="40" height="40">
            <g {...frameStroke} stroke="#fff">
              <path d={FRAME_TL} />
              <path d={FRAME_BR} />
            </g>
            <path d={PLAY} fill="#fff" />
          </mask>
        ) : null}
      </defs>

      {glow || intro ? (
        <circle
          cx="16"
          cy="16"
          r="21"
          fill={`url(#${id}-glow)`}
          className={cn(
            "origin-center opacity-0 [transform-box:fill-box] motion-reduce:animate-none motion-reduce:opacity-50",
            intro ? (glow ? "animate-framex-gather-breathe" : "animate-framex-gather") : "animate-framex-breathe"
          )}
          style={delay(motion.breathe)}
        />
      ) : null}
      {intro
        ? [0.73, 0.87].map((at, i) => (
            <circle
              key={at}
              cx="16"
              cy="16"
              r="11"
              fill="none"
              stroke={gold}
              strokeWidth={i ? 1 : 1.5}
              vectorEffect="non-scaling-stroke"
              className="origin-center animate-framex-ring opacity-0 [transform-box:fill-box] motion-reduce:animate-none"
              style={delay(pre + at)}
            />
          ))
        : null}

      <g {...frameStroke} stroke={gold}>
        {[FRAME_TL, FRAME_BR].map((d, i) => (
          <path key={d} d={d} {...(entrance ? drawIn(pre + i * 0.12) : {})} />
        ))}
      </g>
      <path
        d={PLAY}
        fill={gold}
        {...(entrance
          ? {
              className: "origin-center animate-logo-land [transform-box:fill-box] motion-reduce:animate-none",
              style: delay(pre + 0.45),
            }
          : {})}
      />

      {shine ? (
        <g mask={`url(#${id}-metal)`}>
          <g transform="rotate(22 16 16)">
            <rect
              x="0"
              y="-12"
              width="8"
              height="56"
              fill={`url(#${id}-band)`}
              className={cn(
                "[transform:translateX(-16px)] motion-reduce:animate-none",
                shine === "hover" ? "motion-safe:group-hover/framex:animate-framex-band-once" : "animate-framex-band"
              )}
              style={delay(motion.band)}
            />
          </g>
        </g>
      ) : null}
      {splash ? (
        // The filter blurs what the mask let through: the lit metal glows past its edges.
        <g filter={`url(#${id}-spill)`}>
          <g mask={`url(#${id}-metal)`}>
            <g transform="rotate(22 16 16)">
              <rect
                x="0"
                y="-12"
                width="14"
                height="56"
                fill={`url(#${id}-gloss)`}
                className="[transform:translateX(-20px)] animate-framex-gloss motion-reduce:animate-none"
                style={delay(motion.splash ?? 0)}
              />
            </g>
          </g>
        </g>
      ) : null}
      {flare ? (
        <>
          {motion.flareTl !== null ? (
            <Glint id={id} x={3.9} y={3.9} className={glintClass(flare)} style={delay(motion.flareTl)} />
          ) : null}
          <Glint id={id} x={28.1} y={28.1} className={glintClass(flare)} style={delay(motion.flareBr)} />
        </>
      ) : null}
    </svg>
  )
}

/** Brand-coloured light behind the play button, flashing as "ON" lights up. */
function OnGlow({ id }: { id: string }) {
  return (
    <>
      <defs>
        <radialGradient id={`${id}-on`}>
          <stop offset="0" style={{ stopColor: "var(--brand)", stopOpacity: 0.55 }} />
          <stop offset="1" style={{ stopColor: "var(--brand)", stopOpacity: 0 }} />
        </radialGradient>
      </defs>
      <circle
        cx="17"
        cy="16"
        r="12"
        fill={`url(#${id}-on)`}
        className="origin-center animate-frameon-glow opacity-0 [transform-box:fill-box] motion-reduce:animate-none"
      />
    </>
  )
}

/**
 * The FrameON mark: two film-frame corners and a gold play button
 * (`entrance="intro"` plays its intro). `variant="framex"` draws the premium
 * FrameX mark, all in gold, with optional light and motion (`shine`,
 * `flare`, `glow`, `entrance`).
 */
function LogoMark({
  size = 30,
  variant = "frameon",
  label = variant === "framex" ? "FrameX" : "FrameON",
  shine,
  flare,
  glow,
  entrance,
  className,
  ...props
}: MarkProps & VariantProps) {
  const id = React.useId()
  if (variant === "framex") {
    const motion = timeline({ shine, flare, glow, entrance })
    return (
      <FrameXMark
        size={size}
        label={label}
        motion={motion}
        shake
        className={className}
        {...props}
        style={{ "--framex-cycle": motion.cycle, ...props.style } as React.CSSProperties}
      />
    )
  }
  const intro = entrance === "intro"
  return (
    <svg
      data-slot="logo-mark"
      width={size}
      height={size}
      viewBox="0 0 32 32"
      className={cn("block shrink-0 text-heading", intro && "overflow-visible", className)}
      {...a11y(label)}
      {...props}
    >
      {intro ? <OnGlow id={id} /> : null}
      <g {...frameStroke}>
        {[FRAME_TL, FRAME_BR].map((d, i) => (
          <path key={d} d={d} {...(intro ? drawIn(i * 0.12) : {})} />
        ))}
      </g>
      <path
        d={PLAY}
        className={cn(
          "fill-brand",
          intro && "origin-center animate-frameon-play [transform-box:fill-box] motion-reduce:animate-none"
        )}
      />
    </svg>
  )
}

/**
 * Loading mark. Still the FrameON logo: the frame turns around its centre and
 * the play button breathes in step. The corners are symmetric through the
 * centre, so each half turn lands on the same picture and the loop has no seam.
 * `variant="framex"` casts it in gold.
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
function LogoSpinner({
  size = 48,
  label,
  variant = "frameon",
  className,
  ...props
}: MarkProps & { variant?: "frameon" | "framex" }) {
  const id = React.useId()
  const framex = variant === "framex"
  return (
    <svg
      data-slot="logo-spinner"
      data-variant={framex ? "framex" : undefined}
      width={size}
      height={size}
      viewBox="0 0 32 32"
      className={cn("block shrink-0 overflow-visible text-heading", className)}
      {...a11y(label)}
      {...props}
    >
      {framex ? (
        <>
          <defs>
            <GoldGradient id={id} />
            <GlowGradient id={id} />
          </defs>
          <circle cx="16" cy="16" r="21" fill={`url(#${id}-glow)`} opacity="0.6" />
        </>
      ) : null}
      <g
        {...frameStroke}
        {...(framex ? { stroke: `url(#${id}-gold)` } : {})}
        className="origin-center animate-brand-spin [transform-box:fill-box] motion-reduce:animate-none"
      >
        <path d={FRAME_TL} />
        <path d={FRAME_BR} />
      </g>
      <path
        d={PLAY}
        {...(framex ? { fill: `url(#${id}-gold)` } : {})}
        className={cn(
          "origin-center animate-brand-pulse [transform-box:fill-box] motion-reduce:animate-none",
          !framex && "fill-brand"
        )}
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
} & VariantProps

/** Text filled by its background: the band of light (when shining) over a base colour. */
const filledText = (base: string, shine: boolean): React.CSSProperties => ({
  color: "transparent",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  backgroundImage: shine ? `${BAND_CSS}, ${base}` : base,
  ...(shine
    ? { backgroundRepeat: "no-repeat", backgroundSize: "4em 100%, 100% 100%", backgroundPosition: "-4em 0, 0 0" }
    : {}),
})

const sweepClass = (mode: Mode) =>
  cn("motion-reduce:animate-none", mode === "hover" ? "motion-safe:group-hover/framex:animate-framex-sweep-once" : "animate-framex-sweep")

/** The splash on the name: a copy of the text, filled by the light alone, glowing where it is lit. */
const glossText: React.CSSProperties = {
  color: "transparent",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  backgroundImage: GLOSS_CSS,
  backgroundRepeat: "no-repeat",
  backgroundSize: "3.5em 100%",
  backgroundPosition: "-3.5em 0",
  filter: "drop-shadow(0 0 0.06em rgb(255 248 228 / 0.95)) drop-shadow(0 0 0.4em rgb(255 204 112 / 0.75))",
}

/** Seeded PRNG (mulberry32): the same dust on every render, server and client alike. */
function seeded(seed: number) {
  let s = seed | 0
  return () => {
    s = (s + 0x6d2b79f5) | 0
    let t = Math.imul(s ^ (s >>> 15), 1 | s)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** Gold cooling from pale to deep: `heat` 0–1 → an rgb() colour. */
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
  return `rgb(${a.map((v, k) => Math.round(v + ((b[k] ?? v) - v) * (x - i))).join(" ")})`
}

/**
 * The intro's gold dust: where each mote shows up around the lockup (x, y:
 * -1…1 of its half-size, spread wider), when after the hit and for how long
 * (s), how fast it rises and drifts (stage heights per second — the stage
 * being about 5.4 lockups tall), how it sways and twinkles (Hz).
 */
const DUST = (() => {
  const r = seeded(1930)
  return Array.from({ length: 56 }, () => {
    const born = 0.08 + 1.6 * Math.pow(r(), 1.5)
    const mote = {
      born,
      life: Math.min(1.4 + 1.6 * r(), 4.2 - born),
      x: r() * 2 - 1,
      y: r() * 2 - 1,
      rise: 0.015 + 0.045 * r(),
      drift: (r() * 2 - 1) * 0.012,
      sway: 0.6 + 0.8 * r(),
      size: 0.6 + 1.4 * r(),
      twinkle: 2 + 3 * r(),
    }
    r() // the twinkle's phase, which CSS starts at 0; drawn anyway to keep the sequence
    return { ...mote, core: goldAt(0.12 + 0.3 * r()) }
  })
})()

/**
 * Gold dust drifting up around the FrameX lockup after the hit, swaying and
 * twinkling, gone within 4.2 s. Plain CSS: each mote is placed, timed and
 * tinted here, on the server; the keyframes only move it.
 */
function FrameXDust({ size, hit }: { size: number; hit: number }) {
  const px = (v: number) => `${Math.round(v * 10) / 10}px`
  const ms = (v: number) => `${Math.round(v * 1000)}ms`
  // Tuned on a 56 px wordmark: lockup ≈ 69 px high, stage ≈ 5.4 lockups.
  const stage = size * 1.24 * 5.4
  return (
    <span aria-hidden className="pointer-events-none absolute inset-0 mix-blend-screen motion-reduce:hidden">
      {DUST.map((d, i) => {
        const at = delay(hit + d.born)
        const glow = (d.size * 10 * size) / 56
        return (
          <span
            key={i}
            className="absolute animate-framex-ember opacity-0"
            style={
              {
                ...at,
                left: `${(50 + d.x * 60).toFixed(1)}%`,
                top: `${(50 + d.y * 90).toFixed(1)}%`,
                "--ember-life": ms(d.life),
                "--ember-to": `${px(d.drift * stage * d.life)} ${px(-d.rise * stage * d.life)}`,
              } as React.CSSProperties
            }
          >
            <span
              className="block rounded-full animate-framex-ember-glint"
              style={
                {
                  ...at,
                  width: px(glow),
                  height: px(glow),
                  margin: px(-glow / 2),
                  backgroundImage: `radial-gradient(closest-side, ${d.core} 10%, rgb(255 236 190 / 0.6) 16%, rgb(255 214 140 / 0.2) 42%, transparent)`,
                  // Fractional counts, so the sway and twinkle end with the mote.
                  "--ember-swing": px(0.006 * stage),
                  "--ember-sway": ms(0.5 / d.sway),
                  "--ember-swings": +(d.life * 2 * d.sway).toFixed(2),
                  "--ember-twinkle": ms(0.5 / d.twinkle),
                  "--ember-twinkles": +(d.life * 2 * d.twinkle).toFixed(2),
                } as React.CSSProperties
              }
            />
          </span>
        )
      })}
    </span>
  )
}

/** "FRAMEX": wide uppercase, ivory "FRAME" and a gold "X" that carries the last glint. */
function FrameXName({ motion, children }: { motion: Timeline; children: React.ReactNode }) {
  if (motion.splash === null) return <FrameXLetters motion={motion}>{children}</FrameXLetters>
  // Letters and their lit copy share one grid cell, laid out alike, so every glyph lands on its twin.
  return (
    <span className="inline-grid">
      <span className="[grid-area:1/1]">
        <FrameXLetters motion={motion}>{children}</FrameXLetters>
      </span>
      <span
        aria-hidden
        className="pointer-events-none animate-framex-gloss-text [grid-area:1/1] motion-reduce:hidden"
        style={{ ...glossText, ...delay(motion.splash + 0.35) }}
      >
        {children ?? (
          <>
            <span>FRAME</span>
            <span>X</span>
          </>
        )}
      </span>
    </span>
  )
}

function FrameXLetters({ motion, children }: { motion: Timeline; children: React.ReactNode }) {
  const id = React.useId()
  const { shine, flare, glow } = motion
  const ivory = filledText(`linear-gradient(${IVORY}, ${IVORY})`, Boolean(shine))
  const frameStyle = { ...ivory, ...(shine ? delay(motion.sweepFrame) : {}) }
  if (children != null) {
    return (
      <span className={shine ? sweepClass(shine) : undefined} style={frameStyle}>
        {children}
      </span>
    )
  }
  return (
    <>
      <span className={shine ? sweepClass(shine) : undefined} style={frameStyle}>
        FRAME
      </span>
      {/* The glow sits on a wrapper: the X itself already runs the sweep. */}
      <span
        className={glow ? "animate-framex-x-glow motion-reduce:animate-none" : undefined}
        style={glow ? delay(motion.breathe) : undefined}
      >
        <span
          className={cn("relative", shine && sweepClass(shine))}
          style={{ ...filledText(GOLD_CSS, Boolean(shine)), ...(shine ? delay(motion.sweepX) : {}) }}
        >
          X
          {flare ? (
            <svg
              viewBox="-10 -10 20 20"
              aria-hidden
              // On the end of the X's upper-right arm.
              className="pointer-events-none absolute top-[0.17em] left-[0.6em] -mt-[0.75em] -ml-[0.75em] size-[1.5em] overflow-visible"
            >
              <defs>
                <GlintGradients id={id} />
              </defs>
              <Glint id={id} x={0} y={0} className={glintClass(flare, true)} style={delay(motion.flareX)} />
            </svg>
          ) : null}
        </span>
      </span>
    </>
  )
}

/**
 * Mark + "FrameON". Pass `render={<Link href="/" />}` to make it a link, and
 * children to change the name (the docs use it for "FrameUI").
 * `entrance="intro"` plays FrameON's short intro.
 *
 * `variant="framex"`: the premium FrameX lockup — gold mark and a wide
 * uppercase "FRAMEX" — with the same light and motion props as `LogoMark`,
 * applied to the whole lockup. For a given `size` the mark keeps the same
 * size as FrameON's, so the two swap without the layout moving.
 */
function Wordmark({
  size = 24,
  mark = true,
  variant = "frameon",
  shine,
  flare,
  glow,
  entrance,
  render,
  className,
  style,
  children,
  ...props
}: WordmarkProps) {
  if (variant === "framex") {
    const motion = timeline({ shine, flare, glow, entrance })
    const intro = motion.entrance === "intro"
    const nameSize = size * 0.62
    return renderElement(
      "div",
      render,
      {
        ...props,
        className: cn(
          "flex items-center no-underline select-none",
          (motion.shine === "hover" || motion.flare === "hover") && "group/framex",
          intro && "relative animate-framex-shake motion-reduce:animate-none",
          className
        ),
        style: {
          gap: Math.round(nameSize * 0.58),
          "--framex-cycle": motion.cycle,
          ...(intro ? delay(motion.pre + 0.73) : {}),
          ...style,
        } as React.CSSProperties,
        children: (
          <>
            {mark ? <FrameXMark size={Math.round(size * 1.24)} label="" motion={motion} shake={false} /> : null}
            <span
              className={cn(
                "-mr-[0.32em] leading-none font-semibold tracking-[0.32em] whitespace-nowrap",
                motion.entrance && "animate-framex-track motion-reduce:animate-none"
              )}
              style={{ fontSize: nameSize, ...(motion.entrance ? delay(motion.pre + 0.4) : {}) }}
            >
              <FrameXName motion={motion}>{children}</FrameXName>
            </span>
            {intro ? <FrameXDust size={size} hit={motion.pre + 0.73} /> : null}
          </>
        ),
      },
      { slot: "wordmark", variant: "framex" }
    )
  }
  return renderElement(
    "div",
    render,
    {
      ...props,
      className: cn("flex items-center no-underline select-none", className),
      style: { gap: Math.round(size * 0.34), ...style },
      children: (
        <>
          {mark ? (
            <LogoMark size={Math.round(size * 1.24)} label="" entrance={entrance === "intro" ? "intro" : undefined} />
          ) : null}
          <span
            className={cn(
              "leading-none font-extrabold tracking-[-0.5px] text-heading",
              entrance && "animate-frameon-rise motion-reduce:animate-none"
            )}
            style={{ fontSize: size }}
          >
            {children ?? (
              <>
                Frame
                <span className={cn("text-brand", entrance && "animate-frameon-on motion-reduce:animate-none")}>ON</span>
              </>
            )}
          </span>
        </>
      ),
    },
    { slot: "wordmark" }
  )
}

export { LogoLost, LogoMark, LogoSpinner, Wordmark, type FrameXMotion, type WordmarkProps }

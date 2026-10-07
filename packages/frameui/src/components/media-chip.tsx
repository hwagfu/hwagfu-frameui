import type * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { StarIcon } from "../lib/icons"
import { renderElement, type useRender } from "../lib/render"
import { cn } from "../lib/utils"

/*
 * FrameON's small chips for posters, the hero and rankings. They sit on top of
 * artwork, hence the translucent dark fill. Every one is a plain <span>.
 */

type ChipSize = "sm" | "md"

/** Rating with a gold star: `8.6`. */
function ScoreChip({
  value,
  size = "sm",
  className,
  ...props
}: Omit<React.ComponentProps<"span">, "children"> & { value: number; size?: ChipSize }) {
  return (
    <span
      data-slot="score-chip"
      className={cn(
        "inline-flex items-center gap-[3px] rounded-xs bg-sunken/85 px-[5px] py-[2px] font-sans leading-[13px] font-bold whitespace-nowrap text-heading",
        size === "sm" ? "text-[10px] [&>svg]:size-2.5" : "text-micro [&>svg]:size-[11px]",
        className
      )}
      {...props}
    >
      <StarIcon className="fill-brand text-brand" />
      {value.toFixed(1)}
    </span>
  )
}

const ageChipVariants = cva(
  "inline-flex items-center rounded-sm border border-current bg-sunken/60 font-sans leading-[1.35] font-bold whitespace-nowrap",
  {
    variants: {
      rating: {
        K: "text-age-k",
        T13: "text-age-t13",
        T16: "text-age-t16",
        T18: "text-age-t18",
      },
      size: {
        sm: "px-[5px] py-px text-[10px]",
        md: "px-[5px] py-px text-micro",
        lg: "px-2 py-[3px] text-[13px]",
      },
    },
    defaultVariants: { size: "sm" },
  }
)

/** Age rating: K green · T13 gold · T16 orange · T18 red. */
function AgeChip({
  rating,
  size = "sm",
  className,
  ...props
}: Omit<React.ComponentProps<"span">, "children"> &
  VariantProps<typeof ageChipVariants> & { rating: "K" | "T13" | "T16" | "T18" }) {
  return (
    <span
      data-slot="age-chip"
      className={cn(ageChipVariants({ rating, size }), className)}
      {...props}
    >
      {rating}
    </span>
  )
}

/** Short metadata — "Vietsub", "1g 45p". `sub` is the purple subtitle chip. */
function MetaChip({
  variant = "default",
  className,
  ...props
}: React.ComponentProps<"span"> & { variant?: "default" | "sub" }) {
  return (
    <span
      data-slot="meta-chip"
      data-variant={variant}
      className={cn(
        "rounded-xs px-[5px] py-[2px] font-sans text-[10px] leading-[13px] font-bold whitespace-nowrap",
        variant === "sub" ? "bg-primary text-heading" : "bg-sunken/80 text-foreground",
        className
      )}
      {...props}
    />
  )
}

const languages = {
  pd: { label: "PĐ.", dot: "bg-primary", title: "Phụ đề" },
  tm: { label: "TM.", dot: "bg-brand", title: "Thuyết minh" },
  lt: { label: "LT.", dot: "bg-heading", title: "Lồng tiếng" },
} as const

/** Language chip with an episode count: PĐ (phụ đề) · TM (thuyết minh) · LT (lồng tiếng). */
function LangChip({
  kind,
  count,
  className,
  ...props
}: Omit<React.ComponentProps<"span">, "children"> & {
  kind: keyof typeof languages
  count: React.ReactNode
}) {
  const lang = languages[kind]
  return (
    <span
      data-slot="lang-chip"
      title={lang.title}
      className={cn(
        "inline-flex items-center gap-1 rounded-xs bg-sunken/85 px-1.5 py-[2px] font-sans text-[10px] leading-[13px] font-bold whitespace-nowrap text-heading",
        className
      )}
      {...props}
    >
      <span className={cn("size-[5px] shrink-0 rounded-[1px]", lang.dot)} />
      {lang.label} {count}
    </span>
  )
}

/**
 * Thin outlined chip for the hero and long metadata. As a link
 * (`render={<a href="…" />}`) it turns gold on hover.
 */
function OutlineChip({
  variant = "default",
  render,
  className,
  ...props
}: useRender.ComponentProps<"span"> & { variant?: "default" | "gold" }) {
  return renderElement(
    "span",
    render,
    {
      ...props,
      className: cn(
        "inline-flex items-center gap-[5px] rounded-md border bg-sunken/40 px-2.5 py-[5px] font-sans text-[13px] leading-[18px] font-semibold whitespace-nowrap no-underline transition-[color,border-color] duration-150 outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring [&>svg]:size-3.5 [&>svg]:shrink-0",
        variant === "gold" ? "border-brand text-brand" : "border-white/25 text-foreground",
        "[a&]:cursor-pointer [a&]:hover:border-brand [a&]:hover:text-brand",
        className
      ),
    },
    { slot: "outline-chip", variant }
  )
}

export { AgeChip, LangChip, MetaChip, OutlineChip, ScoreChip, ageChipVariants }

import type * as React from "react"

import { cn } from "../lib/utils"

type CardProps = React.ComponentProps<"div"> & {
  /** `sm` tightens the inner spacing from 16px to 12px. */
  size?: "default" | "sm"
  /**
   * FrameON surfaces: `default` card, `elevated` nested panel with more air,
   * `promo` gold-bordered block for VIP upsells.
   */
  variant?: "default" | "elevated" | "promo"
}

function Card({ className, size = "default", variant = "default", ...props }: CardProps) {
  return (
    <div
      data-slot="card"
      data-size={size}
      data-variant={variant}
      className={cn(
        "group/card flex flex-col gap-(--card-spacing) overflow-hidden rounded-md border py-(--card-spacing) font-sans text-subtitle text-card-foreground [--card-spacing:--spacing(4)] has-data-[slot=card-footer]:pb-0 has-[>img:first-child]:pt-0 data-[size=sm]:[--card-spacing:--spacing(3)] *:[img:first-child]:rounded-t-md *:[img:last-child]:rounded-b-md",
        variant === "default" && "border-border bg-card shadow-floating",
        variant === "elevated" && "border-border bg-card-nested shadow-elevated [--card-spacing:--spacing(6)]",
        variant === "promo" &&
          "rounded-lg border-2 border-brand bg-linear-to-b from-background to-modal shadow-glow [--card-spacing:--spacing(6)]",
        className
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "group/card-header @container/card-header grid auto-rows-min items-start gap-1 px-(--card-spacing) has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-(--card-spacing)",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        "font-sans text-h2 text-heading group-data-[size=sm]/card:text-link group-data-[size=sm]/card:font-bold group-data-[variant=promo]/card:text-brand",
        className
      )}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("font-sans text-caption text-muted-foreground", className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn("col-start-2 row-span-2 row-start-1 self-start justify-self-end", className)}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-(--card-spacing) text-foreground", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "flex items-center gap-3 border-t border-border bg-sunken/40 p-(--card-spacing)",
        className
      )}
      {...props}
    />
  )
}

export { Card, CardHeader, CardFooter, CardTitle, CardAction, CardDescription, CardContent, type CardProps }

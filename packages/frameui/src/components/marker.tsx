import type * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { renderElement, type useRender } from "../lib/render"
import { cn } from "../lib/utils"

const markerVariants = cva(
  "group/marker relative flex min-h-4 w-full items-center gap-2 text-left font-sans text-caption text-muted-foreground [&_svg:not([class*='size-'])]:size-4 [a]:text-brand [a]:underline-offset-4 [a]:hover:underline",
  {
    variants: {
      variant: {
        default: "",
        separator:
          "before:mr-1 before:h-px before:min-w-0 before:flex-1 before:bg-border after:ml-1 after:h-px after:min-w-0 after:flex-1 after:bg-border",
        border: "border-b border-border pb-2",
      },
    },
  }
)

function Marker({
  className,
  variant = "default",
  render,
  ...props
}: useRender.ComponentProps<"div"> & VariantProps<typeof markerVariants>) {
  return renderElement(
    "div",
    render,
    { ...props, className: cn(markerVariants({ variant }), className) },
    { slot: "marker", variant }
  )
}

function MarkerIcon({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="marker-icon"
      aria-hidden="true"
      className={cn("size-4 shrink-0 text-tertiary [&_svg:not([class*='size-'])]:size-4", className)}
      {...props}
    />
  )
}

function MarkerContent({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="marker-content"
      className={cn(
        "min-w-0 wrap-break-word group-data-[variant=separator]/marker:flex-none group-data-[variant=separator]/marker:text-center *:[a]:text-brand *:[a]:underline-offset-4 *:[a]:hover:underline",
        className
      )}
      {...props}
    />
  )
}

export { Marker, MarkerIcon, MarkerContent, markerVariants }

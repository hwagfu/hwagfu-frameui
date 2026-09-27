import type * as React from "react"

import { cn } from "../lib/utils"

/**
 * Text styles from shadcn/ui's Typography page, set in FrameON's type scale
 * (display 32 · h1 28 · h3 20 · h2 18 · link 16 · subtitle 14 · caption 12).
 */

function TypographyH1({ className, ...props }: React.ComponentProps<"h1">) {
  return (
    <h1
      data-slot="typography-h1"
      className={cn("m-0 scroll-m-20 font-sans text-display text-balance text-heading", className)}
      {...props}
    />
  )
}

function TypographyH2({ className, ...props }: React.ComponentProps<"h2">) {
  return (
    <h2
      data-slot="typography-h2"
      className={cn(
        "m-0 scroll-m-20 border-b border-border pb-2 font-sans text-h1 text-heading first:mt-0",
        className
      )}
      {...props}
    />
  )
}

function TypographyH3({ className, ...props }: React.ComponentProps<"h3">) {
  return (
    <h3
      data-slot="typography-h3"
      className={cn("m-0 scroll-m-20 font-sans text-h3 text-heading", className)}
      {...props}
    />
  )
}

function TypographyH4({ className, ...props }: React.ComponentProps<"h4">) {
  return (
    <h4
      data-slot="typography-h4"
      className={cn("m-0 scroll-m-20 font-sans text-h2 text-heading", className)}
      {...props}
    />
  )
}

function TypographyP({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="typography-p"
      className={cn(
        "m-0 font-sans text-subtitle leading-6 text-foreground [&:not(:first-child)]:mt-4",
        className
      )}
      {...props}
    />
  )
}

function TypographyBlockquote({ className, ...props }: React.ComponentProps<"blockquote">) {
  return (
    <blockquote
      data-slot="typography-blockquote"
      className={cn(
        "mx-0 mt-6 border-l-2 border-brand pl-5 font-sans text-subtitle text-muted-foreground italic",
        className
      )}
      {...props}
    />
  )
}

function TypographyList({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="typography-list"
      className={cn(
        "my-4 ml-6 list-disc p-0 font-sans text-subtitle text-foreground marker:text-brand [&>li]:mt-2",
        className
      )}
      {...props}
    />
  )
}

function TypographyInlineCode({ className, ...props }: React.ComponentProps<"code">) {
  return (
    <code
      data-slot="typography-inline-code"
      className={cn(
        "relative rounded-xs bg-muted px-1.5 py-0.5 font-mono text-code text-brand-muted",
        className
      )}
      {...props}
    />
  )
}

function TypographyLead({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="typography-lead"
      className={cn("m-0 font-sans text-link text-muted-foreground", className)}
      {...props}
    />
  )
}

function TypographyLarge({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="typography-large"
      className={cn("font-sans text-link font-bold text-heading", className)}
      {...props}
    />
  )
}

function TypographySmall({ className, ...props }: React.ComponentProps<"small">) {
  return (
    <small
      data-slot="typography-small"
      className={cn("font-sans text-caption font-medium text-foreground", className)}
      {...props}
    />
  )
}

function TypographyMuted({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="typography-muted"
      className={cn("m-0 font-sans text-caption text-muted-foreground", className)}
      {...props}
    />
  )
}

export {
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyH4,
  TypographyP,
  TypographyBlockquote,
  TypographyList,
  TypographyInlineCode,
  TypographyLead,
  TypographyLarge,
  TypographySmall,
  TypographyMuted,
}

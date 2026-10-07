import type * as React from "react"

import { ArrowBigUpIcon, ChevronUpIcon, CommandIcon, OptionIcon } from "../lib/icons"
import { cn } from "../lib/utils"

/**
 * Modifier keys drawn as their Mac symbols. SVG rather than the ⌘ ⌥ ⌃ ⇧
 * characters: most text fonts (Be Vietnam Pro included) lack those glyphs, so
 * the browser would borrow them from another font at another size.
 */
const modifiers = {
  command: { Icon: CommandIcon, name: "Command" },
  option: { Icon: OptionIcon, name: "Option" },
  control: { Icon: ChevronUpIcon, name: "Control" },
  shift: { Icon: ArrowBigUpIcon, name: "Shift" },
} as const

type KbdProps = React.ComponentProps<"kbd"> & {
  /**
   * Draws a modifier key's symbol before the children: `command` ⌘,
   * `option` ⌥, `control` ⌃, `shift` ⇧. Screen readers hear its name.
   */
  modifier?: keyof typeof modifiers
}

function Kbd({ modifier, className, children, ...props }: KbdProps) {
  const mod = modifier ? modifiers[modifier] : undefined
  return (
    <kbd
      data-slot="kbd"
      data-modifier={modifier}
      className={cn(
        "pointer-events-none inline-flex h-5 w-fit min-w-5 items-center justify-center gap-1 rounded-sm border border-border bg-muted px-1 font-sans text-micro font-medium text-muted-foreground select-none in-data-[slot=tooltip-content]:border-transparent in-data-[slot=tooltip-content]:bg-background/60 [&_svg:not([class*='size-'])]:size-3",
        mod && children != null && "gap-0.5",
        className
      )}
      {...props}
    >
      {mod ? (
        <>
          {/* An explicit size, so a parent's `[&_svg]` sizing (Button, InputGroup…) leaves it alone. */}
          <mod.Icon className="size-3" />
          <span className="sr-only">{mod.name}</span>
        </>
      ) : null}
      {children}
    </kbd>
  )
}

function KbdGroup({ className, ...props }: React.ComponentProps<"kbd">) {
  return (
    <kbd
      data-slot="kbd-group"
      className={cn("inline-flex items-center gap-1", className)}
      {...props}
    />
  )
}

export { Kbd, KbdGroup, type KbdProps }

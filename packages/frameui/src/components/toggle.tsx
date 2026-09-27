import { Toggle as TogglePrimitive } from "@base-ui/react/toggle"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../lib/utils"

/**
 * Pressed state uses FrameON's active chip: gold text on a 12% gold wash.
 * `outline` is FrameON's filter tag — a pill that lights up gold when on.
 */
const toggleVariants = cva(
  "group/toggle inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-md border border-transparent font-sans text-button font-medium whitespace-nowrap text-muted-foreground transition-[color,background-color,border-color] duration-150 outline-none hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-brand data-pressed:bg-brand/12 data-pressed:text-brand [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-transparent hover:bg-muted",
        outline:
          "rounded-full border-border bg-transparent hover:border-tertiary data-pressed:border-brand",
      },
      size: {
        default: "h-[38px] min-w-[38px] px-3",
        sm: "h-8 min-w-8 px-2.5 text-caption [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-[46px] min-w-[46px] px-4 text-subtitle",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Toggle({
  className,
  variant = "default",
  size = "default",
  ...props
}: TogglePrimitive.Props & VariantProps<typeof toggleVariants>) {
  return (
    <TogglePrimitive
      data-slot="toggle"
      className={cn(toggleVariants({ variant, size }), className)}
      {...props}
    />
  )
}

export { Toggle, toggleVariants }

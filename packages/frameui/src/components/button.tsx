import { cva, type VariantProps } from "class-variance-authority"

import { renderElement, type useRender } from "../lib/render"
import { cn } from "../lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-md border border-transparent font-sans font-normal whitespace-nowrap transition-[opacity,background-color,border-color,color,box-shadow] duration-150 select-none outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:cursor-not-allowed disabled:opacity-50 aria-disabled:cursor-not-allowed aria-disabled:opacity-50 aria-invalid:border-brand [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-elevated hover:opacity-80",
        golden: "bg-brand font-bold text-brand-foreground shadow-elevated hover:opacity-80",
        secondary:
          "border-muted-foreground bg-secondary text-secondary-foreground hover:bg-muted-foreground/30 hover:text-foreground aria-expanded:bg-muted-foreground/30 aria-expanded:text-foreground",
        outline:
          "border-heading/50 bg-transparent text-muted-foreground hover:border-heading hover:text-heading aria-expanded:border-heading aria-expanded:text-heading",
        ghost:
          "bg-transparent text-muted-foreground hover:text-heading aria-expanded:text-heading",
        destructive:
          "bg-destructive/15 text-destructive hover:bg-destructive/25 focus-visible:outline-destructive",
        link: "h-auto! px-0! text-brand underline-offset-4 hover:underline",
      },
      size: {
        xs: "h-7 gap-1.5 px-2.5 text-caption [&_svg:not([class*='size-'])]:size-3.5",
        sm: "h-8 gap-1.5 px-3 text-caption [&_svg:not([class*='size-'])]:size-3.5",
        default: "h-[38px] px-4 text-button",
        lg: "h-[46px] px-5 text-link [&_svg:not([class*='size-'])]:size-[18px]",
        icon: "size-[38px] rounded-full text-button",
        "icon-xs": "size-7 rounded-full text-caption [&_svg:not([class*='size-'])]:size-3.5",
        "icon-sm": "size-8 rounded-full text-caption",
        "icon-lg": "size-[46px] rounded-full text-link [&_svg:not([class*='size-'])]:size-[18px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

type ButtonProps = useRender.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    /**
     * Set to `false` when `render` swaps the `<button>` for another element
     * (a link, a `<span>`…): `disabled` is then exposed as `aria-disabled`
     * and no `type` attribute is added.
     */
    nativeButton?: boolean
  }

/**
 * FrameON button. A plain `<button>` — no hooks, no `"use client"` — so it
 * renders as static HTML inside a Server Component.
 *
 * Swap the element with `render`, e.g. `render={<Link href="/vip" />}` plus
 * `nativeButton={false}`, to get a link that looks the same.
 */
function Button({
  className,
  variant = "default",
  size = "default",
  render,
  nativeButton = render === undefined,
  disabled,
  ...props
}: ButtonProps) {
  return renderElement(
    "button",
    render,
    {
      ...props,
      ...(nativeButton
        ? { disabled, type: props.type ?? "button" }
        : {
            "aria-disabled": disabled || undefined,
            "data-disabled": disabled ? "" : undefined,
          }),
      className: cn(buttonVariants({ variant, size }), className),
    },
    { slot: "button", variant, size }
  )
}

export { Button, buttonVariants, type ButtonProps }

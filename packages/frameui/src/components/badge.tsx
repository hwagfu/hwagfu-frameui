import { cva, type VariantProps } from "class-variance-authority"

import { renderElement, type useRender } from "../lib/render"
import { cn } from "../lib/utils"

const badgeVariants = cva(
  "group/badge inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-sm border border-transparent px-2 py-1 font-sans text-micro leading-tight whitespace-nowrap transition-[color,background-color,border-color,opacity] duration-150 outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring aria-invalid:border-brand [&>svg]:pointer-events-none [&>svg]:size-3!",
  {
    variants: {
      variant: {
        default: "bg-primary font-normal text-primary-foreground [a]:hover:opacity-80",
        golden: "bg-brand font-bold text-brand-foreground [a]:hover:opacity-80",
        secondary: "bg-muted font-normal text-muted-foreground [a]:hover:text-foreground",
        destructive: "bg-destructive/15 text-destructive [a]:hover:bg-destructive/25",
        outline:
          "border-border bg-transparent text-muted-foreground [a]:hover:border-tertiary [a]:hover:text-foreground",
        ghost: "text-muted-foreground hover:bg-muted hover:text-foreground",
        link: "text-brand underline-offset-4 hover:underline",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

type BadgeProps = useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>

/** Small status label — "VIP", "Song ngữ", "FHD"… */
function Badge({ className, variant = "default", render, ...props }: BadgeProps) {
  return renderElement(
    "span",
    render,
    { ...props, className: cn(badgeVariants({ variant }), className) },
    { slot: "badge", variant }
  )
}

export { Badge, badgeVariants, type BadgeProps }

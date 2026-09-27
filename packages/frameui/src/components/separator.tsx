import { renderElement, type useRender } from "../lib/render"
import { cn } from "../lib/utils"

type SeparatorProps = useRender.ComponentProps<"div"> & {
  orientation?: "horizontal" | "vertical"
}

/**
 * A hairline. Same markup and attributes as Base UI's separator, but without
 * its client runtime — a `<div>` needs none, and staying hook-free keeps it
 * out of the client bundle.
 */
function Separator({ className, orientation = "horizontal", render, ...props }: SeparatorProps) {
  return renderElement(
    "div",
    render,
    {
      role: "separator",
      "aria-orientation": orientation,
      ...props,
      className: cn(
        "shrink-0 bg-border data-horizontal:h-px data-horizontal:w-full data-vertical:w-px data-vertical:self-stretch",
        className
      ),
    },
    { slot: "separator", orientation }
  )
}

export { Separator, type SeparatorProps }

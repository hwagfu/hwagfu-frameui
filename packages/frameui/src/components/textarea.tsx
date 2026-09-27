import type * as React from "react"

import { fieldSurface } from "../lib/styles"
import { cn } from "../lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        fieldSurface,
        "flex field-sizing-content min-h-24 w-full px-4 py-2.5 font-sans text-control placeholder:text-tertiary",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }

import type * as React from "react"

import { fieldSurface } from "../lib/styles"
import { cn } from "../lib/utils"

/**
 * Text field. A native `<input>` — the gold focus glow is pure CSS, so this
 * stays a Server Component and submits with a plain `<form>` before
 * JavaScript loads.
 */
function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        fieldSurface,
        "h-[42px] w-full min-w-0 px-4 py-2 font-sans text-control placeholder:text-tertiary",
        "file:mr-3 file:inline-flex file:h-7 file:border-0 file:bg-transparent file:font-sans file:text-subtitle file:font-medium file:text-foreground",
        "[&[type=search]::-webkit-search-cancel-button]:appearance-none",
        className
      )}
      {...props}
    />
  )
}

export { Input }

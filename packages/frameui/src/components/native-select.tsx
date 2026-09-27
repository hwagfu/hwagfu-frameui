import type * as React from "react"

import { ChevronDownIcon } from "../lib/icons"
import { fieldSurface } from "../lib/styles"
import { cn } from "../lib/utils"

type NativeSelectProps = Omit<React.ComponentProps<"select">, "size"> & {
  size?: "sm" | "default"
}

/**
 * The browser's own `<select>` in FrameON clothing. Works without JavaScript
 * and on every device; the open list is drawn by the OS. For a fully styled
 * list use `Select`.
 */
function NativeSelect({ className, size = "default", ...props }: NativeSelectProps) {
  return (
    <div
      className={cn(
        "group/native-select relative w-fit has-[select:disabled]:opacity-50",
        className
      )}
      data-slot="native-select-wrapper"
      data-size={size}
    >
      <select
        data-slot="native-select"
        data-size={size}
        className={cn(
          fieldSurface,
          "h-[42px] w-full min-w-0 cursor-pointer appearance-none py-1 pr-10 pl-4 font-sans text-control disabled:pointer-events-none data-[size=sm]:h-9 data-[size=sm]:pl-3 data-[size=sm]:text-subtitle"
        )}
        {...props}
      />
      <ChevronDownIcon
        className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted-foreground select-none"
        data-slot="native-select-icon"
      />
    </div>
  )
}

function NativeSelectOption({ className, ...props }: React.ComponentProps<"option">) {
  return (
    <option
      data-slot="native-select-option"
      className={cn("bg-popover text-popover-foreground", className)}
      {...props}
    />
  )
}

function NativeSelectOptGroup({ className, ...props }: React.ComponentProps<"optgroup">) {
  return (
    <optgroup
      data-slot="native-select-optgroup"
      className={cn("bg-popover text-popover-foreground", className)}
      {...props}
    />
  )
}

export { NativeSelect, NativeSelectOptGroup, NativeSelectOption, type NativeSelectProps }

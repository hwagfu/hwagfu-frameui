"use client"

import type * as React from "react"

/**
 * The only interactive bit of `InputGroupAddon`: a click on the addon (but
 * not on a button inside it) focuses the group's input. Kept as a tiny client
 * leaf with no dependencies — class names are computed by the server part.
 */
function FocusSiblingInput({ onClick, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      {...props}
      onClick={(event) => {
        onClick?.(event)
        if ((event.target as HTMLElement).closest("button")) return
        event.currentTarget.parentElement
          ?.querySelector<HTMLElement>("input, textarea")
          ?.focus()
      }}
    />
  )
}

export { FocusSiblingInput }

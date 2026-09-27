import * as React from "react"

import { cn } from "./utils"

type IconNode = ReadonlyArray<readonly [string, Record<string, string>]>

export type IconProps = React.ComponentProps<"svg">

/**
 * Builds a Lucide-compatible icon as a plain function component.
 *
 * `lucide-react` marks every icon `"use client"` (it reads a context), so each
 * icon a Server Component renders ships JavaScript. These icons are only an
 * `<svg>` — no hooks, no directive — and stay static HTML on the server.
 */
export function createIcon(name: string, node: IconNode) {
  function Icon({ className, ...props }: IconProps) {
    const labelled =
      props["aria-label"] !== undefined ||
      props["aria-labelledby"] !== undefined ||
      props.role !== undefined
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden={labelled ? undefined : true}
        className={cn("lucide", `lucide-${name}`, className)}
        {...props}
      >
        {node.map(([tag, attrs], i) => React.createElement(tag, { key: i, ...attrs }))}
      </svg>
    )
  }
  Icon.displayName = name
  return Icon
}

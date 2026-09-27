import Link from "next/link"

import { cn } from "@hwagfu/frameui/utils"

/** FrameON mark: two film-frame corners and a gold play button. */
export function LogoMark({ size = 26, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      aria-hidden
      className={cn("block shrink-0 text-heading", className)}
    >
      <g fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round">
        <path d="M11.5 2.9H7A4.1 4.1 0 0 0 2.9 7v4.5" />
        <path d="M20.5 29.1H25a4.1 4.1 0 0 0 4.1-4.1v-4.5" />
      </g>
      <path
        className="fill-brand"
        d="M12.8 10.1a1.1 1.1 0 0 1 1.66-.95l8.2 5.05a1.1 1.1 0 0 1 0 1.87l-8.2 5.05a1.1 1.1 0 0 1-1.66-.94z"
      />
    </svg>
  )
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        "flex items-center gap-2 rounded-xs no-underline outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        className
      )}
    >
      <LogoMark />
      <span className="text-link font-extrabold tracking-tight text-heading">
        Frame<span className="text-brand">UI</span>
      </span>
    </Link>
  )
}

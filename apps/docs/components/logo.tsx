import Link from "next/link"

import { Wordmark as FrameWordmark } from "@hwagfu/frameui/logo"
import { cn } from "@hwagfu/frameui/utils"

/** The library's FrameON wordmark, renamed "FrameUI" and linking home. */
export function Wordmark({ className }: { className?: string }) {
  return (
    <FrameWordmark
      size={17}
      render={<Link href="/" />}
      className={cn(
        "rounded-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        className
      )}
    >
      Frame<span className="text-brand">UI</span>
    </FrameWordmark>
  )
}

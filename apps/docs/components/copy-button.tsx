"use client"

import * as React from "react"
import { Check, Copy } from "lucide-react"

import { Button } from "@hwagfu/frameui/button"
import { cn } from "@hwagfu/frameui/utils"

export function CopyButton({ value, className }: { value: string; className?: string }) {
  const [copied, setCopied] = React.useState(false)

  React.useEffect(() => {
    if (!copied) return
    const id = setTimeout(() => setCopied(false), 1600)
    return () => clearTimeout(id)
  }, [copied])

  return (
    <Button
      variant="ghost"
      size="icon-sm"
      aria-label={copied ? "Đã sao chép" : "Sao chép mã"}
      className={cn("rounded-md bg-sunken/80 backdrop-blur-sm", copied && "text-success hover:text-success", className)}
      onClick={() => {
        void navigator.clipboard.writeText(value)
        setCopied(true)
      }}
    >
      {copied ? <Check /> : <Copy />}
    </Button>
  )
}

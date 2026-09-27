"use client"

import * as React from "react"
import { Check, Copy, Eye, EyeOff } from "lucide-react"

import { Button } from "@hwagfu/frameui/button"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@hwagfu/frameui/input-group"

/** Masked secret with reveal and copy — the token itself never shows until asked. */
export function SecretField({ value, label }: { value: string; label: string }) {
  const [shown, setShown] = React.useState(false)
  const [copied, setCopied] = React.useState(false)

  React.useEffect(() => {
    if (!copied) return
    const id = setTimeout(() => setCopied(false), 1600)
    return () => clearTimeout(id)
  }, [copied])

  return (
    <InputGroup>
      <InputGroupInput
        readOnly
        aria-label={label}
        type={shown ? "text" : "password"}
        value={value}
        className="font-mono text-caption"
        onFocus={(event) => event.currentTarget.select()}
      />
      <InputGroupAddon align="inline-end">
        <Button
          type="button"
          variant="ghost"
          size="icon-xs"
          aria-label={shown ? "Ẩn token" : "Hiện token"}
          onClick={() => setShown((s) => !s)}
        >
          {shown ? <EyeOff /> : <Eye />}
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon-xs"
          aria-label={copied ? "Đã sao chép" : "Sao chép token"}
          className={copied ? "text-success hover:text-success" : undefined}
          onClick={() => {
            void navigator.clipboard.writeText(value)
            setCopied(true)
          }}
        >
          {copied ? <Check /> : <Copy />}
        </Button>
      </InputGroupAddon>
    </InputGroup>
  )
}

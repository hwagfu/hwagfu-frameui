"use client"

import * as React from "react"

import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@hwagfu/frameui/input-otp"

export default function InputOTPDemo() {
  const [value, setValue] = React.useState("")

  return (
    <div className="flex flex-col items-start gap-3">
      <InputOTP maxLength={6} value={value} onChange={setValue}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
      <p className="text-caption text-muted-foreground">
        {value ? `Bạn đã nhập: ${value}` : "Nhập mã 6 số gửi tới điện thoại."}
      </p>
    </div>
  )
}

"use client"

import * as React from "react"

import { Calendar } from "@hwagfu/frameui/calendar"

export default function CalendarDemo() {
  const [date, setDate] = React.useState<Date | undefined>(new Date(2026, 8, 26))

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      defaultMonth={new Date(2026, 8, 1)}
      className="rounded-md border border-border bg-card-nested"
    />
  )
}

"use client"

import * as React from "react"
import type { DateRange } from "react-day-picker"

import { Calendar } from "@hwagfu/frameui/calendar"

export default function CalendarRange() {
  const [range, setRange] = React.useState<DateRange | undefined>({
    from: new Date(2026, 8, 12),
    to: new Date(2026, 8, 19),
  })

  return (
    <Calendar
      mode="range"
      numberOfMonths={2}
      selected={range}
      onSelect={setRange}
      defaultMonth={new Date(2026, 8, 1)}
      className="rounded-md border border-border bg-card-nested"
    />
  )
}

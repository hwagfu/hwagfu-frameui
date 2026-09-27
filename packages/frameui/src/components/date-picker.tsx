"use client"

import * as React from "react"
import { format as formatDate } from "date-fns"
import type { DateRange, Locale } from "react-day-picker"

import { CalendarIcon } from "../lib/icons"
import { fieldSurface } from "../lib/styles"
import { cn } from "../lib/utils"
import { Calendar } from "./calendar"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"

type DatePickerBaseProps = {
  /** Shown while nothing is picked. */
  placeholder?: string
  /** date-fns pattern for the trigger label. */
  formatStr?: string
  /** date-fns / react-day-picker locale (e.g. `vi` from `date-fns/locale`). */
  locale?: Locale
  disabled?: boolean
  className?: string
  /** Extra props for the `Calendar` inside the popover. */
  calendarProps?: Omit<React.ComponentProps<typeof Calendar>, "mode" | "selected" | "onSelect">
}

const triggerClass = cn(
  fieldSurface,
  "inline-flex h-[42px] w-full min-w-56 cursor-pointer items-center justify-start gap-3 px-4 text-left font-sans text-control data-[empty=true]:text-tertiary [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:text-muted-foreground"
)

/**
 * Date field: the shadcn/ui Date Picker recipe (Popover + Calendar) packaged
 * as one component. Controlled with `value` / `onValueChange`, or
 * uncontrolled with `defaultValue`.
 */
function DatePicker({
  value,
  defaultValue,
  onValueChange,
  placeholder = "Pick a date",
  formatStr = "PPP",
  locale,
  disabled,
  className,
  calendarProps,
}: DatePickerBaseProps & {
  value?: Date | undefined
  defaultValue?: Date
  onValueChange?: (date: Date | undefined) => void
}) {
  const [inner, setInner] = React.useState<Date | undefined>(defaultValue)
  const [open, setOpen] = React.useState(false)
  const date = value !== undefined ? value : inner

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        data-slot="date-picker"
        data-empty={!date}
        disabled={disabled}
        className={cn(triggerClass, className)}
      >
        <CalendarIcon />
        {date ? formatDate(date, formatStr, locale ? { locale } : undefined) : <span>{placeholder}</span>}
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          {...calendarProps}
          mode="single"
          selected={date}
          locale={locale}
          onSelect={(next: Date | undefined) => {
            if (value === undefined) setInner(next)
            onValueChange?.(next)
            setOpen(false)
          }}
        />
      </PopoverContent>
    </Popover>
  )
}

/** Two-month range picker built the same way. */
function DateRangePicker({
  value,
  defaultValue,
  onValueChange,
  placeholder = "Pick a date range",
  formatStr = "LLL dd, y",
  locale,
  disabled,
  className,
  calendarProps,
}: DatePickerBaseProps & {
  value?: DateRange | undefined
  defaultValue?: DateRange
  onValueChange?: (range: DateRange | undefined) => void
}) {
  const [inner, setInner] = React.useState<DateRange | undefined>(defaultValue)
  const range = value !== undefined ? value : inner
  const fmt = (d: Date) => formatDate(d, formatStr, locale ? { locale } : undefined)

  return (
    <Popover>
      <PopoverTrigger
        data-slot="date-range-picker"
        data-empty={!range?.from}
        disabled={disabled}
        className={cn(triggerClass, "min-w-72", className)}
      >
        <CalendarIcon />
        {range?.from ? (
          range.to ? (
            <>
              {fmt(range.from)} – {fmt(range.to)}
            </>
          ) : (
            fmt(range.from)
          )
        ) : (
          <span>{placeholder}</span>
        )}
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          {...calendarProps}
          mode="range"
          numberOfMonths={2}
          {...(range?.from ? { defaultMonth: range.from } : {})}
          selected={range}
          locale={locale}
          onSelect={(next: DateRange | undefined) => {
            if (value === undefined) setInner(next)
            onValueChange?.(next)
          }}
        />
      </PopoverContent>
    </Popover>
  )
}

export { DatePicker, DateRangePicker }

"use client"

import { vi } from "date-fns/locale"

import { DatePicker, DateRangePicker } from "@hwagfu/frameui/date-picker"

export default function DatePickerDemo() {
  return (
    <div className="flex flex-col items-start gap-4">
      <DatePicker placeholder="Chọn ngày chiếu" locale={vi} formatStr="EEEE, dd/MM/yyyy" />
      <DateRangePicker placeholder="Chọn khoảng ngày" locale={vi} formatStr="dd/MM/yyyy" />
    </div>
  )
}

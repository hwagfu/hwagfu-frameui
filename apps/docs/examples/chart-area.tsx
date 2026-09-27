"use client"

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@hwagfu/frameui/chart"

const data = [
  { day: "T2", minutes: 186 },
  { day: "T3", minutes: 305 },
  { day: "T4", minutes: 237 },
  { day: "T5", minutes: 173 },
  { day: "T6", minutes: 409 },
  { day: "T7", minutes: 514 },
  { day: "CN", minutes: 468 },
]

const config = { minutes: { label: "Phút xem", color: "var(--chart-2)" } } satisfies ChartConfig

export default function ChartArea() {
  return (
    <ChartContainer config={config} className="min-h-[200px] w-full max-w-xl">
      <AreaChart accessibilityLayer data={data} margin={{ left: 12, right: 12 }}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={8} />
        <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
        <defs>
          <linearGradient id="fillMinutes" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--color-minutes)" stopOpacity={0.6} />
            <stop offset="95%" stopColor="var(--color-minutes)" stopOpacity={0.05} />
          </linearGradient>
        </defs>
        <Area dataKey="minutes" type="natural" fill="url(#fillMinutes)" stroke="var(--color-minutes)" />
      </AreaChart>
    </ChartContainer>
  )
}

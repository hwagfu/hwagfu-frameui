"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@hwagfu/frameui/chart"

const data = [
  { month: "T4", vip: 1860, free: 800 },
  { month: "T5", vip: 3050, free: 2000 },
  { month: "T6", vip: 2370, free: 1200 },
  { month: "T7", vip: 2730, free: 1900 },
  { month: "T8", vip: 2090, free: 1300 },
  { month: "T9", vip: 2140, free: 1400 },
]

const config = {
  vip: { label: "VIP", color: "var(--chart-2)" },
  free: { label: "Miễn phí", color: "var(--chart-1)" },
} satisfies ChartConfig

export default function ChartDemo() {
  return (
    <ChartContainer config={config} className="min-h-[220px] w-full max-w-xl">
      <BarChart accessibilityLayer data={data}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="vip" fill="var(--color-vip)" radius={4} />
        <Bar dataKey="free" fill="var(--color-free)" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}

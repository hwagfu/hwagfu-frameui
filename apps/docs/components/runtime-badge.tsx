import { Badge } from "@hwagfu/frameui/badge"

import type { Runtime } from "@/lib/types"

export const runtimeInfo: Record<Runtime, { label: string; hint: string; variant: "golden" | "default" | "secondary" }> = {
  server: {
    label: "Server · 0 KB JS",
    hint: "Không hook, không \"use client\": render thành HTML tĩnh, không gửi JavaScript xuống trình duyệt.",
    variant: "golden",
  },
  island: {
    label: "Đảo client",
    hint: "Wrapper chạy trên server (class, cva, tailwind-merge ở lại server); chỉ primitive tương tác là client.",
    variant: "default",
  },
  client: {
    label: "Client",
    hint: "Cần state/hook ở cấp component nên cả file là Client Component.",
    variant: "secondary",
  },
}

export function RuntimeBadge({ runtime }: { runtime: Runtime }) {
  const info = runtimeInfo[runtime]
  return (
    <Badge variant={info.variant} title={info.hint}>
      {info.label}
    </Badge>
  )
}

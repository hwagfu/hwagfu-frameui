import { Kbd, KbdGroup } from "@hwagfu/frameui/kbd"

export default function KbdDemo() {
  return (
    <div className="flex flex-col items-start gap-3 text-subtitle text-muted-foreground">
      <div className="flex items-center gap-2">
        Tìm nhanh <Kbd modifier="command">K</Kbd>
      </div>
      <div className="flex items-center gap-2">
        Tạm dừng <Kbd>Space</Kbd> · Tua <Kbd>←</Kbd><Kbd>→</Kbd>
      </div>
    </div>
  )
}

import { Kbd, KbdGroup } from "@hwagfu/frameui/kbd"

export default function KbdDemo() {
  return (
    <div className="flex flex-col items-start gap-3 text-subtitle text-muted-foreground">
      <div className="flex items-center gap-2">
        Tìm nhanh <KbdGroup><Kbd>⌘</Kbd><Kbd>K</Kbd></KbdGroup>
      </div>
      <div className="flex items-center gap-2">
        Tạm dừng <Kbd>Space</Kbd> · Tua <Kbd>←</Kbd><Kbd>→</Kbd>
      </div>
    </div>
  )
}

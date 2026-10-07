import { Kbd, KbdGroup } from "@hwagfu/frameui/kbd"

export default function KbdModifiers() {
  return (
    <div className="flex flex-col items-start gap-4 text-subtitle text-muted-foreground">
      <div className="flex items-center gap-2">
        <Kbd modifier="command" />
        <Kbd modifier="option" />
        <Kbd modifier="control" />
        <Kbd modifier="shift" />
      </div>
      <div className="flex flex-wrap items-center gap-2">
        Lưu <Kbd modifier="command">S</Kbd> · Bảng lệnh
        <KbdGroup>
          <Kbd modifier="command" />
          <Kbd modifier="shift" />
          <Kbd>P</Kbd>
        </KbdGroup>
      </div>
      <div className="flex items-center gap-2">
        Tua 10 giây
        <KbdGroup>
          <Kbd modifier="option" />
          <Kbd>→</Kbd>
        </KbdGroup>
      </div>
    </div>
  )
}

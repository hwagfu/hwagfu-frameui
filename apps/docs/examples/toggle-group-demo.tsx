import { AlignCenter, AlignLeft, AlignRight } from "lucide-react"

import { ToggleGroup, ToggleGroupItem } from "@hwagfu/frameui/toggle-group"

export default function ToggleGroupDemo() {
  return (
    <div className="flex flex-col items-start gap-5">
      {/* Bộ lọc kho phim — chip viên thuốc của FrameON */}
      <ToggleGroup variant="outline" size="sm" multiple defaultValue={["action"]}>
        <ToggleGroupItem value="all">Tất cả</ToggleGroupItem>
        <ToggleGroupItem value="action">Hành động</ToggleGroupItem>
        <ToggleGroupItem value="drama">Chính kịch</ToggleGroupItem>
        <ToggleGroupItem value="comedy">Hài</ToggleGroupItem>
        <ToggleGroupItem value="anime">Hoạt hình</ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup spacing={0} defaultValue={["left"]}>
        <ToggleGroupItem value="left" aria-label="Căn trái">
          <AlignLeft />
        </ToggleGroupItem>
        <ToggleGroupItem value="center" aria-label="Căn giữa">
          <AlignCenter />
        </ToggleGroupItem>
        <ToggleGroupItem value="right" aria-label="Căn phải">
          <AlignRight />
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  )
}

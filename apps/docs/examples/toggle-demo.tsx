import { Bold, Heart, Subtitles } from "lucide-react"

import { Toggle } from "@hwagfu/frameui/toggle"

export default function ToggleDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Toggle aria-label="Yêu thích" defaultPressed>
        <Heart />
      </Toggle>
      <Toggle aria-label="Phụ đề">
        <Subtitles />
        Phụ đề
      </Toggle>
      <Toggle variant="outline" defaultPressed>
        Hành động
      </Toggle>
      <Toggle variant="outline">Chính kịch</Toggle>
      <Toggle size="sm" aria-label="In đậm">
        <Bold />
      </Toggle>
    </div>
  )
}

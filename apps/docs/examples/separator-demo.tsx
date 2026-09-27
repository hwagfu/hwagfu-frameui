import { Separator } from "@hwagfu/frameui/separator"

export default function SeparatorDemo() {
  return (
    <div className="w-full max-w-sm">
      <div className="space-y-1">
        <h4 className="text-subtitle font-bold text-heading">Hành tinh cát: Phần hai</h4>
        <p className="text-caption text-muted-foreground">Khoa học viễn tưởng · 2024 · 166 phút</p>
      </div>
      <Separator className="my-4" />
      <div className="flex h-5 items-center gap-4 text-caption text-muted-foreground">
        <span>Phụ đề</span>
        <Separator orientation="vertical" />
        <span>Thuyết minh</span>
        <Separator orientation="vertical" />
        <span>4K</span>
      </div>
    </div>
  )
}

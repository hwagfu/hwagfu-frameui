import { Badge } from "@hwagfu/frameui/badge"

export default function BadgeDemo() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge variant="golden">VIP</Badge>
      <Badge>Song ngữ</Badge>
      <Badge variant="secondary">FHD</Badge>
      <Badge variant="outline">T16</Badge>
      <Badge variant="destructive">Hết hạn</Badge>
      <Badge variant="ghost">Mới</Badge>
      <Badge variant="link" render={<a href="#" />}>
        Xem thêm
      </Badge>
    </div>
  )
}

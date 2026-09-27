import { Play } from "lucide-react"

import { Button } from "@hwagfu/frameui/button"

export default function ButtonDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button>Đăng ký</Button>
      <Button variant="golden">
        <Play data-icon="inline-start" />
        Xem ngay
      </Button>
      <Button variant="secondary">Danh sách</Button>
      <Button variant="outline">Chi tiết</Button>
      <Button variant="ghost">Xem tất cả</Button>
      <Button variant="destructive">Xoá</Button>
      <Button variant="link">Điều khoản</Button>
    </div>
  )
}

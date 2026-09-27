import { Bell, Play, Search } from "lucide-react"

import { Button } from "@hwagfu/frameui/button"

export default function ButtonSizes() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-3">
        <Button size="xs" variant="golden">xs</Button>
        <Button size="sm" variant="golden">sm</Button>
        <Button variant="golden">default</Button>
        <Button size="lg" variant="golden">lg</Button>
        <Button size="lg" variant="secondary" className="rounded-full">
          Thành viên
        </Button>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Button size="icon-xs" variant="outline" aria-label="Tìm kiếm">
          <Search />
        </Button>
        <Button size="icon-sm" variant="outline" aria-label="Tìm kiếm">
          <Search />
        </Button>
        <Button size="icon" variant="outline" aria-label="Tìm kiếm">
          <Search />
        </Button>
        <Button size="icon-lg" variant="golden" aria-label="Xem ngay">
          <Play />
        </Button>
        <Button size="icon-lg" aria-label="Thông báo">
          <Bell />
        </Button>
      </div>
    </div>
  )
}

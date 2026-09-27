import { Bell } from "lucide-react"

import { Button } from "@hwagfu/frameui/button"
import { Popover, PopoverContent, PopoverDescription, PopoverHeader, PopoverTitle, PopoverTrigger } from "@hwagfu/frameui/popover"

const notifications = [
  { title: "Tập mới: Squid Game 2 · Tập 7", time: "5 phút trước" },
  { title: "Phim bạn chờ đã có thuyết minh", time: "2 giờ trước" },
]

export default function PopoverDemo() {
  return (
    <Popover>
      <PopoverTrigger render={<Button variant="ghost" size="icon" aria-label="Thông báo" />}>
        <Bell />
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 gap-0 p-0">
        <PopoverHeader className="border-b border-border px-4 py-3">
          <PopoverTitle>Thông báo</PopoverTitle>
          <PopoverDescription>2 thông báo chưa đọc</PopoverDescription>
        </PopoverHeader>
        {notifications.map((n) => (
          <div key={n.title} className="px-4 py-3 hover:bg-muted">
            <div className="text-caption font-medium text-foreground">{n.title}</div>
            <div className="mt-0.5 text-micro text-tertiary">{n.time}</div>
          </div>
        ))}
      </PopoverContent>
    </Popover>
  )
}

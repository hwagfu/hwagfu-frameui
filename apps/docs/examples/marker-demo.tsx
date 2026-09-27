import { Clock } from "lucide-react"

import { Marker, MarkerContent, MarkerIcon } from "@hwagfu/frameui/marker"

export default function MarkerDemo() {
  return (
    <div className="grid w-full max-w-md gap-5">
      <Marker variant="separator">
        <MarkerContent>Hôm nay</MarkerContent>
      </Marker>
      <Marker>
        <MarkerIcon>
          <Clock />
        </MarkerIcon>
        <MarkerContent>
          Bạn dừng ở phút 48:12 — <a href="#">xem tiếp</a>
        </MarkerContent>
      </Marker>
      <Marker variant="border">
        <MarkerContent>Tập 5 · Hồi kết</MarkerContent>
      </Marker>
    </div>
  )
}

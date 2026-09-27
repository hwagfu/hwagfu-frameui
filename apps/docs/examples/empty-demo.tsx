import { SearchX } from "lucide-react"

import { Button } from "@hwagfu/frameui/button"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@hwagfu/frameui/empty"

export default function EmptyDemo() {
  return (
    <Empty className="w-full max-w-lg">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <SearchX />
        </EmptyMedia>
        <EmptyTitle>Không tìm thấy phim</EmptyTitle>
        <EmptyDescription>Thử bỏ bớt bộ lọc hoặc tìm bằng tên tiếng Anh.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="golden" size="sm" className="rounded-full">
          Xoá bộ lọc
        </Button>
      </EmptyContent>
    </Empty>
  )
}

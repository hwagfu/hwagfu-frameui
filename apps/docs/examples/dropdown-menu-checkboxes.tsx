import { ListFilter } from "lucide-react"

import { Button } from "@hwagfu/frameui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@hwagfu/frameui/dropdown-menu"

export default function DropdownMenuCheckboxes() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="secondary" />}>
        <ListFilter data-icon="inline-start" /> Sắp xếp & lọc
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuLabel>Sắp xếp</DropdownMenuLabel>
          <DropdownMenuRadioGroup defaultValue="new">
            <DropdownMenuRadioItem value="new">Mới cập nhật</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="views">Xem nhiều</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="imdb">Điểm IMDb</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel>Hiển thị</DropdownMenuLabel>
          <DropdownMenuCheckboxItem defaultChecked>Phụ đề</DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem>Thuyết minh</DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem disabled>4K (chỉ VIP)</DropdownMenuCheckboxItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

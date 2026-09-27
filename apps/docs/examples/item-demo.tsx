import { BadgeCheck, ChevronRight, Film } from "lucide-react"

import { Button } from "@hwagfu/frameui/button"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@hwagfu/frameui/item"

export default function ItemDemo() {
  return (
    <ItemGroup className="w-full max-w-md">
      <Item variant="outline">
        <ItemMedia variant="icon">
          <BadgeCheck />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Tài khoản đã xác minh</ItemTitle>
          <ItemDescription>Bạn có thể xem phim trên 4 thiết bị cùng lúc.</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button size="sm" variant="outline">
            Quản lý
          </Button>
        </ItemActions>
      </Item>
      <ItemSeparator />
      <Item variant="muted" render={<a href="#" />}>
        <ItemMedia variant="icon">
          <Film />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Danh sách của tôi</ItemTitle>
          <ItemDescription>12 phim đang chờ xem</ItemDescription>
        </ItemContent>
        <ItemActions>
          <ChevronRight className="size-4 text-muted-foreground" />
        </ItemActions>
      </Item>
    </ItemGroup>
  )
}

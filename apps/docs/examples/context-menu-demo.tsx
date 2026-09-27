import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@hwagfu/frameui/context-menu"

export default function ContextMenuDemo() {
  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-40 w-full max-w-sm items-center justify-center rounded-md border border-dashed border-tertiary text-caption text-muted-foreground">
        Nhấn chuột phải vào đây
      </ContextMenuTrigger>
      <ContextMenuContent className="w-60">
        <ContextMenuItem>
          Xem ngay <ContextMenuShortcut>↵</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>Thêm vào danh sách</ContextMenuItem>
        <ContextMenuSub>
          <ContextMenuSubTrigger>Chia sẻ</ContextMenuSubTrigger>
          <ContextMenuSubContent>
            <ContextMenuItem>Sao chép liên kết</ContextMenuItem>
            <ContextMenuItem>Facebook</ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSeparator />
        <ContextMenuCheckboxItem defaultChecked>Đã xem</ContextMenuCheckboxItem>
        <ContextMenuItem variant="destructive">Ẩn phim này</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}

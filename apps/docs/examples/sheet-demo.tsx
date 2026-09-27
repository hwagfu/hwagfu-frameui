import { Button } from "@hwagfu/frameui/button"
import { Label } from "@hwagfu/frameui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@hwagfu/frameui/sheet"
import { Switch } from "@hwagfu/frameui/switch"

export default function SheetDemo() {
  return (
    <div className="flex flex-wrap gap-3">
      <Sheet>
        <SheetTrigger render={<Button variant="secondary" />}>Cài đặt trình phát</SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Cài đặt trình phát</SheetTitle>
            <SheetDescription>Áp dụng cho mọi phim trên thiết bị này.</SheetDescription>
          </SheetHeader>
          <div className="grid gap-5 px-6">
            <div className="flex items-center justify-between">
              <Label htmlFor="sh-auto">Tự động phát tập tiếp</Label>
              <Switch id="sh-auto" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="sh-skip">Bỏ qua đoạn mở đầu</Label>
              <Switch id="sh-skip" />
            </div>
          </div>
          <SheetFooter>
            <SheetClose render={<Button variant="golden" />}>Xong</SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
      <Sheet>
        <SheetTrigger render={<Button variant="outline" />}>Mở từ bên trái</SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>Danh mục</SheetTitle>
            <SheetDescription>Menu điều hướng trên di động.</SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  )
}

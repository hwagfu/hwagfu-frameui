import { Button } from "@hwagfu/frameui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@hwagfu/frameui/dialog"
import { Field, FieldLabel } from "@hwagfu/frameui/field"
import { Input } from "@hwagfu/frameui/input"

export default function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="secondary" />}>Sửa hồ sơ</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Sửa hồ sơ</DialogTitle>
          <DialogDescription>Thay đổi tên hiển thị của bạn trên FrameON.</DialogDescription>
        </DialogHeader>
        <Field>
          <FieldLabel htmlFor="display-name">Tên hiển thị</FieldLabel>
          <Input id="display-name" defaultValue="Hoàng Phúc" />
        </Field>
        <DialogFooter>
          <DialogClose render={<Button variant="secondary" />}>Huỷ</DialogClose>
          <Button variant="golden">Lưu</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

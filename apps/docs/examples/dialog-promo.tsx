import { Crown } from "lucide-react"

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

export default function DialogPromo() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="golden" className="rounded-full" />}>
        <Crown data-icon="inline-start" /> Nâng cấp VIP
      </DialogTrigger>
      <DialogContent variant="promo">
        <DialogHeader>
          <DialogTitle>Trở thành thành viên VIP</DialogTitle>
          <DialogDescription>
            Xem phim không quảng cáo, chất lượng 4K HDR và tải về xem ngoại tuyến.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose render={<Button variant="ghost" />}>Để sau</DialogClose>
          <Button variant="golden">Nâng cấp — 79.000đ/tháng</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

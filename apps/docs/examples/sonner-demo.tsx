"use client"

import { toast } from "sonner"

import { Button } from "@hwagfu/frameui/button"

export default function SonnerDemo() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button variant="secondary" onClick={() => toast("Đã thêm vào danh sách của tôi")}>
        Mặc định
      </Button>
      <Button
        variant="secondary"
        onClick={() =>
          toast.success("Thanh toán thành công", { description: "Gói VIP có hiệu lực đến 26/10/2026" })
        }
      >
        Thành công
      </Button>
      <Button variant="secondary" onClick={() => toast.warning("Gói VIP sắp hết hạn")}>
        Cảnh báo
      </Button>
      <Button variant="secondary" onClick={() => toast.error("Không phát được video")}>
        Lỗi
      </Button>
      <Button
        variant="golden"
        onClick={() =>
          toast.promise(new Promise((resolve) => setTimeout(resolve, 1500)), {
            loading: "Đang tải phụ đề…",
            success: "Đã tải phụ đề tiếng Việt",
            error: "Tải phụ đề thất bại",
          })
        }
      >
        Promise
      </Button>
    </div>
  )
}

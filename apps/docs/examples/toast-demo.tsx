"use client"

import { Button } from "@hwagfu/frameui/button"
import { toast } from "@hwagfu/frameui/toast"

export default function ToastDemo() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button
        variant="secondary"
        onClick={() => toast.add({ title: "Đã lưu", description: "Tuỳ chọn trình phát đã được lưu." })}
      >
        Mặc định
      </Button>
      <Button
        variant="secondary"
        onClick={() => toast.add({ type: "success", title: "Đã tải xong", description: "Mắt biếc (1080p)" })}
      >
        Thành công
      </Button>
      <Button
        variant="secondary"
        onClick={() => toast.add({ type: "error", title: "Không thể kết nối", description: "Thử lại sau ít phút." })}
      >
        Lỗi
      </Button>
      <Button
        variant="golden"
        onClick={() =>
          toast.promise(new Promise((resolve) => setTimeout(resolve, 1500)), {
            loading: { title: "Đang gia hạn…" },
            success: { title: "Đã gia hạn VIP", description: "Thêm 30 ngày." },
            error: { title: "Gia hạn thất bại" },
          })
        }
      >
        Promise
      </Button>
    </div>
  )
}

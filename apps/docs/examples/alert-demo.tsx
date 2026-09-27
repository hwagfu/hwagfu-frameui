import { CircleAlert, CircleCheck, Info, TriangleAlert } from "lucide-react"

import { Alert, AlertAction, AlertDescription, AlertTitle } from "@hwagfu/frameui/alert"
import { Button } from "@hwagfu/frameui/button"

export default function AlertDemo() {
  return (
    <div className="grid w-full max-w-lg gap-3">
      <Alert>
        <Info />
        <AlertTitle>Bảo trì hệ thống</AlertTitle>
        <AlertDescription>FrameON sẽ tạm ngưng từ 2:00 đến 3:00 sáng Chủ nhật.</AlertDescription>
      </Alert>
      <Alert variant="success">
        <CircleCheck />
        <AlertTitle>Thanh toán thành công</AlertTitle>
        <AlertDescription>Gói VIP của bạn có hiệu lực đến 26/10/2026.</AlertDescription>
      </Alert>
      <Alert variant="warning">
        <CircleAlert />
        <AlertTitle>Gói sắp hết hạn</AlertTitle>
        <AlertDescription>Còn 3 ngày nữa gói VIP hết hạn.</AlertDescription>
        <AlertAction>
          <Button size="xs" variant="golden">
            Gia hạn
          </Button>
        </AlertAction>
      </Alert>
      <Alert variant="destructive">
        <TriangleAlert />
        <AlertTitle>Không phát được video</AlertTitle>
        <AlertDescription>Kết nối mạng không ổn định. Hãy thử lại sau.</AlertDescription>
      </Alert>
    </div>
  )
}

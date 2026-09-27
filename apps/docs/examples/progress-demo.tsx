import { Progress, ProgressLabel, ProgressValue } from "@hwagfu/frameui/progress"

export default function ProgressDemo() {
  return (
    <div className="grid w-full max-w-sm gap-6">
      <Progress value={66}>
        <ProgressLabel>Đã xem</ProgressLabel>
        <ProgressValue />
      </Progress>
      <Progress value={24}>
        <ProgressLabel>Đang tải về</ProgressLabel>
        <ProgressValue />
      </Progress>
      <Progress value={null} aria-label="Đang xử lý" />
    </div>
  )
}

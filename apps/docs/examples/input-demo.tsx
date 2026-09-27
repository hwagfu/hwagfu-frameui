import { Input } from "@hwagfu/frameui/input"

export default function InputDemo() {
  return (
    <div className="grid w-full max-w-sm gap-3">
      <Input type="email" placeholder="Email của bạn" />
      <Input placeholder="Mã giảm giá" aria-invalid defaultValue="FRAME-OLD" />
      <Input placeholder="Không khả dụng" disabled />
      <Input type="file" />
    </div>
  )
}

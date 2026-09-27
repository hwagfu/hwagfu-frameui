import { Checkbox } from "@hwagfu/frameui/checkbox"
import { Label } from "@hwagfu/frameui/label"

export default function LabelDemo() {
  return (
    <div className="flex items-center gap-3">
      <Checkbox id="terms" />
      <Label htmlFor="terms">Tôi đồng ý với điều khoản sử dụng</Label>
    </div>
  )
}

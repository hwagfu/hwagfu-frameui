import { Label } from "@hwagfu/frameui/label"
import { Switch } from "@hwagfu/frameui/switch"

export default function SwitchDemo() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <Switch id="s-auto" defaultChecked />
        <Label htmlFor="s-auto">Tự động phát</Label>
      </div>
      <div className="flex items-center gap-3">
        <Switch id="s-hdr" />
        <Label htmlFor="s-hdr">HDR</Label>
      </div>
      <div className="flex items-center gap-3">
        <Switch id="s-sm" size="sm" defaultChecked />
        <Label htmlFor="s-sm">Kích thước nhỏ</Label>
      </div>
      <div className="flex items-center gap-3">
        <Switch id="s-off" disabled />
        <Label htmlFor="s-off">Không khả dụng</Label>
      </div>
    </div>
  )
}

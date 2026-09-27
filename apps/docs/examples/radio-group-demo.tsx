import { Label } from "@hwagfu/frameui/label"
import { RadioGroup, RadioGroupItem } from "@hwagfu/frameui/radio-group"

export default function RadioGroupDemo() {
  return (
    <RadioGroup defaultValue="sub" className="w-fit">
      <div className="flex items-center gap-3">
        <RadioGroupItem value="sub" id="r-sub" />
        <Label htmlFor="r-sub">Phụ đề</Label>
      </div>
      <div className="flex items-center gap-3">
        <RadioGroupItem value="dub" id="r-dub" />
        <Label htmlFor="r-dub">Thuyết minh</Label>
      </div>
      <div className="flex items-center gap-3">
        <RadioGroupItem value="raw" id="r-raw" disabled />
        <Label htmlFor="r-raw">Âm thanh gốc</Label>
      </div>
    </RadioGroup>
  )
}

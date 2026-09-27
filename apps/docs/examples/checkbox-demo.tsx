import { Checkbox } from "@hwagfu/frameui/checkbox"
import { Field, FieldContent, FieldDescription, FieldLabel, FieldTitle } from "@hwagfu/frameui/field"
import { Label } from "@hwagfu/frameui/label"

export default function CheckboxDemo() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-3">
        <Checkbox id="c-sub" defaultChecked />
        <Label htmlFor="c-sub">Hiện phụ đề</Label>
      </div>
      <div className="flex items-center gap-3">
        <Checkbox id="c-auto" indeterminate />
        <Label htmlFor="c-auto">Tự phát tập tiếp theo (một phần)</Label>
      </div>
      <div className="flex items-center gap-3">
        <Checkbox id="c-off" disabled />
        <Label htmlFor="c-off">Tải về ngoại tuyến (chỉ VIP)</Label>
      </div>
      <FieldLabel className="max-w-sm">
        <Field orientation="horizontal">
          <Checkbox id="c-card" defaultChecked />
          <FieldContent>
            <FieldTitle>Nhận thông báo phim mới</FieldTitle>
            <FieldDescription>Tối đa một email mỗi tuần.</FieldDescription>
          </FieldContent>
        </Field>
      </FieldLabel>
    </div>
  )
}

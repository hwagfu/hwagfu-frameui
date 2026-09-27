import { Button } from "@hwagfu/frameui/button"
import { Checkbox } from "@hwagfu/frameui/checkbox"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@hwagfu/frameui/field"
import { Input } from "@hwagfu/frameui/input"
import { NativeSelect, NativeSelectOption } from "@hwagfu/frameui/native-select"

export default function FieldDemo() {
  return (
    <form className="w-full max-w-md">
      <FieldGroup>
        <FieldSet>
          <FieldLegend>Thanh toán</FieldLegend>
          <FieldDescription>Mọi giao dịch được mã hoá an toàn.</FieldDescription>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="card-name">Tên trên thẻ</FieldLabel>
              <Input id="card-name" placeholder="NGUYEN VAN A" />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field>
                <FieldLabel htmlFor="card-month">Tháng</FieldLabel>
                <NativeSelect id="card-month" className="w-full" defaultValue="09">
                  <NativeSelectOption value="09">09</NativeSelectOption>
                  <NativeSelectOption value="10">10</NativeSelectOption>
                </NativeSelect>
              </Field>
              <Field>
                <FieldLabel htmlFor="card-cvv">CVV</FieldLabel>
                <Input id="card-cvv" placeholder="123" />
              </Field>
            </div>
          </FieldGroup>
        </FieldSet>
        <FieldSeparator>hoặc</FieldSeparator>
        <Field orientation="horizontal">
          <Checkbox id="save-card" defaultChecked />
          <FieldLabel htmlFor="save-card">Lưu thẻ cho lần sau</FieldLabel>
        </Field>
        <Field orientation="horizontal">
          <Button type="submit" variant="golden">
            Thanh toán
          </Button>
          <Button type="button" variant="ghost">
            Huỷ
          </Button>
        </Field>
      </FieldGroup>
    </form>
  )
}

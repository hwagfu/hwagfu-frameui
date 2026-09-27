import { Button } from "@hwagfu/frameui/button"
import { Field, FieldDescription, FieldError, FieldLabel } from "@hwagfu/frameui/field"
import { Input } from "@hwagfu/frameui/input"

export default function InputField() {
  return (
    <form className="grid w-full max-w-sm gap-5">
      <Field>
        <FieldLabel htmlFor="email">Email</FieldLabel>
        <Input id="email" type="email" placeholder="ban@frameon.vn" />
        <FieldDescription>Chúng tôi gửi mã xác nhận tới địa chỉ này.</FieldDescription>
      </Field>
      <Field data-invalid>
        <FieldLabel htmlFor="password">Mật khẩu</FieldLabel>
        <Input id="password" type="password" aria-invalid defaultValue="123" />
        <FieldError>Mật khẩu cần ít nhất 8 ký tự.</FieldError>
      </Field>
      <Button type="submit" variant="golden">
        Đăng nhập
      </Button>
    </form>
  )
}

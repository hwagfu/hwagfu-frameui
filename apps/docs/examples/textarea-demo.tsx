import { Field, FieldDescription, FieldLabel } from "@hwagfu/frameui/field"
import { Textarea } from "@hwagfu/frameui/textarea"

export default function TextareaDemo() {
  return (
    <Field className="max-w-md">
      <FieldLabel htmlFor="review">Cảm nhận của bạn</FieldLabel>
      <Textarea id="review" placeholder="Bộ phim này khiến bạn nghĩ gì?" />
      <FieldDescription>Không tiết lộ nội dung (spoiler) nhé.</FieldDescription>
    </Field>
  )
}

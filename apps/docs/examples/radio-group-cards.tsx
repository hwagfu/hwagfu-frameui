import { Field, FieldContent, FieldDescription, FieldLabel, FieldTitle } from "@hwagfu/frameui/field"
import { RadioGroup, RadioGroupItem } from "@hwagfu/frameui/radio-group"

const plans = [
  { id: "month", title: "Gói tháng", desc: "79.000đ / tháng · huỷ bất cứ lúc nào" },
  { id: "year", title: "Gói năm", desc: "790.000đ / năm · tiết kiệm 2 tháng" },
]

export default function RadioGroupCards() {
  return (
    <RadioGroup defaultValue="year" className="max-w-sm">
      {plans.map((plan) => (
        <FieldLabel key={plan.id} htmlFor={`plan-${plan.id}`}>
          <Field orientation="horizontal">
            <FieldContent>
              <FieldTitle>{plan.title}</FieldTitle>
              <FieldDescription>{plan.desc}</FieldDescription>
            </FieldContent>
            <RadioGroupItem value={plan.id} id={`plan-${plan.id}`} />
          </Field>
        </FieldLabel>
      ))}
    </RadioGroup>
  )
}

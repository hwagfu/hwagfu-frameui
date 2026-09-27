import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@hwagfu/frameui/accordion"

const faqs = [
  { q: "Gói VIP gồm những gì?", a: "Không quảng cáo, chất lượng 4K HDR, xem trên 4 thiết bị và tải phim về máy." },
  { q: "Tôi có thể huỷ bất cứ lúc nào không?", a: "Có. Gói vẫn dùng được tới hết kỳ đã thanh toán." },
  { q: "FrameON có phim thuyết minh không?", a: "Hầu hết phim nổi bật đều có cả phụ đề và thuyết minh tiếng Việt." },
]

export default function AccordionDemo() {
  return (
    <Accordion defaultValue={["item-0"]} className="w-full max-w-lg">
      {faqs.map((faq, index) => (
        <AccordionItem key={faq.q} value={`item-${index}`}>
          <AccordionTrigger>{faq.q}</AccordionTrigger>
          <AccordionContent>{faq.a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

import type { PropDoc } from "../types"

export const baseUi = (part: string, path: string) => ({
  label: `Base UI ${part}`,
  href: `https://base-ui.com/react/components/${path}`,
})

export const classNameProp: PropDoc = {
  name: "className",
  type: "string",
  description: "Gộp sau cùng qua tailwind-merge nên ghi đè được mọi class mặc định.",
}

export const renderProp: PropDoc = {
  name: "render",
  type: "ReactElement | (props, state) => ReactElement",
  description:
    "Thay phần tử gốc mà vẫn giữ hình thức, ví dụ `render={<Link href=\"/\" />}`. Cùng hợp đồng với Base UI nhưng không dùng hook.",
}

export const restProp = (element: string): PropDoc => ({
  name: "...props",
  type: `ComponentProps<"${element}">`,
  description: `Mọi thuộc tính còn lại được chuyển xuống thẻ <${element}>.`,
})

export const primitiveRest = (part: string): PropDoc => ({
  name: "...props",
  type: `${part}.Props`,
  description: `Toàn bộ prop của ${part} (Base UI) — xem liên kết primitive ở đầu trang.`,
})

export const sideProps: PropDoc[] = [
  { name: "side", type: '"top" | "right" | "bottom" | "left" | "inline-start" | "inline-end"', description: "Phía hiện bảng nổi so với phần tử kích hoạt." },
  { name: "sideOffset", type: "number", description: "Khoảng cách (px) giữa bảng nổi và phần tử kích hoạt." },
  { name: "align", type: '"start" | "center" | "end"', description: "Căn bảng nổi theo trục còn lại." },
  { name: "alignOffset", type: "number", description: "Độ lệch (px) theo trục căn." },
]

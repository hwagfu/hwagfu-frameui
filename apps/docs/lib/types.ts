/** Where a component's code runs. */
export type Runtime =
  /** No client JavaScript at all — renders to static HTML. */
  | "server"
  /** Server wrapper around a Base UI (or other) client primitive: only the primitive ships JS. */
  | "island"
  /** The whole component is a Client Component. */
  | "client"

export type PropDoc = {
  name: string
  type: string
  default?: string
  description: string
}

export type ApiPart = {
  name: string
  description?: string
  props: PropDoc[]
}

export type ExampleDoc = {
  /** File name in `examples/` without extension. */
  file: string
  title: string
  description?: string
  /** Render in an iframe of this height (px) — for full-page demos like Sidebar. */
  iframe?: number
}

export type Group =
  | "Nền tảng"
  | "Biểu mẫu"
  | "Hiển thị dữ liệu"
  | "Điều hướng"
  | "Lớp phủ"
  | "Phản hồi"
  | "Hội thoại"
  | "Tiện ích"

export type ComponentDoc = {
  slug: string
  name: string
  group: Group
  runtime: Runtime
  /** One or two sentences, Vietnamese. */
  description: string
  /** Import line(s) shown on the page. */
  imports: string
  /** Underlying primitive, e.g. "Base UI Dialog". */
  primitive?: { label: string; href: string }
  /** Path under https://ui.shadcn.com/docs/components/base/ */
  shadcn?: string
  /** Extra npm packages this component relies on (already dependencies of the library). */
  uses?: string[]
  examples: ExampleDoc[]
  api?: ApiPart[]
  notes?: string[]
}

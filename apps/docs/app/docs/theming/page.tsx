import type { Metadata } from "next"

import { CodeBlock } from "@/components/code-block"
import { Article, Code, H2, P, PageHeader } from "@/components/prose"

export const metadata: Metadata = { title: "Theme & token" }

const colorGroups: { title: string; tokens: { name: string; value: string; note: string }[] }[] = [
  {
    title: "Bề mặt",
    tokens: [
      { name: "background", value: "#191b24", note: "Nền trang (canvas)" },
      { name: "sunken", value: "#0f111a", note: "Vùng lõm, sidebar, khối code" },
      { name: "card", value: "#202331", note: "Thẻ" },
      { name: "modal", value: "#202331", note: "Dialog, sheet, tooltip" },
      { name: "card-nested", value: "#282b3a", note: "Bề mặt lồng, popover" },
      { name: "card-layered", value: "#3e435c", note: "Lớp nổi thứ ba" },
      { name: "popover", value: "#191b24", note: "Menu, select" },
      { name: "muted", value: "#2f3346", note: "Nền phụ (slate)" },
    ],
  },
  {
    title: "Hành động & thương hiệu",
    tokens: [
      { name: "primary", value: "#8b5cf6", note: "Tím — nút mặc định, ô đã chọn" },
      { name: "brand", value: "#ffd875", note: "Vàng — golden, trạng thái đang bật, focus" },
      { name: "brand-muted", value: "#ffde8a", note: "Vàng dịu" },
      { name: "accent", value: "#282b3a", note: "Nền hàng đang trỏ" },
      { name: "accent-foreground", value: "#ffd875", note: "Chữ hàng đang trỏ" },
      { name: "secondary", value: "rgb(170 170 170 / .2)", note: "Nút secondary" },
    ],
  },
  {
    title: "Chữ",
    tokens: [
      { name: "heading", value: "#ffffff", note: "Tiêu đề (ink)" },
      { name: "foreground", value: "#f1f1f1", note: "Chữ thân (body)" },
      { name: "muted-foreground", value: "#aaaaaa", note: "Chữ phụ (secondary)" },
      { name: "tertiary", value: "#535d8e", note: "Chữ mờ, placeholder" },
    ],
  },
  {
    title: "Trạng thái & đường nét",
    tokens: [
      { name: "success", value: "oklch(.78 .15 152)", note: "Thành công" },
      { name: "warning", value: "#ffd875", note: "Cảnh báo" },
      { name: "destructive", value: "#f85f5f", note: "Lỗi, xoá" },
      { name: "info", value: "#8b5cf6", note: "Thông tin" },
      { name: "border", value: "#2f3346", note: "Đường viền" },
      { name: "input", value: "rgb(170 170 170 / .3)", note: "Viền ô nhập" },
      { name: "field", value: "rgb(255 255 255 / .1)", note: "Nền ô nhập" },
      { name: "ring", value: "#ffd875", note: "Viền focus" },
    ],
  },
]

const typeScale = [
  { name: "display", spec: "32 / 40 · 800" },
  { name: "h1", spec: "28 / 36 · 700" },
  { name: "h3", spec: "20 / 25 · 800" },
  { name: "h2", spec: "18 / 28 · 700" },
  { name: "link", spec: "16 / 24" },
  { name: "control", spec: "15 / 22.5 — ô nhập" },
  { name: "subtitle", spec: "14 / 20 — chữ thân" },
  { name: "button", spec: "13 / 19.5" },
  { name: "caption", spec: "12 / 16" },
  { name: "micro", spec: "11 / 15" },
]

const typeClass: Record<string, string> = {
  display: "text-display",
  h1: "text-h1",
  h3: "text-h3",
  h2: "text-h2",
  link: "text-link",
  control: "text-control",
  subtitle: "text-subtitle",
  button: "text-button",
  caption: "text-caption",
  micro: "text-micro",
}

const radii = [
  { cls: "rounded-xs", px: "3px" },
  { cls: "rounded-sm", px: "4px" },
  { cls: "rounded-md", px: "8px" },
  { cls: "rounded-lg", px: "12px" },
  { cls: "rounded-xl", px: "16px" },
]

const shadows = ["shadow-raised", "shadow-elevated", "shadow-floating", "shadow-glow", "shadow-focus"]

export default function ThemingPage() {
  return (
    <Article>
      <PageHeader
        title="Theme & token"
        lead="Token màu mang tên biến của shadcn/ui nên mọi công thức shadcn đều dùng được, còn giá trị là bảng màu FrameON. Thêm vài vai trò riêng của FrameON: brand, heading, modal, tertiary…"
      />

      {colorGroups.map((group) => (
        <section key={group.title} className="flex flex-col gap-3">
          <H2>{group.title}</H2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {group.tokens.map((t) => (
              <div key={t.name} className="overflow-hidden rounded-md border border-border bg-card">
                <div className="h-14 border-b border-border" style={{ background: `var(--${t.name})` }} />
                <div className="flex flex-col gap-0.5 p-3">
                  <span className="font-mono text-caption text-heading">{t.name}</span>
                  <span className="font-mono text-micro text-tertiary">{t.value}</span>
                  <span className="text-micro text-muted-foreground">{t.note}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}

      <H2>Thang chữ</H2>
      <P>
        Mỗi cỡ chữ mang sẵn line-height (và độ đậm với tiêu đề). Dùng như class Tailwind: <Code>text-caption</Code>,{" "}
        <Code>text-h1</Code>… Cỡ chữ của ô nhập tên là <Code>text-control</Code> để không trùng với màu{" "}
        <Code>text-input</Code> của shadcn.
      </P>
      <div className="flex flex-col divide-y divide-border rounded-md border border-border bg-card">
        {typeScale.map((t) => (
          <div key={t.name} className="flex items-baseline gap-4 px-4 py-3">
            <span className="w-24 shrink-0 font-mono text-caption text-brand-muted">text-{t.name}</span>
            <span className={`${typeClass[t.name]} min-w-0 flex-1 truncate text-heading`}>Xem phim không giới hạn</span>
            <span className="hidden shrink-0 font-mono text-micro text-tertiary sm:block">{t.spec}</span>
          </div>
        ))}
      </div>

      <H2>Bo góc</H2>
      <P>
        Suy ra từ <Code>--radius</Code> (mặc định 12px) để đổi một chỗ là cả thang đổi theo.
      </P>
      <div className="flex flex-wrap gap-4">
        {radii.map((r) => (
          <div key={r.cls} className="flex flex-col items-center gap-2">
            <div className={`${r.cls} size-16 border border-brand/60 bg-brand/12`} />
            <span className="font-mono text-micro text-muted-foreground">
              {r.cls} · {r.px}
            </span>
          </div>
        ))}
      </div>

      <H2>Độ nổi</H2>
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-5">
        {shadows.map((s) => (
          <div key={s} className="flex flex-col items-center gap-3">
            <div className={`${s} size-16 rounded-md bg-card-nested`} />
            <span className="font-mono text-micro text-muted-foreground">{s}</span>
          </div>
        ))}
      </div>

      <H2>Đổi theme</H2>
      <P>Ghi đè biến CSS sau khi nhập FrameUI — mọi component đọc lại ngay, không cần build lại thư viện.</P>
      <CodeBlock
        lang="css"
        title="app/globals.css"
        code={`@import "tailwindcss";
@import "@hwagfu/frameui/styles.css";

:root {
  --primary: #e11d48;        /* nút mặc định đỏ hồng */
  --brand: #22d3ee;          /* thương hiệu xanh ngọc */
  --accent-foreground: #22d3ee;
  --ring: #22d3ee;
  --radius: 1rem;            /* bo góc rộng hơn cho cả thang */
}`}
      />
      <P>
        Khi tự gộp class, dùng <Code>cn()</Code> từ <Code>@hwagfu/frameui/utils</Code>: tailwind-merge trong đó đã biết thang
        chữ và bóng của FrameON, nên <Code>cn(&quot;text-caption&quot;, &quot;text-brand&quot;)</Code> giữ cả cỡ chữ lẫn màu.
      </P>
    </Article>
  )
}

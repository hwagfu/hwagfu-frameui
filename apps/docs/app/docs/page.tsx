import Link from "next/link"
import { ArrowRight, Boxes, Palette, Server } from "lucide-react"

import { Button } from "@hwagfu/frameui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@hwagfu/frameui/card"

import { CodeBlock } from "@/components/code-block"
import { Article, Code, H2, List, P, PageHeader } from "@/components/prose"
import { docs } from "@/lib/registry"

const features = [
  {
    icon: Boxes,
    title: "Đủ bộ shadcn/ui",
    text: `${docs.length} component — từ Button tới Sidebar, Data Table, Chart, Questionnaire — với đúng API của shadcn (bản Base UI).`,
  },
  {
    icon: Palette,
    title: "Giữ nguyên style FrameON",
    text: "Nền tối, tím chủ đạo, vàng thương hiệu, thang chữ 11–32px, bo góc 4/8/12px, bóng nổi và hiệu ứng “pop”.",
  },
  {
    icon: Server,
    title: "Server Component trước tiên",
    text: `${docs.filter((d) => d.runtime === "server").length} component không gửi byte JavaScript nào; phần còn lại chỉ gửi đúng primitive tương tác.`,
  },
]

export default function IntroductionPage() {
  return (
    <Article>
      <PageHeader
        title="FrameUI"
        lead="Thư viện component của FrameON: toàn bộ component shadcn/ui được may lại theo giao diện FrameON, không còn code chay, tối ưu cho React Server Components."
      />
      <div className="flex flex-wrap gap-3">
        <Button variant="golden" nativeButton={false} render={<Link href="/docs/installation" />}>
          Cài đặt <ArrowRight data-icon="inline-end" />
        </Button>
        <Button variant="secondary" nativeButton={false} render={<Link href="/docs/components" />}>
          Xem component
        </Button>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        {features.map((f) => (
          <Card key={f.title} variant="elevated" size="sm" className="[--card-spacing:--spacing(5)]">
            <CardHeader>
              <f.icon className="mb-2 size-5 text-brand" />
              <CardTitle className="text-subtitle font-bold">{f.title}</CardTitle>
              <CardDescription>{f.text}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>

      <H2>Hai gói, một ngôn ngữ thiết kế</H2>
      <List>
        <li>
          <Code>@hwagfu/frameui</Code> — web (React 19, Tailwind CSS v4), nền tảng shadcn/ui + Base UI. Tài liệu bạn đang đọc.
        </li>
        <li>
          <Code>@hwagfu/frameui-native</Code> — React Native trên HeroUI Native + Uniwind, cùng bảng màu, theo API của
          HeroUI Native. (Giai đoạn 2.)
        </li>
      </List>

      <H2>Trông như thế nào khi dùng</H2>
      <P>
        API giống hệt shadcn/ui: component ghép (compound), prop <Code>variant</Code> / <Code>size</Code>, prop{" "}
        <Code>render</Code> của Base UI để đổi phần tử gốc. Khác biệt nằm ở cách lấy mã: import từ gói, hoặc chép mã nguồn vào
        dự án bằng{" "}
        <Link href="/docs/shadcn" className="text-brand">
          shadcn CLI
        </Link>
        .
      </P>
      <CodeBlock
        code={`import { Button } from "@hwagfu/frameui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@hwagfu/frameui/card"

// Đây là Server Component — trang không tải thêm JavaScript nào cho đoạn này.
export default function Page() {
  return (
    <Card variant="promo">
      <CardHeader>
        <CardTitle>Trở thành thành viên VIP</CardTitle>
      </CardHeader>
      <CardContent>
        <Button variant="golden" className="rounded-full">Nâng cấp</Button>
      </CardContent>
    </Card>
  )
}`}
      />

      <H2>Nguyên tắc</H2>
      <List>
        <li>
          <b className="text-heading">API theo shadcn.</b> Thêm vào chứ không đổi: các biến thể riêng của FrameON (
          <Code>golden</Code>, <Code>promo</Code>, <Code>elevated</Code>…) nằm cạnh biến thể gốc của shadcn.
        </li>
        <li>
          <b className="text-heading">Style theo FrameON.</b> Token màu dùng tên biến của shadcn (<Code>--primary</Code>,{" "}
          <Code>--accent</Code>…) nên mọi công thức shadcn đều chạy, nhưng giá trị là bảng màu FrameON.
        </li>
        <li>
          <b className="text-heading">Không gửi JavaScript khi không cần.</b> Xem{" "}
          <Link href="/docs/server-components" className="text-brand">
            Server Components
          </Link>
          .
        </li>
      </List>
    </Article>
  )
}

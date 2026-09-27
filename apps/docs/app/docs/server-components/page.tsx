import type { Metadata } from "next"
import Link from "next/link"

import { CodeBlock } from "@/components/code-block"
import { Article, Code, H2, List, P, PageHeader } from "@/components/prose"
import { RuntimeBadge, runtimeInfo } from "@/components/runtime-badge"
import { docs } from "@/lib/registry"
import type { Runtime } from "@/lib/types"

export const metadata: Metadata = { title: "Server Components" }

const order: Runtime[] = ["server", "island", "client"]

export default function ServerComponentsPage() {
  return (
    <Article>
      <PageHeader
        title="Server Components"
        lead="Mặc định mọi thứ chạy trên máy chủ. Chỉ phần thật sự cần state, sự kiện hay API trình duyệt mới xuống client — và luôn nằm ở lá của cây."
      />

      <H2>Ba loại component</H2>
      <div className="flex flex-col gap-3">
        {order.map((runtime) => (
          <div key={runtime} className="flex items-start gap-3 rounded-md border border-border bg-card p-4">
            <RuntimeBadge runtime={runtime} />
            <P className="text-muted-foreground">{runtimeInfo[runtime].hint}</P>
          </div>
        ))}
      </div>

      <H2>Vì sao wrapper chạy được trên server</H2>
      <List>
        <li>
          Mỗi module lá của Base UI tự khai <Code>&quot;use client&quot;</Code>, còn namespace như <Code>Dialog</Code>,{" "}
          <Code>Menu</Code> thì không. Wrapper của FrameUI không khai chỉ thị nào, nên nó chạy trên server và ghép các
          phần client (<Code>Dialog.Popup</Code>, <Code>Menu.Item</Code>…) lại — class, cva và tailwind-merge ở lại máy
          chủ, trình duyệt chỉ nhận primitive.
        </li>
        <li>
          shadcn bản Base UI dựng Badge, Breadcrumb, Item… bằng hook <Code>useRender</Code>, khiến chúng thành Client
          Component. FrameUI dùng một helper <Code>renderElement</Code> không hook, giữ nguyên hợp đồng của prop{" "}
          <Code>render</Code> — nên các component đó vẫn là HTML tĩnh.
        </li>
        <li>
          Button là <Code>&lt;button&gt;</Code> thuần thay vì Base UI Button; Separator là <Code>&lt;div&gt;</Code> với đúng
          thuộc tính ARIA; icon nội bộ là SVG tĩnh thay vì <Code>lucide-react</Code> (vốn là client vì đọc context).
        </li>
        <li>
          Khi cần hành vi, phần client được tách thành lá rất nhỏ: InputGroup chỉ gửi đoạn “bấm vào phần phụ thì focus ô
          nhập”, Sidebar chỉ gửi Provider/Trigger/Rail/MenuButton.
        </li>
      </List>

      <H2>Quy tắc khi dùng</H2>
      <List>
        <li>
          Truyền hàm (<Code>onClick</Code>, <Code>onValueChange</Code>, children dạng hàm của Combobox…) chỉ được từ Client
          Component — giới hạn chung của React Server Components.
        </li>
        <li>
          <Code>render={"{<Link href=\"/\" />}"}</Code> dùng được ngay trong Server Component: phần tử được render trên
          server rồi Base UI clone nó ở client.
        </li>
        <li>
          Ưu tiên import theo đường dẫn con (<Code>@hwagfu/frameui/button</Code>) để bundler thấy đúng ranh giới client.
        </li>
      </List>
      <CodeBlock
        code={`// app/page.tsx — Server Component, không có "use client"
import { Button } from "@hwagfu/frameui/button"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@hwagfu/frameui/dialog"

export default function Page() {
  return (
    <Dialog>
      {/* Button render trên server; chỉ Base UI Dialog là client */}
      <DialogTrigger render={<Button variant="golden" />}>Nâng cấp</DialogTrigger>
      <DialogContent variant="promo">
        <DialogTitle>Trở thành VIP</DialogTitle>
      </DialogContent>
    </Dialog>
  )
}`}
      />

      <H2>Toàn bộ component</H2>
      {order.map((runtime) => {
        const list = docs.filter((d) => d.runtime === runtime).sort((a, b) => a.name.localeCompare(b.name))
        return (
          <section key={runtime} className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <RuntimeBadge runtime={runtime} />
              <span className="text-caption text-tertiary">{list.length} component</span>
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              {list.map((d) => (
                <Link key={d.slug} href={`/docs/components/${d.slug}`} className="text-subtitle text-foreground no-underline hover:text-brand">
                  {d.name}
                </Link>
              ))}
            </div>
          </section>
        )
      })}
    </Article>
  )
}

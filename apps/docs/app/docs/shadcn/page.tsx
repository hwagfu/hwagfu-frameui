import type { Metadata } from "next"
import { headers } from "next/headers"
import Link from "next/link"
import { CircleAlert } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@hwagfu/frameui/alert"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@hwagfu/frameui/table"

import { CodeBlock } from "@/components/code-block"
import { Article, Code, H2, List, P, PageHeader } from "@/components/prose"
import { NAMESPACE, registriesConfig, shadcnAdd } from "@/lib/shadcn"

export const metadata: Metadata = { title: "Cài bằng shadcn CLI" }

const comparison = [
  ["Mã component", "Nằm trong node_modules, chỉ import", "Chép vào components/ui, sửa thoải mái"],
  ["Lấy component", "pnpm add @hwagfu/frameui (cả bộ)", `shadcn add ${NAMESPACE}/<tên> (từng cái)`],
  ["Cập nhật", "pnpm up @hwagfu/frameui", "shadcn add … --diff rồi --overwrite"],
  ["Token", "Mỗi lần cài, kể cả trên Vercel/CI", "Chỉ lúc chạy CLI; build không cần"],
]

/** The registry lives on this site, so the snippets use the address the reader is on. */
async function siteOrigin() {
  const h = await headers()
  const host = h.get("x-forwarded-host") ?? h.get("host") ?? "localhost:3100"
  const proto = h.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https")
  return `${proto}://${host}`
}

export default async function ShadcnPage() {
  const origin = await siteOrigin()

  return (
    <Article>
      <PageHeader
        title="Cài bằng shadcn CLI"
        lead="Cách thứ hai để dùng FrameUI: chép mã nguồn component vào dự án bằng shadcn add, giống shadcn/ui. Gói npm @hwagfu/frameui vẫn dùng như cũ."
      />

      <H2>Chọn cách nào?</H2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead />
            <TableHead>Gói npm</TableHead>
            <TableHead>shadcn CLI</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {comparison.map(([label, npm, cli]) => (
            <TableRow key={label}>
              <TableCell className="font-medium text-heading">{label}</TableCell>
              <TableCell className="whitespace-normal">{npm}</TableCell>
              <TableCell className="whitespace-normal">{cli}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <P>
        Hai cách cho ra cùng component, cùng API, cùng giao diện: registry được sinh từ chính mã nguồn của gói. Mỗi dự án
        chỉ nên dùng một cách, nếu không sẽ có hai bản component và hai bản CSS chồng lên nhau.
      </P>

      <H2>1. Chuẩn bị dự án</H2>
      <P>
        Dự án cần Tailwind CSS v4 và file <Code>components.json</Code> của shadcn. Chưa có thì chạy:
      </P>
      <CodeBlock lang="bash" code="pnpm dlx shadcn@latest init" />
      <P>
        Giữ <Code>cssVariables: true</Code> (mặc định): theme FrameON nằm trong biến CSS.
      </P>

      <H2>2. Khai báo registry {NAMESPACE}</H2>
      <P>
        Registry nằm trên trang docs này và cần token như gói npm (lấy ở trang{" "}
        <Link href="/docs/access" className="text-brand">
          Truy cập &amp; token
        </Link>
        ). Thêm vào <Code>components.json</Code>:
      </P>
      <CodeBlock lang="json" title="components.json" code={registriesConfig(origin)} />
      <P>
        Rồi đặt token vào <Code>.env.local</Code> ở thư mục gốc dự án. CLI tự đọc file này; đừng commit nó.
      </P>
      <CodeBlock lang="bash" title=".env.local" code="FRAMEUI_TOKEN=<token>" />

      <H2>3. Cài theme (một lần)</H2>
      <CodeBlock lang="bash" code={shadcnAdd("theme")} />
      <List>
        <li>
          Ghi bảng màu FrameON vào <Code>:root</Code> và <Code>.dark</Code> (FrameON chỉ có giao diện tối), token chữ, bo góc,
          bóng, animation vào <Code>@theme inline</Code>, cùng variant, utility và style nền vào file CSS khai báo ở{" "}
          <Code>tailwind.css</Code> của <Code>components.json</Code>.
        </li>
        <li>
          Thay <Code>lib/utils.ts</Code> bằng <Code>cn()</Code> biết thang chữ FrameON (cùng chữ ký với bản của shadcn). CLI hỏi
          ghi đè thì chọn có; nếu bạn đã thêm hàm khác vào file đó, chép lại sau.
        </li>
        <li>
          Font Be Vietnam Pro: làm như mục 3 ở trang{" "}
          <Link href="/docs/installation" className="text-brand">
            Cài đặt
          </Link>{" "}
          (biến <Code>--font-be-vietnam</Code>).
        </li>
      </List>

      <H2>4. Thêm component</H2>
      <CodeBlock lang="bash" code={shadcnAdd("button", "dialog")} />
      <P>
        Component phụ thuộc nhau được kéo theo, gói npm cần thiết (Base UI, cva…) được cài luôn. File rơi vào{" "}
        <Code>components/ui/</Code>, các helper của FrameON vào <Code>lib/frameui/</Code>, hook vào <Code>hooks/</Code>. Mỗi
        trang component có sẵn lệnh của nó. Xem hoặc tìm trong registry:
      </P>
      <CodeBlock
        lang="bash"
        code={`pnpm dlx shadcn@latest list ${NAMESPACE}
pnpm dlx shadcn@latest search ${NAMESPACE} --query date
pnpm dlx shadcn@latest view ${NAMESPACE}/button`}
      />

      <H2>5. Dùng</H2>
      <P>Import từ thư mục của dự án thay vì từ gói; API giữ nguyên.</P>
      <CodeBlock
        code={`import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog"`}
      />

      <H2>Cập nhật</H2>
      <P>Khi FrameUI có bản mới, xem khác biệt rồi mới ghi đè (ghi đè sẽ mất phần bạn đã sửa):</P>
      <CodeBlock
        lang="bash"
        code={`pnpm dlx shadcn@latest add ${NAMESPACE}/button --diff
pnpm dlx shadcn@latest add ${NAMESPACE}/button --overwrite`}
      />

      <P>
        Muốn trợ lý AI (Claude Code, Cursor…) tự tìm và cài component? Xem{" "}
        <Link href="/docs/mcp" className="text-brand">
          MCP cho trợ lý AI
        </Link>
        .
      </P>

      <Alert variant="info">
        <CircleAlert />
        <AlertTitle>Deploy không cần token</AlertTitle>
        <AlertDescription>
          Mã đã nằm trong repo, nên Vercel/CI build như dự án bình thường. Token chỉ cần ở máy chạy shadcn CLI.
        </AlertDescription>
      </Alert>
    </Article>
  )
}

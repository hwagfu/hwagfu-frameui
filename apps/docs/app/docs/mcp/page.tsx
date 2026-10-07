import type { Metadata } from "next"
import Link from "next/link"
import { CircleAlert } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@hwagfu/frameui/alert"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@hwagfu/frameui/table"

import { CodeBlock } from "@/components/code-block"
import { Article, Code, H2, List, P, PageHeader } from "@/components/prose"
import { NAMESPACE } from "@/lib/shadcn"

export const metadata: Metadata = { title: "MCP cho trợ lý AI" }

const clients = [
  ["Claude Code", "claude", ".mcp.json"],
  ["Cursor", "cursor", ".cursor/mcp.json"],
  ["VS Code (Copilot)", "vscode", ".vscode/mcp.json"],
  ["OpenCode", "opencode", "opencode.json"],
  ["Codex", "codex", "~/.codex/config.toml — lệnh in sẵn đoạn cần chép"],
]

const MCP_JSON = `{
  "mcpServers": {
    "shadcn": {
      "command": "npx",
      "args": ["shadcn@latest", "mcp"]
    }
  }
}`

const prompts = [
  `Liệt kê các component trong registry ${NAMESPACE}.`,
  `Tìm trong ${NAMESPACE} cách hiển thị thẻ phim có điểm và nhãn VIP, rồi thêm vào dự án.`,
  `Xem ví dụ poster-card-top10 của ${NAMESPACE} và dựng dải Top 10 cho trang chủ bằng dữ liệu trong lib/data.ts.`,
  `Dùng LogoSpinner của ${NAMESPACE} làm app/loading.tsx và LogoLost cho app/not-found.tsx.`,
]

const AGENTS_MD = `## Giao diện
- Component lấy từ registry shadcn ${NAMESPACE} (FrameUI). Trước khi tự viết component,
  tìm trong ${NAMESPACE} qua MCP server shadcn.
- Cài bằng \`pnpm dlx shadcn@latest add ${NAMESPACE}/<tên>\`, import từ \`@/components/ui/<tên>\`.
- Màu và chữ dùng token FrameON (bg-background, text-heading, text-brand, text-caption…),
  không viết màu cứng.`

export default function McpPage() {
  return (
    <Article>
      <PageHeader
        title="MCP cho trợ lý AI"
        lead={`Cho Claude Code, Cursor, VS Code, Codex hay OpenCode tự tìm, xem và cài component FrameUI: MCP server của shadcn đọc thẳng registry ${NAMESPACE}.`}
      />

      <H2>1. Chuẩn bị</H2>
      <P>
        Dự án cần khai báo registry {NAMESPACE} và token như bước 1–2 của trang{" "}
        <Link href="/docs/shadcn" className="text-brand">
          Cài bằng shadcn CLI
        </Link>
        . MCP server đọc <Code>components.json</Code> và <Code>.env.local</Code> của dự án, nên không cần cấu hình gì
        thêm cho FrameUI.
      </P>

      <H2>2. Bật MCP server</H2>
      <P>Chạy ở thư mục gốc dự án, chọn client đang dùng:</P>
      <CodeBlock lang="bash" code="pnpm dlx shadcn@latest mcp init --client claude" />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Client</TableHead>
            <TableHead>--client</TableHead>
            <TableHead>File cấu hình</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clients.map(([label, flag, file]) => (
            <TableRow key={flag}>
              <TableCell className="font-medium text-heading">{label}</TableCell>
              <TableCell>
                <Code>{flag}</Code>
              </TableCell>
              <TableCell className="whitespace-normal">{file}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <P>
        Lệnh ghi file cấu hình và cài <Code>shadcn</Code> làm devDependency. Với Claude Code, file trông như sau:
      </P>
      <CodeBlock lang="json" title=".mcp.json" code={MCP_JSON} />
      <P>
        Khởi động lại client. Trong Claude Code, gõ <Code>/mcp</Code> để thấy server <Code>shadcn</Code> đã kết nối.
      </P>

      <H2>3. Trợ lý làm được gì</H2>
      <List>
        <li>
          Liệt kê và tìm trong {NAMESPACE}: theme, mọi component, helper và toàn bộ ví dụ của trang docs này.
        </li>
        <li>Xem mã nguồn, gói npm cần cài và các component phụ thuộc của từng mục.</li>
        <li>
          Tìm ví dụ: mỗi ví dụ trên docs có trong registry dưới tên file của nó (<Code>button-demo</Code>,{" "}
          <Code>poster-card-top10</Code>…), import đúng kiểu dự án (<Code>@/components/ui/…</Code>).
        </li>
        <li>
          Đưa ra lệnh <Code>shadcn add</Code> rồi chạy, kèm danh sách kiểm tra sau khi cài.
        </li>
      </List>

      <H2>Câu lệnh mẫu</H2>
      <List>
        {prompts.map((prompt) => (
          <li key={prompt}>“{prompt}”</li>
        ))}
      </List>

      <H2>Nhắc trợ lý dùng FrameUI</H2>
      <P>
        Thêm vài dòng vào <Code>CLAUDE.md</Code>, <Code>AGENTS.md</Code> hoặc rule của Cursor để trợ lý tìm trong FrameUI
        trước khi tự viết component:
      </P>
      <CodeBlock lang="md" title="CLAUDE.md / AGENTS.md" code={AGENTS_MD} />

      <Alert variant="info">
        <CircleAlert />
        <AlertTitle>Công cụ báo lỗi 401?</AlertTitle>
        <AlertDescription>
          Token trong .env.local thiếu hoặc sai. Lấy lại ở trang Truy cập &amp; token, lưu file rồi khởi động lại client để
          MCP server đọc lại.
        </AlertDescription>
      </Alert>
    </Article>
  )
}

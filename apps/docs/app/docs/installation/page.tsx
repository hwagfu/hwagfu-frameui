import type { Metadata } from "next"
import Link from "next/link"

import { Alert, AlertDescription, AlertTitle } from "@hwagfu/frameui/alert"

import { CodeBlock } from "@/components/code-block"
import { Article, Code, H2, List, P, PageHeader } from "@/components/prose"

export const metadata: Metadata = { title: "Cài đặt" }

export default function InstallationPage() {
  return (
    <Article>
      <PageHeader
        title="Cài đặt"
        lead="Thêm token của nhóm, cài gói, nhập một file CSS, rồi import component."
      />

      <H2>1. Cài gói</H2>
      <P>
        FrameUI là gói riêng tư trên GitHub Packages. Làm theo trang{" "}
        <Link href="/docs/access" className="text-brand">
          Truy cập &amp; token
        </Link>{" "}
        trước: lưu token vào biến <Code>FRAMEUI_TOKEN</Code> và thêm <Code>.npmrc</Code> vào dự án. Sau đó:
      </P>
      <CodeBlock lang="bash" code="pnpm add @hwagfu/frameui" />
      <P>
        Peer dependency: <Code>react</Code> và <Code>react-dom</Code> 19.2+, <Code>tailwindcss</Code> v4. Base UI và các thư
        viện phụ (recharts, cmdk, react-day-picker…) được cài kèm.
      </P>
      <CodeBlock lang="bash" code="pnpm add -D tailwindcss @tailwindcss/postcss" />

      <H2>2. Nhập CSS</H2>
      <P>
        Trong file CSS gốc của ứng dụng, nhập Tailwind rồi tới FrameUI. File này mang theo token màu, thang chữ, bo góc,
        bóng, animation, và báo cho Tailwind quét class trong thư viện (<Code>@source</Code>).
      </P>
      <CodeBlock
        lang="css"
        title="app/globals.css"
        code={`@import "tailwindcss";
@import "@hwagfu/frameui/styles.css";`}
      />
      <List>
        <li>
          <Code>styles.css</Code> = token + style nền (nền trang, màu chữ, focus vàng, màu bôi chọn).
        </li>
        <li>
          <Code>theme.css</Code> = chỉ token, không đụng tới thẻ HTML — dùng khi gắn FrameUI vào một trang đã có style
          nền riêng.
        </li>
      </List>

      <H2>3. Font Be Vietnam Pro</H2>
      <P>
        Theme đọc biến <Code>--font-be-vietnam</Code> (rồi lùi về font hệ thống). Với Next.js:
      </P>
      <CodeBlock
        title="app/layout.tsx"
        code={`import { Be_Vietnam_Pro } from "next/font/google"
import "./globals.css"

const beVietnam = Be_Vietnam_Pro({
  variable: "--font-be-vietnam",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800"],
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={beVietnam.variable}>
      <body>{children}</body>
    </html>
  )
}`}
      />

      <H2>4. Dùng component</H2>
      <P>
        Mỗi component có đường import riêng — cách được khuyên dùng, vì giữ ranh giới <Code>&quot;use client&quot;</Code>{" "}
        nhỏ nhất có thể:
      </P>
      <CodeBlock
        code={`import { Button } from "@hwagfu/frameui/button"
import { Dialog, DialogContent, DialogTrigger } from "@hwagfu/frameui/dialog"`}
      />
      <P>
        Barrel <Code>@hwagfu/frameui</Code> cũng có (trừ <Code>sonner</Code>, vì trùng tên <Code>Toaster</Code> với Toast
        của Base UI). Hàm <Code>cn()</Code> đã biết thang token FrameON nằm ở <Code>@hwagfu/frameui/utils</Code>.
      </P>

      <H2>5. Thông báo (tuỳ chọn)</H2>
      <CodeBlock
        title="app/layout.tsx"
        code={`import { Toaster } from "@hwagfu/frameui/sonner"

// …trong <body>
<Toaster />

// …ở bất cứ đâu (Client Component, event handler, server action callback)
import { toast } from "sonner"
toast.success("Đã lưu")`}
      />

      <Alert variant="info">
        <AlertTitle>Vite, Remix, TanStack Start…</AlertTitle>
        <AlertDescription>
          Không có gì dành riêng cho Next.js: thư viện là ESM với các chỉ thị &quot;use client&quot; chuẩn. Với Vite, dùng{" "}
          <Code>@tailwindcss/vite</Code> thay cho PostCSS và nhập đúng hai dòng CSS ở trên.
        </AlertDescription>
      </Alert>
    </Article>
  )
}

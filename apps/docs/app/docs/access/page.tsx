import type { Metadata } from "next"
import { CircleAlert, KeyRound } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@hwagfu/frameui/alert"

import { CodeBlock } from "@/components/code-block"
import { Article, Code, H2, List, P, PageHeader } from "@/components/prose"
import { SecretField } from "@/components/secret-field"
import { requireSession } from "@/lib/session"

export const metadata: Metadata = { title: "Truy cập & token" }

const NPMRC = `@hwagfu:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=\${FRAMEUI_TOKEN}`

export default async function AccessPage() {
  await requireSession("/docs/access")
  const token = process.env.FRAMEUI_REGISTRY_TOKEN

  return (
    <Article>
      <PageHeader
        title="Truy cập & token"
        lead="FrameUI là gói riêng tư trên GitHub Packages. Máy nào muốn cài thư viện cần token dưới đây."
      />

      <H2>1. Token</H2>
      {token ? (
        <div className="flex flex-col gap-3">
          <SecretField value={token} label="Token cài đặt FrameUI" />
          <List>
            <li>
              Token chỉ có quyền <Code>read:packages</Code>: tải gói về được, không sửa hay publish được.
            </li>
            <li>Không commit token vào git, không gửi ra ngoài nhóm đồ án.</li>
          </List>
        </div>
      ) : (
        <Alert variant="warning">
          <CircleAlert />
          <AlertTitle>Chưa có token</AlertTitle>
          <AlertDescription>
            Đặt biến FRAMEUI_REGISTRY_TOKEN trong Environment Variables của project docs trên Vercel rồi deploy lại.
          </AlertDescription>
        </Alert>
      )}

      <H2>2. Lưu token vào biến môi trường</H2>
      <P>
        Thay <Code>&lt;token&gt;</Code> bằng token ở trên. macOS / Linux (zsh):
      </P>
      <CodeBlock lang="bash" code={`echo 'export FRAMEUI_TOKEN=<token>' >> ~/.zshrc && source ~/.zshrc`} />
      <P>Windows (PowerShell), mở lại terminal sau khi chạy:</P>
      <CodeBlock lang="bash" code={`setx FRAMEUI_TOKEN "<token>"`} />

      <H2>3. Thêm .npmrc vào dự án</H2>
      <P>
        Đặt file này ở thư mục gốc dự án dùng FrameUI. File chỉ tham chiếu tên biến, không chứa token, nên commit
        được.
      </P>
      <CodeBlock lang="bash" title=".npmrc" code={NPMRC} />

      <H2>4. Cài thư viện</H2>
      <CodeBlock lang="bash" code="pnpm add @hwagfu/frameui" />
      <P>
        Sau đó làm tiếp phần CSS và font ở trang <Code>Cài đặt</Code>.
      </P>

      <H2>5. Khi deploy (Vercel, CI)</H2>
      <P>
        Thêm biến <Code>FRAMEUI_TOKEN</Code> với cùng giá trị vào Environment Variables của dự án được deploy.
        Bước cài gói trên server đọc <Code>.npmrc</Code> và lấy token từ biến đó.
      </P>

      <Alert>
        <KeyRound />
        <AlertTitle>Token bị lộ?</AlertTitle>
        <AlertDescription>
          Thu hồi token ở GitHub → Settings → Developer settings → Personal access tokens, tạo token mới rồi cập nhật
          FRAMEUI_REGISTRY_TOKEN trên Vercel.
        </AlertDescription>
      </Alert>
    </Article>
  )
}

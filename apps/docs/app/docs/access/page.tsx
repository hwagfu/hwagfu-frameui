import type { Metadata } from "next"
import { CircleAlert, KeyRound } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@hwagfu/frameui/alert"

import { CodeBlock } from "@/components/code-block"
import { Article, Code, H2, List, P, PageHeader } from "@/components/prose"
import { SecretField } from "@/components/secret-field"
import { requireSession } from "@/lib/session"

export const metadata: Metadata = { title: "Truy cập & token" }

const NPMRC = "@hwagfu:registry=https://npm.pkg.github.com"

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

      <H2>2. Lưu token vào máy</H2>
      <P>
        Làm một lần cho mỗi máy. Bấm nút sao chép ở trên, rồi chạy lệnh ứng với hệ điều hành. Token được ghi vào{" "}
        <Code>~/.npmrc</Code> của máy, không nằm trong dự án. macOS:
      </P>
      <CodeBlock lang="bash" code={'npm config set //npm.pkg.github.com/:_authToken "$(pbpaste)"'} />
      <P>Windows (PowerShell):</P>
      <CodeBlock lang="bash" code="npm config set //npm.pkg.github.com/:_authToken (Get-Clipboard)" />
      <P>
        Linux: thay <Code>&lt;token&gt;</Code> bằng token ở trên.
      </P>
      <CodeBlock lang="bash" code="npm config set //npm.pkg.github.com/:_authToken <token>" />
      <P>Kiểm tra: lệnh sau in ra tên tài khoản GitHub là được.</P>
      <CodeBlock lang="bash" code="npm whoami --registry=https://npm.pkg.github.com" />

      <H2>3. Thêm .npmrc vào dự án</H2>
      <P>
        Đặt file này ở thư mục gốc repo, cạnh <Code>pnpm-lock.yaml</Code>. File không chứa token nên commit được.
      </P>
      <CodeBlock lang="bash" title=".npmrc" code={NPMRC} />
      <Alert variant="info">
        <CircleAlert />
        <AlertTitle>Đừng ghi token vào .npmrc của dự án</AlertTitle>
        <AlertDescription>
          pnpm 11 bỏ qua dòng <Code>{"_authToken=${BIẾN}"}</Code> trong file này vì lý do bảo mật, còn token viết thẳng
          vào sẽ lộ theo git. Token chỉ nằm ở <Code>~/.npmrc</Code> của từng máy.
        </AlertDescription>
      </Alert>

      <H2>4. Cài thư viện</H2>
      <CodeBlock lang="bash" code="pnpm add @hwagfu/frameui" />
      <P>
        Sau đó làm tiếp phần CSS và font ở trang <Code>Cài đặt</Code>.
      </P>

      <H2>5. Khi deploy lên Vercel</H2>
      <P>Server build của Vercel không có token của máy bạn, nên cần đưa token vào trước bước cài:</P>
      <List>
        <li>
          <strong>Settings → Environment Variables</strong>: thêm <Code>FRAMEUI_TOKEN</Code> bằng token ở trên, tích
          Production và Preview.
        </li>
        <li>
          <strong>Settings → Build and Deployment → Install Command</strong>: bật Override, nhập lệnh dưới đây.
        </li>
        <li>Deploy lại.</li>
      </List>
      <CodeBlock
        lang="bash"
        title="Install Command"
        code={'npm config set //npm.pkg.github.com/:_authToken "$FRAMEUI_TOKEN" && pnpm install'}
      />
      <P>
        GitHub Actions hay CI khác làm y hệt: lưu token thành secret <Code>FRAMEUI_TOKEN</Code>, rồi chạy lệnh trên thay
        cho <Code>pnpm install</Code>.
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

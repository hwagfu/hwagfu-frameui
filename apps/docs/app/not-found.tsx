import Link from "next/link"

import { Button } from "@hwagfu/frameui/button"
import { LogoLost } from "@hwagfu/frameui/logo"

export default function NotFound() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-5 px-4 text-center">
      <LogoLost />
      <h1 className="m-0 text-h1 text-heading">Không tìm thấy trang</h1>
      <p className="m-0 max-w-sm text-subtitle text-muted-foreground">
        Trang này không có, hoặc đã đổi địa chỉ. Thử tìm bằng ⌘K, hoặc quay lại tài liệu.
      </p>
      <Button variant="golden" className="rounded-full" nativeButton={false} render={<Link href="/docs" />}>
        Về trang tài liệu
      </Button>
    </main>
  )
}

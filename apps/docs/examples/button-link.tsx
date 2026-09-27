import Link from "next/link"

import { Button } from "@hwagfu/frameui/button"

export default function ButtonLink() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="golden" nativeButton={false} render={<Link href="/docs" />}>
        Tới trang tài liệu
      </Button>
      <Button disabled>Không khả dụng</Button>
      <Button variant="secondary" className="w-60">
        Rộng cố định
      </Button>
    </div>
  )
}

import { LogoSpinner } from "@hwagfu/frameui/logo"

/** Shown while a docs page streams in. A Server Component, so it is in the first HTML. */
export default function Loading() {
  return (
    <div role="status" className="flex min-h-[50dvh] flex-col items-center justify-center gap-3">
      <LogoSpinner />
      <span className="text-caption text-muted-foreground">Đang tải…</span>
    </div>
  )
}

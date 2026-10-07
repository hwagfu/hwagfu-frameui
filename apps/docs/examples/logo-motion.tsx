import { LogoLost, LogoSpinner } from "@hwagfu/frameui/logo"

export default function LogoMotion() {
  return (
    <div className="flex flex-wrap items-end justify-center gap-16">
      <div role="status" className="flex flex-col items-center gap-3">
        <LogoSpinner />
        <span className="text-caption text-muted-foreground">Đang tải phim…</span>
      </div>
      <div className="flex flex-col items-center gap-3">
        <LogoLost size={72} label="Không tìm thấy" />
        <span className="text-caption text-muted-foreground">404 · Không tìm thấy</span>
      </div>
    </div>
  )
}

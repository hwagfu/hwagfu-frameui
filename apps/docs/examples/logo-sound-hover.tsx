import { Wordmark } from "@hwagfu/frameui/logo"
import { LogoSound } from "@hwagfu/frameui/logo-sound"

export default function LogoSoundHover() {
  return (
    <header className="flex h-14 w-full max-w-2xl items-center justify-between rounded-lg border border-border bg-card px-4">
      <LogoSound cue="framex-hover" trigger="hover">
        <Wordmark variant="framex" size={20} shine="hover" flare="hover" render={<a href="#" aria-label="FrameX — trang chủ" />} />
      </LogoSound>
      <nav className="flex gap-5 text-caption text-muted-foreground">
        <a href="#" className="no-underline hover:text-heading">
          Phim
        </a>
        <a href="#" className="no-underline hover:text-heading">
          Phim bộ
        </a>
      </nav>
    </header>
  )
}

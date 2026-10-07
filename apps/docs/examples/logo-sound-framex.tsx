import { Wordmark } from "@hwagfu/frameui/logo"
import { LogoSound } from "@hwagfu/frameui/logo-sound"

export default function LogoSoundFramex() {
  return (
    <div className="flex w-full flex-col items-center gap-4">
      <div className="grid h-72 w-full place-items-center rounded-xl border border-border bg-[radial-gradient(60%_80%_at_50%_50%,#17140e,var(--sunken)_70%)]">
        {/* Plays silently on load; a click replays picture and sound together. */}
        <LogoSound cue="framex-intro">
          <Wordmark variant="framex" size={64} entrance="intro" shine flare glow />
        </LogoSound>
      </div>
      <p className="m-0 text-caption text-muted-foreground">Bấm vào logo để phát lại kèm âm thanh. Đeo tai nghe để nghe âm vòm và dải trầm.</p>
    </div>
  )
}

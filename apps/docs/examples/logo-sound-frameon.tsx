import { Wordmark } from "@hwagfu/frameui/logo"
import { LogoSound } from "@hwagfu/frameui/logo-sound"

export default function LogoSoundFrameon() {
  return (
    <div className="flex flex-col items-center gap-4">
      <LogoSound cue="frameon-intro">
        <Wordmark size={40} entrance="intro" />
      </LogoSound>
      <p className="m-0 text-caption text-muted-foreground">Bấm vào logo để phát lại kèm âm thanh.</p>
    </div>
  )
}

import { LogoSpinner, Wordmark } from "@hwagfu/frameui/logo"
import { LogoSound } from "@hwagfu/frameui/logo-sound"

const effects = [
  { code: "shine", note: "Vệt sáng lướt qua logo rồi qua chữ, nghỉ, lặp lại.", logo: <Wordmark variant="framex" shine /> },
  { code: "flare", note: "Đốm sáng lóe lần lượt ở góc trên, góc dưới, chữ X.", logo: <Wordmark variant="framex" flare /> },
  {
    code: "shine flare",
    note: "Lóe ở nơi vệt sáng rời khỏi kim loại.",
    logo: <Wordmark variant="framex" shine flare />,
  },
  { code: "glow", note: "Ánh vàng ấm thở chậm sau logo và quanh chữ X.", logo: <Wordmark variant="framex" glow /> },
  {
    code: 'shine="hover" flare="hover"',
    note: "Đứng yên; rê chuột vào thì sáng một lần. Hợp với header.",
    logo: <Wordmark variant="framex" shine="hover" flare="hover" />,
  },
  {
    code: 'entrance="reveal"',
    note: "Góc khung vẽ ra, nút play đáp xuống, chữ khép lại. Bấm để xem lại.",
    logo: (
      <LogoSound cue="framex-reveal">
        <Wordmark variant="framex" entrance="reveal" />
      </LogoSound>
    ),
  },
]

export default function LogoFramexEffects() {
  return (
    <div className="grid w-full max-w-3xl gap-3 sm:grid-cols-2">
      {effects.map(({ code, note, logo }) => (
        <div key={code} className="flex flex-col gap-5 rounded-lg border border-border p-5">
          <div className="flex h-16 items-center justify-center">{logo}</div>
          <div className="flex flex-col gap-1">
            <code className="text-caption text-heading">{code}</code>
            <span className="text-caption text-muted-foreground">{note}</span>
          </div>
        </div>
      ))}
      <div className="flex flex-col gap-5 rounded-lg border border-border p-5 sm:col-span-2 sm:flex-row sm:items-center">
        <div className="flex h-16 items-center justify-center sm:w-40">
          <LogoSpinner variant="framex" label="Đang tải" />
        </div>
        <div className="flex flex-col gap-1">
          <code className="text-caption text-heading">{'<LogoSpinner variant="framex" />'}</code>
          <span className="text-caption text-muted-foreground">Vòng xoay của FrameON, đúc bằng vàng.</span>
        </div>
      </div>
    </div>
  )
}

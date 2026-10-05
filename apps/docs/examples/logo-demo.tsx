import { LogoMark, Wordmark } from "@hwagfu/frameui/logo"

export default function LogoDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-10">
      <Wordmark />
      <Wordmark size={16} />
      <Wordmark size={32} mark={false} />
      <LogoMark size={48} />
    </div>
  )
}

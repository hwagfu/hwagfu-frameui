import { LogoMark, Wordmark } from "@hwagfu/frameui/logo"

export default function LogoFramex() {
  return (
    <div className="flex flex-col items-center gap-10">
      <div className="flex flex-wrap items-center justify-center gap-10">
        <Wordmark variant="framex" />
        <Wordmark variant="framex" size={16} />
        <Wordmark variant="framex" size={32} mark={false} />
        <LogoMark variant="framex" size={48} />
      </div>
      {/* Same `size`, same mark: the two tiers swap in a header without anything moving. */}
      <div className="flex flex-wrap items-center justify-center gap-10 border-t border-border pt-8">
        <Wordmark />
        <Wordmark variant="framex" />
      </div>
    </div>
  )
}

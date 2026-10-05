import { Clapperboard } from "lucide-react"

import { AgeChip, LangChip, MetaChip, OutlineChip, ScoreChip } from "@hwagfu/frameui/media-chip"

export default function MediaChipDemo() {
  return (
    <div className="flex w-full max-w-lg flex-col gap-5 rounded-md bg-linear-to-br from-[oklch(0.34_0.06_140)] to-[oklch(0.30_0.04_255)] p-6">
      <div className="flex flex-wrap items-center gap-2">
        <ScoreChip value={4.6} />
        <ScoreChip value={8.9} size="md" />
        <MetaChip variant="sub">Vietsub</MetaChip>
        <MetaChip>1g 45p</MetaChip>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <AgeChip rating="K" />
        <AgeChip rating="T13" />
        <AgeChip rating="T16" size="md" />
        <AgeChip rating="T18" size="lg" />
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <LangChip kind="pd" count={24} />
        <LangChip kind="tm" count={18} />
        <LangChip kind="lt" count={6} />
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <OutlineChip>2024</OutlineChip>
        <OutlineChip variant="gold">FHD 1080p</OutlineChip>
        <OutlineChip render={<a href="#" />}>
          <Clapperboard /> Hoạt hình
        </OutlineChip>
      </div>
    </div>
  )
}

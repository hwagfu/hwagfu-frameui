import { Badge } from "@hwagfu/frameui/badge"
import { LangChip, MetaChip, ScoreChip } from "@hwagfu/frameui/media-chip"
import { PosterArt } from "@hwagfu/frameui/poster-art"
import {
  PosterCard,
  PosterCardDescription,
  PosterCardFooter,
  PosterCardHeader,
  PosterCardMedia,
  PosterCardProgress,
  PosterCardTitle,
} from "@hwagfu/frameui/poster-card"

export default function PosterCardDemo() {
  return (
    <div className="grid w-full max-w-xl grid-cols-3 gap-4">
      <PosterCard render={<a href="#" />}>
        <PosterCardMedia>
          <PosterArt lines={["sin", "tel"]} background="oklch(0.30 0.05 215)" color="oklch(0.89 0.06 200)" textSize={34} studio="Blender Foundation" />
          <PosterCardHeader>
            <Badge>Song ngữ</Badge>
            <ScoreChip value={4.6} className="ml-auto" />
          </PosterCardHeader>
          <PosterCardFooter>
            <MetaChip variant="sub">Vietsub</MetaChip>
            <MetaChip>14 phút</MetaChip>
          </PosterCardFooter>
          <PosterCardProgress value={42} />
        </PosterCardMedia>
        <PosterCardTitle>Sintel</PosterCardTitle>
        <PosterCardDescription>2010 · Hoạt hình, Phiêu lưu</PosterCardDescription>
      </PosterCard>

      <PosterCard render={<a href="#" />}>
        <PosterCardMedia>
          <PosterArt lines={["cosmos", "laundromat"]} background="oklch(0.31 0.07 340)" color="oklch(0.88 0.07 350)" textSize={15} studio="Blender Institute" />
          <PosterCardHeader>
            <Badge variant="golden">VIP</Badge>
            <ScoreChip value={4.2} className="ml-auto" />
          </PosterCardHeader>
          <PosterCardFooter>
            <LangChip kind="pd" count={6} />
            <LangChip kind="tm" count={4} />
          </PosterCardFooter>
        </PosterCardMedia>
        <PosterCardTitle>Cosmos Laundromat</PosterCardTitle>
        <PosterCardDescription>Phần 1 · Tập 6</PosterCardDescription>
      </PosterCard>

      <PosterCard render={<a href="#" />}>
        <PosterCardMedia>
          <PosterArt variant="classic" lines={["elephants", "dream"]} background="oklch(0.32 0.06 50)" color="oklch(0.89 0.06 60)" textSize={13} studio="Blender Foundation" />
          <PosterCardHeader>
            <ScoreChip value={4.0} className="ml-auto" />
          </PosterCardHeader>
          <PosterCardFooter>
            <MetaChip>11 phút</MetaChip>
          </PosterCardFooter>
        </PosterCardMedia>
        <PosterCardTitle>Elephants Dream</PosterCardTitle>
        <PosterCardDescription>2006 · Viễn tưởng, Tâm lý</PosterCardDescription>
      </PosterCard>
    </div>
  )
}

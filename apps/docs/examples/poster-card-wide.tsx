import { Badge } from "@hwagfu/frameui/badge"
import { LangChip, ScoreChip } from "@hwagfu/frameui/media-chip"
import { PosterArt } from "@hwagfu/frameui/poster-art"
import {
  PosterCard,
  PosterCardFooter,
  PosterCardHeader,
  PosterCardMedia,
  PosterCardProgress,
  PosterCardTitle,
} from "@hwagfu/frameui/poster-card"

export default function PosterCardWide() {
  return (
    <PosterCard render={<a href="#" />} className="max-w-sm">
      <PosterCardMedia ratio="wide">
        <PosterArt ratio="wide" lines={["tears", "of steel"]} background="oklch(0.30 0.04 255)" color="oklch(0.87 0.04 240)" textSize={20} />
        <PosterCardHeader>
          <Badge variant="golden">VIP</Badge>
          <ScoreChip value={4.3} className="ml-auto" />
        </PosterCardHeader>
        <PosterCardFooter>
          <PosterCardTitle>Tears of Steel</PosterCardTitle>
          <div className="flex gap-1">
            <LangChip kind="pd" count={12} />
            <LangChip kind="lt" count={3} />
          </div>
        </PosterCardFooter>
        <PosterCardProgress value={70} />
      </PosterCardMedia>
    </PosterCard>
  )
}

import { Badge } from "@hwagfu/frameui/badge"
import { AgeChip } from "@hwagfu/frameui/media-chip"
import { PosterArt } from "@hwagfu/frameui/poster-art"
import { PosterCard, PosterCardDescription, PosterCardHeader, PosterCardMedia, PosterCardTitle } from "@hwagfu/frameui/poster-card"
import { RankNumber } from "@hwagfu/frameui/rank-list"

const films = [
  { name: "Big Buck Bunny", sub: "Hoạt hình · Hài", lines: ["big", "buck", "bunny"], c1: "oklch(0.34 0.06 140)", c2: "oklch(0.90 0.07 130)", size: 22, age: "K", meta: "10 phút" },
  { name: "Sintel", sub: "Hoạt hình · Phiêu lưu", lines: ["sin", "tel"], c1: "oklch(0.30 0.05 215)", c2: "oklch(0.89 0.06 200)", size: 34, age: "T13", meta: "14 phút" },
  { name: "Cosmos Laundromat", sub: "Viễn tưởng · Hài", lines: ["cosmos", "laundromat"], c1: "oklch(0.31 0.07 340)", c2: "oklch(0.88 0.07 350)", size: 15, age: "T16", meta: "Đủ 6 tập", vip: true },
  { name: "Tears of Steel", sub: "Viễn tưởng · Hành động", lines: ["tears", "of steel"], c1: "oklch(0.30 0.04 255)", c2: "oklch(0.87 0.04 240)", size: 20, age: "T18", meta: "12 phút" },
] as const

/** Top 10: posters turned left / right in turn, big rank numbers underneath. */
export default function PosterCardTop10() {
  return (
    <div className="grid w-full grid-cols-2 gap-x-6 gap-y-8 px-2 py-3 sm:grid-cols-4">
      {films.map((film, i) => (
        <PosterCard key={film.name} render={<a href="#" />}>
          <PosterCardMedia tilt={i % 2 === 0 ? "left" : "right"}>
            <PosterArt lines={[...film.lines]} background={film.c1} color={film.c2} textSize={film.size} />
            <PosterCardHeader>{"vip" in film ? <Badge variant="golden">VIP</Badge> : null}</PosterCardHeader>
          </PosterCardMedia>
          <div className="mt-2 flex items-start gap-3">
            <RankNumber rank={i + 1} size="lg" />
            <div className="min-w-0 pt-0.5">
              <PosterCardTitle className="font-bold text-heading">{film.name}</PosterCardTitle>
              <PosterCardDescription>{film.sub}</PosterCardDescription>
              <div className="mt-1.5 flex items-center gap-1.5 text-micro text-muted-foreground">
                <AgeChip rating={film.age} />
                <span className="truncate">{film.meta}</span>
              </div>
            </div>
          </div>
        </PosterCard>
      ))}
    </div>
  )
}

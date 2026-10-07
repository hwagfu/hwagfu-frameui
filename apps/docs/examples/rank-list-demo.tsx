import { Flame } from "lucide-react"

import { Card } from "@hwagfu/frameui/card"
import { PosterArt } from "@hwagfu/frameui/poster-art"
import {
  RankList,
  RankListContent,
  RankListDescription,
  RankListItem,
  RankListMedia,
  RankListTitle,
} from "@hwagfu/frameui/rank-list"

const films = [
  { name: "Big Buck Bunny", views: "25.610", genre: "Hoạt hình", lines: ["big", "buck"], c1: "oklch(0.34 0.06 140)", c2: "oklch(0.90 0.07 130)" },
  { name: "Sintel", views: "18.432", genre: "Hoạt hình", lines: ["sin", "tel"], c1: "oklch(0.30 0.05 215)", c2: "oklch(0.89 0.06 200)" },
  { name: "Tears of Steel", views: "14.208", genre: "Viễn tưởng", lines: ["tears"], c1: "oklch(0.30 0.04 255)", c2: "oklch(0.87 0.04 240)" },
  { name: "Cosmos Laundromat", views: "11.840", genre: "Viễn tưởng", lines: ["cos", "mos"], c1: "oklch(0.31 0.07 340)", c2: "oklch(0.88 0.07 350)" },
  { name: "Elephants Dream", views: "9.302", genre: "Tâm lý", lines: ["ele"], c1: "oklch(0.32 0.06 50)", c2: "oklch(0.89 0.06 60)" },
]

export default function RankListDemo() {
  return (
    <Card className="w-full max-w-sm gap-0 py-0">
      <div className="flex items-center gap-2 border-b border-border px-4 py-3">
        <Flame className="size-4 text-brand" />
        <span className="text-h2 text-heading">Top 10 tuần này</span>
      </div>
      <RankList>
        {films.map((film, i) => (
          <RankListItem key={film.name} rank={i + 1} render={<a href="#" />}>
            <RankListMedia>
              <PosterArt lines={film.lines} background={film.c1} color={film.c2} textSize={34} />
            </RankListMedia>
            <RankListContent>
              <RankListTitle>{film.name}</RankListTitle>
              <RankListDescription>
                {film.views} lượt xem · {film.genre}
              </RankListDescription>
            </RankListContent>
          </RankListItem>
        ))}
      </RankList>
    </Card>
  )
}

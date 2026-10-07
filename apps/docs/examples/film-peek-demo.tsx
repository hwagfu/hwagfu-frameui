import { Heart, Info, Play } from "lucide-react"

import { Badge } from "@hwagfu/frameui/badge"
import { Button } from "@hwagfu/frameui/button"
import {
  FilmPeek,
  FilmPeekActions,
  FilmPeekBody,
  FilmPeekDescription,
  FilmPeekGenres,
  FilmPeekHeader,
  FilmPeekMedia,
  FilmPeekMeta,
  FilmPeekRating,
  FilmPeekSynopsis,
  FilmPeekTitle,
} from "@hwagfu/frameui/film-peek"
import { AgeChip } from "@hwagfu/frameui/media-chip"
import { PosterArt } from "@hwagfu/frameui/poster-art"
import { PosterCard, PosterCardDescription, PosterCardMedia, PosterCardTitle } from "@hwagfu/frameui/poster-card"

type Film = {
  id: string
  title: string
  tagline: string
  year: number
  rating: number
  age: "K" | "T13" | "T16" | "T18"
  meta: string
  genres: string[]
  synopsis: string
  vip?: boolean
  art: { lines: string[]; background: string; color: string; textSize: number }
}

const films: Film[] = [
  {
    id: "sintel",
    title: "Sintel",
    tagline: "Đi tìm chú rồng nhỏ",
    year: 2010,
    rating: 4.6,
    age: "T13",
    meta: "14 phút",
    genres: ["Hoạt hình", "Phiêu lưu"],
    synopsis:
      "Sintel băng qua vùng đất khắc nghiệt để tìm lại chú rồng nhỏ Scales. Phim ngắn mở đầu cho chuẩn mực hoạt hình 3D nguồn mở của Blender.",
    art: { lines: ["sin", "tel"], background: "oklch(0.30 0.05 215)", color: "oklch(0.89 0.06 200)", textSize: 34 },
  },
  {
    id: "cosmos",
    title: "Cosmos Laundromat",
    tagline: "Mọi cuộc đời bạn muốn",
    year: 2015,
    rating: 4.2,
    age: "T16",
    meta: "Phần 1 · Tập 6",
    genres: ["Viễn tưởng", "Hài"],
    synopsis:
      "Chú cừu chán đời Franck gặp gã bán hàng bí ẩn chào mời “mọi cuộc đời bạn muốn”. Tập mở đầu dự án Gooseberry.",
    vip: true,
    art: { lines: ["cosmos", "laundromat"], background: "oklch(0.31 0.07 340)", color: "oklch(0.88 0.07 350)", textSize: 15 },
  },
  {
    id: "tears-of-steel",
    title: "Tears of Steel",
    tagline: "Amsterdam, một ký ức định mệnh",
    year: 2012,
    rating: 4.3,
    age: "T13",
    meta: "12 phút",
    genres: ["Viễn tưởng", "Hành động"],
    synopsis:
      "Nhóm chiến binh và nhà khoa học cố tái hiện một ký ức định mệnh giữa Amsterdam tương lai để cứu thế giới khỏi người máy.",
    art: { lines: ["tears", "of steel"], background: "oklch(0.30 0.04 255)", color: "oklch(0.87 0.04 240)", textSize: 20 },
  },
]

/** Panel of one film — rendered here, on the server, and handed to `FilmPeek`. */
function Peek({ film }: { film: Film }) {
  return (
    <>
      <FilmPeekMedia render={<a href="#" />}>
        <PosterArt ratio="wide" {...film.art} />
        {film.vip ? (
          <Badge variant="golden" className="absolute top-2 left-2">
            VIP
          </Badge>
        ) : null}
      </FilmPeekMedia>
      <FilmPeekBody>
        <FilmPeekActions>
          <Button variant="golden" size="icon-lg" aria-label={`Xem ${film.title}`} nativeButton={false} render={<a href="#" />}>
            <Play className="fill-current" />
          </Button>
          <Button variant="outline" size="icon-lg" aria-label="Thêm vào danh sách">
            <Heart />
          </Button>
          <Button variant="outline" size="icon-lg" aria-label="Chi tiết" nativeButton={false} render={<a href="#" />}>
            <Info />
          </Button>
        </FilmPeekActions>
        <FilmPeekHeader render={<a href="#" />}>
          <FilmPeekTitle>{film.title}</FilmPeekTitle>
          <FilmPeekDescription>{film.tagline}</FilmPeekDescription>
        </FilmPeekHeader>
        <FilmPeekMeta>
          <FilmPeekRating value={film.rating} />
          <AgeChip rating={film.age} />
          <span>{film.year}</span>
          <span>·</span>
          <span className="truncate">{film.meta}</span>
        </FilmPeekMeta>
        <FilmPeekSynopsis>{film.synopsis}</FilmPeekSynopsis>
        <FilmPeekGenres>{film.genres.join(" · ")}</FilmPeekGenres>
      </FilmPeekBody>
    </>
  )
}

export default function FilmPeekDemo() {
  return (
    <>
      <div className="grid w-full max-w-xl grid-cols-3 gap-4">
        {films.map((film) => (
          <PosterCard key={film.id} data-peek={film.id} render={<a href="#" />}>
            <PosterCardMedia>
              <PosterArt {...film.art} />
            </PosterCardMedia>
            <PosterCardTitle>{film.title}</PosterCardTitle>
            <PosterCardDescription>
              {film.year} · {film.genres.join(", ")}
            </PosterCardDescription>
          </PosterCard>
        ))}
      </div>
      {/* One per page: it serves every card with a matching `data-peek`. */}
      <FilmPeek panels={Object.fromEntries(films.map((film) => [film.id, <Peek key={film.id} film={film} />]))} />
    </>
  )
}

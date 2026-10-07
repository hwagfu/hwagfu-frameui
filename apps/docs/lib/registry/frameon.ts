import type { ComponentDoc } from "../types"
import { classNameProp, renderProp, restProp } from "./shared"

const sizeProp = (fallback: number) => ({
  name: "size",
  type: "number",
  default: String(fallback),
  description: "Cạnh của hình, tính bằng px.",
})

const labelProp = (fallback?: string) => ({
  name: "label",
  type: "string",
  ...(fallback ? { default: `"${fallback}"` } : {}),
  description:
    "Tên đọc cho trình đọc màn hình. Bỏ trống (hoặc `\"\"`) thì hình là trang trí, ví dụ khi chữ bên cạnh đã ghi tên.",
})

/** Pieces of FrameON's own look that shadcn has no equivalent for. */
export const frameon: ComponentDoc[] = [
  {
    slug: "logo",
    name: "Logo",
    group: "FrameON",
    runtime: "server",
    description:
      "Logo FrameON: hai góc khung phim và nút play vàng. Một bộ nét duy nhất dựng ra mark tĩnh, wordmark, biểu tượng chờ và mark trang 404 — sửa logo là sửa đúng một chỗ.",
    imports: 'import { LogoLost, LogoMark, LogoSpinner, Wordmark } from "@hwagfu/frameui/logo"',
    examples: [
      { file: "logo-demo", title: "Mark và wordmark", description: "`Wordmark` co giãn theo `size` (cỡ chữ); mark và khoảng cách đi theo." },
      {
        file: "logo-motion",
        title: "Đang tải và 404",
        description:
          "`LogoSpinner`: khung quay nửa vòng mỗi nhịp, nút play thở theo. `LogoLost`: hai góc chớp so le, nút play tuột khỏi chỗ và lắc lư. Thuần SVG + CSS, tự tắt khi hệ điều hành bật giảm chuyển động.",
      },
    ],
    api: [
      { name: "LogoMark", props: [sizeProp(30), labelProp("FrameON"), classNameProp, restProp("svg")] },
      { name: "LogoSpinner", props: [sizeProp(48), labelProp(), classNameProp, restProp("svg")] },
      { name: "LogoLost", props: [sizeProp(96), labelProp(), classNameProp, restProp("svg")] },
      {
        name: "Wordmark",
        props: [
          { name: "size", type: "number", default: "24", description: "Cỡ chữ (px). Mark = size × 1.24, khoảng cách = size × 0.34." },
          { name: "mark", type: "boolean", default: "true", description: "Hiện mark trước tên." },
          { name: "children", type: "ReactNode", default: "Frame<ON>", description: "Thay tên, ví dụ docs này dùng `Frame<span className=\"text-brand\">UI</span>`." },
          renderProp,
          classNameProp,
        ],
      },
    ],
    notes: [
      "Màu: góc khung theo `currentColor` (mặc định `text-heading`), nút play luôn `fill-brand`. Đổi màu khung bằng `className=\"text-…\"`.",
      "Trang chờ của Next.js: `app/loading.tsx` trả về `<LogoSpinner label=\"Đang tải\" />` — là Server Component nên hiện ngay trong HTML đầu tiên. Trang 404: `app/not-found.tsx` với `LogoLost`.",
      "`LogoSpinner` cùng cỡ và chiếm cùng chỗ với `LogoMark` có cùng `size`, nên thay nhau được mà bố cục không xê dịch. Khi quay, góc khung vẽ tràn ra ngoài khung khoảng 6,7% `size` mỗi cạnh (3px ở cỡ 48): đừng đặt sát mép một khối `overflow-hidden`.",
      "Favicon nên là file riêng (viewBox ôm sát, nét dày hơn) vì ở 16px nét 2.6 quá mảnh.",
    ],
  },
  {
    slug: "poster-art",
    name: "Poster Art",
    group: "FrameON",
    runtime: "server",
    description:
      "Nền poster của FrameON. Chưa có ảnh thì dựng poster bằng chữ theo đúng bảng màu của phim; có ảnh thì ảnh phủ lên, lớp chữ vẫn nằm dưới nên ảnh lỗi vẫn còn nền tử tế. Mọi cỡ chữ tính theo `cqw` nên tự co giãn trong mọi ô.",
    imports: 'import { PosterArt } from "@hwagfu/frameui/poster-art"',
    examples: [{ file: "poster-art-demo", title: "Modern, classic và khung ngang" }],
    api: [
      {
        name: "PosterArt",
        description: "Lấp đầy khối cha (`absolute inset-0`): đặt trong `PosterCardMedia`, `AspectRatio` hoặc khối `relative` bất kỳ.",
        props: [
          { name: "lines", type: "string[]", description: "Các dòng chữ của poster." },
          { name: "background", type: "string", description: "Màu nền (c1 của FrameON)." },
          { name: "color", type: "string", description: "Màu mực của chữ (c2)." },
          { name: "variant", type: '"modern" | "classic"', default: '"modern"', description: "`modern`: chữ thường đậm, sát. `classic`: in hoa, giãn, có khung viền trong." },
          { name: "textSize", type: "number", default: "20", description: "Cỡ chữ theo `cqw` (phần trăm bề rộng poster)." },
          { name: "ratio", type: '"poster" | "wide"', default: '"poster"', description: "`wide` (16:9) căn trái và giảm nửa cỡ chữ." },
          { name: "studio", type: "string", description: "Dòng ghi công ở chân poster dọc." },
          { name: "big", type: "boolean", default: "false", description: "Khung lớn (hero): dòng ghi công nhỏ và thấp hơn." },
          { name: "dim", type: "boolean", default: "false", description: "Làm mờ 20%." },
          { name: "children", type: "ReactNode", description: "Ảnh thật (`<img>`, `<Image fill>`…), phủ lên lớp chữ. `<img>` con trực tiếp được kéo phủ kín." },
          classNameProp,
        ],
      },
    ],
  },
  {
    slug: "poster-card",
    name: "Poster Card",
    group: "FrameON",
    runtime: "server",
    description:
      "Thẻ phim của FrameON: poster có nhãn ở trên, chip ở chân, vạch tiến độ xem, rồi tên phim và chú thích. Cùng một khung cho thẻ dọc 2:3, thẻ ngang 16:9 và poster nghiêng 3D của Top 10.",
    imports:
      'import { PosterCard, PosterCardDescription, PosterCardFooter, PosterCardHeader, PosterCardMedia, PosterCardProgress, PosterCardTitle } from "@hwagfu/frameui/poster-card"',
    examples: [
      { file: "poster-card-demo", title: "Thẻ dọc", description: "Rê chuột: tên phim chuyển vàng. Thẻ đầu có vạch tiến độ xem." },
      { file: "poster-card-wide", title: "Thẻ ngang (backdrop)", description: "`ratio=\"wide\"`: tên phim nằm trong lớp chân poster, phía trên các chip." },
      { file: "poster-card-top10", title: "Top 10", description: "`tilt` xoay poster 14° trong không gian 3D, so le trái/phải; số hạng lớn là `RankNumber size=\"lg\"`." },
    ],
    api: [
      { name: "PosterCard", props: [renderProp, classNameProp, restProp("div")] },
      {
        name: "PosterCardMedia",
        props: [
          { name: "ratio", type: '"poster" | "wide"', default: '"poster"', description: "2:3 cho dải và lưới, 16:9 cho dải “mới cập nhật”." },
          { name: "tilt", type: '"left" | "right"', description: "Kiểu Top 10: poster nghiêng, phía xa tối dần." },
          classNameProp,
          restProp("div"),
        ],
      },
      { name: "PosterCardHeader", description: "Hàng nhãn phủ mép trên. Đẩy điểm sang phải bằng `className=\"ml-auto\"`.", props: [classNameProp, restProp("div")] },
      { name: "PosterCardFooter", description: "Lớp chân poster trên nền tối dần; chip căn phải. Trong thẻ `wide` xếp dọc: tên phim rồi chip.", props: [classNameProp, restProp("div")] },
      { name: "PosterCardProgress", props: [{ name: "value", type: "number", description: "Phần trăm đã xem, 0–100." }, classNameProp] },
      { name: "PosterCardTitle · PosterCardDescription", props: [classNameProp, restProp("div")] },
    ],
    notes: [
      "Thẻ là Server Component: cả thẻ nằm sẵn trong HTML đầu tiên. Dải cuộn ngang có nút trái/phải: đặt các thẻ vào `Carousel`.",
      "Ảnh thật: đặt `<img>` (hoặc `<Image fill>` của Next) làm con của `PosterArt`, hoặc thẳng vào `PosterCardMedia` nếu không cần poster dự phòng.",
    ],
  },
  {
    slug: "media-chip",
    name: "Media Chip",
    group: "FrameON",
    runtime: "server",
    description:
      "Bộ chip nhỏ đè lên poster, hero và bảng xếp hạng: điểm sao, nhãn độ tuổi, meta (Vietsub, thời lượng), ngôn ngữ kèm số tập (PĐ / TM / LT) và chip viền mảnh.",
    imports: 'import { AgeChip, LangChip, MetaChip, OutlineChip, ScoreChip } from "@hwagfu/frameui/media-chip"',
    examples: [{ file: "media-chip-demo", title: "Các loại chip" }],
    api: [
      { name: "ScoreChip", props: [{ name: "value", type: "number", description: "Điểm, hiện một chữ số thập phân." }, { name: "size", type: '"sm" | "md"', default: '"sm"', description: "10px hoặc 11px." }, classNameProp] },
      { name: "AgeChip", props: [{ name: "rating", type: '"K" | "T13" | "T16" | "T18"', description: "K lục · T13 vàng · T16 cam · T18 đỏ (token `age-*`)." }, { name: "size", type: '"sm" | "md" | "lg"', default: '"sm"', description: "Cỡ chữ 10 / 11 / 13px." }, classNameProp] },
      { name: "MetaChip", props: [{ name: "variant", type: '"default" | "sub"', default: '"default"', description: "`sub`: nền tím, dùng cho phụ đề." }, classNameProp, restProp("span")] },
      { name: "LangChip", props: [{ name: "kind", type: '"pd" | "tm" | "lt"', description: "Phụ đề (tím) · thuyết minh (vàng) · lồng tiếng (trắng)." }, { name: "count", type: "ReactNode", description: "Số tập có ngôn ngữ này." }, classNameProp] },
      { name: "OutlineChip", props: [{ name: "variant", type: '"default" | "gold"', default: '"default"', description: "Viền trắng mờ hoặc viền vàng." }, renderProp, classNameProp, restProp("span")] },
    ],
    notes: ["Chip có nền tối trong suốt vì sinh ra để đè lên ảnh. Khi là liên kết (`render={<a />}`), `OutlineChip` chuyển vàng lúc rê chuột."],
  },
  {
    slug: "rank-list",
    name: "Rank List",
    group: "FrameON",
    runtime: "server",
    description: "Bảng xếp hạng dạng danh sách — “Top 10 tuần này”: số hạng (vàng cho top 3), ảnh nhỏ, tên và lượt xem. Kèm `RankNumber` cho số hạng lớn dưới poster Top 10.",
    imports:
      'import { RankList, RankListContent, RankListDescription, RankListItem, RankListMedia, RankListTitle, RankNumber } from "@hwagfu/frameui/rank-list"',
    examples: [{ file: "rank-list-demo", title: "Top 10 tuần này", description: "Đặt trong `Card` cho đúng khung bảng của FrameON." }],
    api: [
      { name: "RankList", props: [classNameProp, restProp("ol")] },
      { name: "RankListItem", props: [{ name: "rank", type: "number", description: "Số hạng hiện đầu dòng." }, renderProp, classNameProp] },
      { name: "RankListMedia", description: "Ảnh nhỏ 30×44: chứa `PosterArt` hoặc `<img>`.", props: [classNameProp] },
      { name: "RankListContent · RankListTitle · RankListDescription", props: [classNameProp, restProp("span")] },
      {
        name: "RankNumber",
        props: [
          { name: "rank", type: "number", description: "Số hạng." },
          { name: "size", type: '"sm" | "lg"', default: '"sm"', description: "`lg`: 34–46px cho Top 10." },
          { name: "highlight", type: "boolean", default: "rank <= 3", description: "Tô vàng." },
          classNameProp,
        ],
      },
    ],
  },
]

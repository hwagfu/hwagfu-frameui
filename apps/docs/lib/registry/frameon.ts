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

const variantProp = {
  name: "variant",
  type: '"frameon" | "framex"',
  default: '"frameon"',
  description: "`framex`: logo vàng của gói hội viên cao cấp FrameX.",
}

const entranceProp = {
  name: "entrance",
  type: '"intro" | "reveal"',
  description:
    "Chạy một lần khi logo xuất hiện. FrameON chỉ có `intro` (2,3 giây: góc khung vẽ ra, nút play đáp xuống, chữ trượt vào, ON bật sáng). FrameX: `reveal` (1,6 giây) hoặc `intro` — reveal sau 1,2 giây ánh sáng tụ lại, có cú nện: bùng sáng, sóng xung kích, rung nhẹ. Âm thanh: Logo Sound.",
}

const framexProps = [
  {
    name: "shine",
    type: 'boolean | "hover"',
    description: "FrameX. Vệt sáng lướt qua mark rồi qua chữ, 5,5 giây một lần. `\"hover\"`: một lần khi rê chuột vào.",
  },
  {
    name: "flare",
    type: 'boolean | "hover"',
    description:
      "FrameX. Đốm sáng lóe như kim loại bắt sáng: cùng `shine` thì lóe ở góc dưới rồi chữ X, nơi vệt sáng rời đi; một mình thì lần lượt góc trên, góc dưới, chữ X, 4,2 giây một lần.",
  },
  { name: "glow", type: "boolean", description: "FrameX. Ánh vàng ấm thở chậm sau mark và quanh chữ X." },
]

/** Pieces of FrameON's own look that shadcn has no equivalent for. */
export const frameon: ComponentDoc[] = [
  {
    slug: "logo",
    name: "Logo",
    group: "FrameON",
    runtime: "server",
    description:
      "Logo FrameON: hai góc khung phim và nút play vàng. Một bộ nét duy nhất dựng ra mark tĩnh, wordmark, biểu tượng chờ, mark trang 404 và FrameX — logo vàng của gói hội viên cao cấp, có ánh kim, lóe sáng, hào quang và intro. Sửa logo là sửa đúng một chỗ.",
    imports: 'import { LogoLost, LogoMark, LogoSpinner, Wordmark } from "@hwagfu/frameui/logo"',
    examples: [
      { file: "logo-demo", title: "Mark và wordmark", description: "`Wordmark` co giãn theo `size` (cỡ chữ); mark và khoảng cách đi theo." },
      {
        file: "logo-motion",
        title: "Đang tải và 404",
        description:
          "`LogoSpinner`: khung quay nửa vòng mỗi nhịp, nút play thở theo. `LogoLost`: hai góc chớp so le, nút play tuột khỏi chỗ và lắc lư. Thuần SVG + CSS, tự tắt khi hệ điều hành bật giảm chuyển động.",
      },
      {
        file: "logo-framex",
        title: "FrameX",
        description:
          "`variant=\"framex\"`: mark đúc vàng nguyên khối, tên in hoa giãn rộng với chữ X vàng. Cùng `size` thì mark FrameX bằng đúng mark FrameON, nên đổi gói trên header không xê dịch gì.",
      },
      {
        file: "logo-framex-effects",
        title: "Ánh sáng và chuyển động FrameX",
        description:
          "Bật từng hiệu ứng bằng prop và ghép tuỳ ý. Thời gian của mọi phần được tính trên server từ các prop đang bật, nên vẫn là Server Component thuần CSS. Âm thanh đi kèm: xem Logo Sound.",
      },
    ],
    api: [
      {
        name: "LogoMark",
        props: [
          sizeProp(30),
          variantProp,
          labelProp("FrameON · FrameX"),
          entranceProp,
          ...framexProps,
          classNameProp,
          restProp("svg"),
        ],
      },
      { name: "LogoSpinner", props: [sizeProp(48), variantProp, labelProp(), classNameProp, restProp("svg")] },
      { name: "LogoLost", props: [sizeProp(96), labelProp(), classNameProp, restProp("svg")] },
      {
        name: "Wordmark",
        props: [
          {
            name: "size",
            type: "number",
            default: "24",
            description:
              "Cỡ chữ (px). Mark = size × 1.24, khoảng cách = size × 0.34. FrameX: tên in hoa = size × 0.62 (rộng hơn nhiều), mark vẫn size × 1.24.",
          },
          { name: "mark", type: "boolean", default: "true", description: "Hiện mark trước tên." },
          variantProp,
          entranceProp,
          ...framexProps,
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
      "FrameX lấy vàng từ gradient riêng của từng nét (sáng góc trên trái, một dải sáng giữa, đậm góc dưới phải) nên không theo `currentColor`; FrameON vẫn như cũ.",
      "Hiệu ứng FrameX tràn ra ngoài khung (hào quang, đốm lóe, sóng xung kích): chừa chỗ quanh logo, đừng đặt trong khối `overflow-hidden` sát mép.",
      "Ở header chỉ nên dùng `shine=\"hover\" flare=\"hover\"`: hiệu ứng tự lặp ở cỡ nhỏ làm rối giao diện. `entrance` hợp với màn hình riêng của logo, như trang giới thiệu gói hay \"nâng cấp thành công\" — chữ đổi khoảng cách khi xuất hiện nên bề rộng logo thay đổi trong khoảng 1 giây.",
      "Mọi hiệu ứng là CSS: tắt khi hệ điều hành bật giảm chuyển động, logo hiện ngay ở trạng thái cuối.",
    ],
  },
  {
    slug: "logo-sound",
    name: "Logo Sound",
    group: "FrameON",
    runtime: "island",
    description:
      "Âm thanh cho logo: MP3 dựng sẵn, mỗi cue một module, trang nào dùng mới tải. FrameON: hợp âm ấm, nhịp trầm, vệt gió, hai tiếng chuông. FrameX: intro kiểu rạp IMAX/4DX — rung ghế, khoảng lặng, cú nện, đàn hạc, âm vòm 3D. Logo vẫn là Server Component; chỉ lớp bọc LogoSound chạy trên client.",
    imports: 'import { LogoIntro, LogoSound, playLogoSound } from "@hwagfu/frameui/logo-sound"',
    examples: [
      {
        file: "logo-intro-demo",
        title: "Trước khi vào phim",
        description:
          "`LogoIntro` trên trang xem phim: intro chạy có tiếng rồi mờ dần sang phim. Mở trang thẳng (chưa bấm gì) thì trình duyệt chặn tiếng — với cả phim — nên intro chờ sau nút \"Xem phim\"; bấm \"Xem với…\" bên dưới là có tiếng ngay. Có nút Bỏ qua sau 1 giây.",
      },
      {
        file: "logo-sound-framex",
        title: "Intro FrameX",
        description:
          "Tích tụ 1,2 giây (rung trầm như ghế rạp rung, luồng gió vòng từ sau ra trước, cao độ hội tụ về một hợp âm) → khoảng lặng ~0,1 giây → cú nện khi nút play đáp xuống (bass tụt sâu, kèn đồng, sóng xung kích, logo rung) → đàn hạc khi chữ hiện → vệt sáng lướt ngang trước mặt → hai tiếng chuông kim loại ở hai đốm lóe → hợp âm kết.",
      },
      {
        file: "logo-sound-frameon",
        title: "Intro FrameON",
        description:
          "Bản đơn giản, 2,3 giây: hợp âm Rê mở ra khi góc khung được vẽ, nhịp trầm khi nút play đáp xuống, vệt gió khi chữ trượt vào, hai tiếng chuông khi chữ ON bật sáng.",
      },
      {
        file: "logo-sound-hover",
        title: "Rê chuột trên header",
        description: "`trigger=\"hover\"`: rê chuột vào logo thì vệt sáng chạy một lần kèm hai tiếng chuông nhỏ — tối đa một lần mỗi 1,8 giây.",
      },
    ],
    api: [
      {
        name: "LogoSound",
        description:
          "Bọc logo (Server Component) mà không thêm hộp nào (`display: contents`). Tải trước MP3 của cue lúc trình duyệt rảnh; khi phát, khởi động lại animation CSS của logo đúng lúc âm thanh tới loa — đã tính độ trễ đầu ra — nên hình và tiếng luôn khớp.",
        props: [
          { name: "cue", type: '"frameon-intro" | "framex-intro" | "framex-reveal" | "framex-hover"', description: "Âm thanh nào — chọn đúng cue làm cho prop của logo (xem bảng bên dưới)." },
          {
            name: "trigger",
            type: '"click" | "mount" | "hover"',
            default: '"click"',
            description:
              "`click`: bấm vào logo thì phát lại cả hình lẫn tiếng. `mount`: phát khi logo xuất hiện — nếu người xem đã bấm hay gõ phím trên trang trước đó (trình duyệt chặn âm thanh trước lần đó), hợp với màn hình tới sau một nút bấm. `hover`: khi rê chuột vào.",
          },
          { name: "volume", type: "number", default: "0.9", description: "Âm lượng 0–1." },
          { name: "children", type: "ReactNode", description: "Logo." },
          classNameProp,
        ],
      },
      {
        name: "LogoIntro",
        description:
          "Logo trước phim, phủ lên player (`absolute inset-0`). Tự thử phát có tiếng; trình duyệt chặn thì chờ sau nút bắt đầu. Hết intro (FrameON 2,6 giây, FrameX 5,2 giây) hoặc khi bấm Bỏ qua: mờ dần 0,6 giây, gọi `onDone`, tiếng còn ngân được fade theo. Người dùng bật giảm chuyển động: vào phim ngay.",
        props: [
          { name: "cue", type: '"frameon-intro" | "framex-intro"', description: "Khớp với logo bên trong." },
          { name: "onDone", type: "() => void", description: "Intro xong hoặc bị bỏ qua: bắt đầu phim (`video.play()`)." },
          {
            name: "onStart",
            type: "() => void",
            description:
              "Gọi ngay trong cú bấm nút bắt đầu (khi trình duyệt cần cú bấm). Mở khoá `<video>` ở đây — `video.play()` rồi `video.pause()` — để iOS cho phim chạy có tiếng khi intro xong.",
          },
          { name: "startLabel", type: "ReactNode", default: '"Xem phim"', description: "Chữ trên nút bắt đầu." },
          { name: "skipLabel", type: "ReactNode", default: '"Bỏ qua"', description: "Chữ trên nút bỏ qua." },
          { name: "volume", type: "number", default: "0.9", description: "Âm lượng 0–1." },
          { name: "children", type: "ReactNode", description: 'Logo với `entrance="intro"`.' },
          classNameProp,
        ],
      },
      {
        name: "Cue · prop của logo",
        props: [
          { name: '"frameon-intro"', type: "4,8 s · 77 KB", description: '`<Wordmark entrance="intro" />`' },
          { name: '"framex-intro"', type: "10,5 s · 165 KB", description: '`<Wordmark variant="framex" entrance="intro" shine flare glow />`' },
          { name: '"framex-reveal"', type: "5,9 s · 93 KB", description: '`entrance="reveal"` (FrameX)' },
          { name: '"framex-hover"', type: "6,9 s · 109 KB", description: '`shine="hover" flare="hover"` (FrameX) — tiếng chính 1,5 giây, phần còn lại là tiếng vang tắt dần.' },
        ],
      },
      {
        name: "playLogoSound(cue, options?)",
        description:
          "Phát một cue trên AudioContext dùng chung của trang, trả về thời điểm (theo `performance.now()`) âm thanh tới loa — dùng khi tự điều khiển, ví dụ trong `onClick` của nút \"Nâng cấp\". Trả về `null` khi không phát: trên server, không có Web Audio, hoặc người xem chưa bấm gì trên trang.",
        props: [
          { name: "cue", type: "LogoSoundCue", description: "Như trên." },
          { name: "options.volume", type: "number", default: "0.9", description: "Âm lượng 0–1." },
        ],
      },
      {
        name: "stopLogoSound(fade?)",
        description: "Fade tắt mọi tiếng logo đang phát trong `fade` giây (mặc định 0,5) — khi phim bắt đầu lúc hợp âm cuối còn ngân, hay khi bỏ qua.",
        props: [{ name: "fade", type: "number", default: "0.5", description: "Thời gian fade (giây)." }],
      },
      {
        name: "preloadLogoSound(cue)",
        description:
          "Tải trước MP3 của một cue — không phát, không cần AudioContext, gọi được trước mọi cú bấm. `LogoSound` tự làm việc này; gọi tay khi dùng `playLogoSound` trực tiếp, ví dụ lúc mở trang thanh toán.",
        props: [{ name: "cue", type: "LogoSoundCue", description: "Như trên." }],
      },
    ],
    notes: [
      "Tiếng được tổng hợp một lần bằng Web Audio (`packages/frameui/scripts/sounds/engine.ts`) rồi encode ra MP3 128 kbps; trình duyệt chỉ giải mã một lần rồi phát — không tổng hợp gì lúc chạy, nghe giống hệt nhau trên mọi máy. File MP3 gốc nằm ở `packages/frameui/sounds/` (dùng được cho video). Sửa tiếng: sửa engine rồi chạy `pnpm --filter @hwagfu/frameui sounds`.",
      "MP3 nằm trong module JS dạng data URI nên đi được cả qua npm lẫn shadcn registry, không cần cấu hình bundler; mỗi cue là một chunk riêng, chỉ tải khi trang dùng đến.",
      "FrameON ở giọng Rê, FrameX ở giọng Mi — cao hơn một cung, đúng nghĩa \"nâng cấp\".",
      "Âm vòm 3D (HRTF) và dải trầm chỉ nghe rõ qua tai nghe. Loa điện thoại không phát được dưới khoảng 80 Hz, nên dải trầm được làm méo nhẹ để sinh bội âm cao hơn — loa nhỏ vẫn cảm được độ nặng.",
      "Âm thanh chỉ phát một lần mỗi lượt; vòng lặp ánh sáng sau đó không có tiếng.",
      "Không có cách nào ép trình duyệt phát tiếng khi người xem chưa bấm hay gõ phím trên trang — phim cũng vậy. Trên trang xem phim, intro đi chung cú bấm với phim: chuyển trang bằng `<Link>` (client navigation) sau nút \"Xem\" thì trình duyệt vẫn nhớ cú bấm và intro có tiếng ngay; mở link thẳng thì `LogoIntro` hiện nút \"Xem phim\". Ngoài ra trình duyệt tự cho phép với trang người dùng đã cho phép âm thanh, web app đã cài, trang hay xem media (Chrome), kiosk và WebView cấu hình sẵn.",
      "iPhone: Web Audio mặc định im khi gạt nút im lặng, còn video phim thì không. `LogoIntro` đặt `navigator.audioSession.type = \"playback\"` (Safari 16.4+) để intro kêu như phim.",
      "Chỉ module này chạy trên client và chỉ được tải ở trang nào import nó; `@hwagfu/frameui/logo` không phụ thuộc vào nó.",
      "Lệch giữa hình và tiếng: đã đo khi render (tương quan chéo giữa bản gốc và MP3 đã giải mã) và bù khi phát; với Chromium là 0 mẫu.",
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
  {
    slug: "film-peek",
    name: "Film Peek",
    group: "FrameON",
    runtime: "island",
    description:
      "Popup xem nhanh khi rê chuột vào thẻ phim: ảnh ngang, nút xem / thêm vào danh sách / chi tiết, tên, điểm, độ tuổi, tóm tắt. Cả trang chỉ một lớp client bắt sự kiện từ mọi thẻ có `data-peek`, nên thẻ phim vẫn là Server Component.",
    imports:
      'import { FilmPeek, FilmPeekActions, FilmPeekBody, FilmPeekDescription, FilmPeekGenres, FilmPeekHeader, FilmPeekMedia, FilmPeekMeta, FilmPeekRating, FilmPeekSynopsis, FilmPeekTitle } from "@hwagfu/frameui/film-peek"',
    examples: [
      {
        file: "film-peek-demo",
        title: "Rê chuột vào poster",
        description:
          "Đặt chuột yên trên một thẻ khoảng 0,4 giây thì popup mở ngay trên thẻ; lướt ngang qua dải thì không bật. Rê sang popup vẫn giữ, rời ra là đóng. Màn cảm ứng không có popup: chạm là vào trang phim.",
      },
    ],
    api: [
      {
        name: "FilmPeek",
        description:
          "Lớp client, đặt một lần mỗi trang (hoặc trong layout). Thẻ phim chỉ cần thuộc tính `data-peek=\"<id>\"` (`<PosterCard data-peek=\"sintel\">`, phần tử nào cũng được). Popup vẽ qua portal ra `<body>` nên dải cuộn ngang không cắt nó.",
        props: [
          { name: "panels", type: "Record<string, ReactNode>", description: "Nội dung popup theo từng phim, khoá là giá trị `data-peek` của thẻ. Dựng trên server bằng các mảnh bên dưới — dùng được `next/link`, i18n của ứng dụng." },
          { name: "openDelay", type: "number", default: "420", description: "Đặt chuột yên bao lâu (ms) thì mở — đủ dài để lướt ngang dải phim không bật popup." },
          { name: "closeDelay", type: "number", default: "140", description: "Rời thẻ bao lâu (ms) thì đóng — đủ để kịp rê sang popup." },
          { name: "width", type: "number", default: "340", description: "Bề rộng popup (px)." },
          classNameProp,
        ],
      },
      { name: "FilmPeekMedia · FilmPeekHeader", description: "Ảnh 16:9 và khối tên + tagline; gắn link bằng `render`.", props: [renderProp, classNameProp] },
      { name: "FilmPeekRating", props: [{ name: "value", type: "number", description: "Điểm, sao vàng + một chữ số thập phân." }, classNameProp] },
      {
        name: "FilmPeekBody · FilmPeekActions · FilmPeekTitle · FilmPeekDescription · FilmPeekMeta · FilmPeekSynopsis · FilmPeekGenres",
        props: [classNameProp, restProp("div")],
      },
    ],
    notes: [
      "Đóng khi: rời thẻ và popup, bấm ra ngoài, bấm một liên kết trong popup, nhấn Esc, cuộn trang hay dải phim, đổi cỡ cửa sổ. Bấm nút (thêm vào danh sách…) thì popup ở lại.",
      "Chỉ bật với chuột thật (`(hover: hover) and (pointer: fine)`). Bàn phím và màn cảm ứng đi thẳng vào trang phim qua liên kết của thẻ.",
      "Chỉ popup đang mở được dựng vào trang; `panels` của mọi phim đi kèm HTML đầu tiên dưới dạng dữ liệu RSC, nên với trang rất nhiều phim hãy giữ nội dung popup gọn.",
    ],
  },
]

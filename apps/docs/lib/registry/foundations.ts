import type { ComponentDoc } from "../types"
import { classNameProp, renderProp, restProp } from "./shared"

export const foundations: ComponentDoc[] = [
  {
    slug: "button",
    name: "Button",
    group: "Nền tảng",
    runtime: "server",
    description:
      "Nút hành động. Là một `<button>` thuần — không hook, không `\"use client\"` — nên render thành HTML tĩnh trong Server Component và không tốn byte JavaScript nào.",
    imports: 'import { Button } from "@hwagfu/frameui/button"',
    shadcn: "button",
    examples: [
      { file: "button-demo", title: "Các biến thể", description: "Năm biến thể gốc của FrameON (default tím, golden vàng, secondary, outline, ghost) cộng `destructive` và `link` của shadcn." },
      { file: "button-sizes", title: "Kích thước và nút biểu tượng", description: "Thang 32 / 38 / 46px của FrameON. Các cỡ `icon-*` luôn tròn — nhớ `aria-label`." },
      { file: "button-link", title: "Dạng liên kết và trạng thái tắt", description: "Dùng `render` để nhận về `<Link>` với cùng hình thức; `nativeButton={false}` chuyển `disabled` thành `aria-disabled`." },
    ],
    api: [
      {
        name: "Button",
        props: [
          { name: "variant", type: '"default" | "golden" | "secondary" | "outline" | "ghost" | "destructive" | "link"', default: '"default"', description: "`golden` là hành động chính của thương hiệu FrameON (nền vàng, chữ đậm)." },
          { name: "size", type: '"xs" | "sm" | "default" | "lg" | "icon" | "icon-xs" | "icon-sm" | "icon-lg"', default: '"default"', description: "sm = 32px, default = 38px, lg = 46px. Các cỡ icon tròn, cạnh bằng chiều cao tương ứng." },
          renderProp,
          { name: "nativeButton", type: "boolean", default: "render === undefined", description: "Đặt `false` khi `render` không phải `<button>`: bỏ `type`, `disabled` thành `aria-disabled`." },
          classNameProp,
          restProp("button"),
        ],
      },
    ],
    notes: [
      "`buttonVariants({ variant, size })` được export để tái dùng hình thức nút cho phần tử khác.",
      "Đặt `data-icon=\"inline-start\"` / `\"inline-end\"` lên icon để căn lề như shadcn.",
      "Nút bo tròn kiểu viên thuốc (pill) của FrameON: thêm `className=\"rounded-full\"`.",
    ],
  },
  {
    slug: "button-group",
    name: "Button Group",
    group: "Nền tảng",
    runtime: "server",
    description: "Ghép nhiều nút (hoặc ô nhập, select) thành một khối liền, tự bỏ bo góc và viền ở mép tiếp giáp.",
    imports: 'import { ButtonGroup, ButtonGroupSeparator, ButtonGroupText } from "@hwagfu/frameui/button-group"',
    shadcn: "button-group",
    examples: [{ file: "button-group-demo", title: "Nhóm nút" }],
    api: [
      { name: "ButtonGroup", props: [{ name: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "Hướng xếp các phần tử." }, classNameProp, restProp("div")] },
      { name: "ButtonGroupText", props: [renderProp, classNameProp] },
      { name: "ButtonGroupSeparator", props: [{ name: "orientation", type: '"horizontal" | "vertical"', default: '"vertical"', description: "Hướng đường kẻ." }] },
    ],
  },
  {
    slug: "badge",
    name: "Badge",
    group: "Nền tảng",
    runtime: "server",
    description: "Nhãn trạng thái nhỏ: VIP, Song ngữ, FHD… Cỡ chữ 11px, bo 4px như FrameON.",
    imports: 'import { Badge } from "@hwagfu/frameui/badge"',
    shadcn: "badge",
    examples: [{ file: "badge-demo", title: "Các biến thể" }],
    api: [
      {
        name: "Badge",
        props: [
          { name: "variant", type: '"default" | "golden" | "secondary" | "destructive" | "outline" | "ghost" | "link"', default: '"default"', description: "`default` = tím (standard), `golden` = VIP, `secondary` = neutral của FrameON." },
          renderProp,
          classNameProp,
          restProp("span"),
        ],
      },
    ],
  },
  {
    slug: "kbd",
    name: "Kbd",
    group: "Nền tảng",
    runtime: "server",
    description:
      "Hiển thị phím tắt bàn phím. Prop `modifier` vẽ sẵn biểu tượng của phím Command, Option, Control, Shift — `<Kbd modifier=\"command\">K</Kbd>` thành ⌘K.",
    imports: 'import { Kbd, KbdGroup } from "@hwagfu/frameui/kbd"',
    shadcn: "kbd",
    examples: [
      { file: "kbd-demo", title: "Phím tắt" },
      {
        file: "kbd-modifiers",
        title: "Phím bổ trợ",
        description:
          "`modifier` đứng một mình là phím ⌘ ⌥ ⌃ ⇧; kèm chữ thì thành một phím gộp như ⌘S. Tổ hợp nhiều phím: xếp các `Kbd` trong `KbdGroup`.",
      },
    ],
    api: [
      {
        name: "Kbd",
        props: [
          {
            name: "modifier",
            type: '"command" | "option" | "control" | "shift"',
            description:
              "Vẽ biểu tượng ⌘ / ⌥ / ⌃ / ⇧ trước nội dung. Là SVG nên không phụ thuộc font có các ký tự này hay không; trình đọc màn hình đọc tên phím.",
          },
          classNameProp,
          restProp("kbd"),
        ],
      },
      { name: "KbdGroup", props: [classNameProp, restProp("kbd")] },
    ],
    notes: [
      "Biểu tượng là kiểu phím của Mac. Trên Windows / Linux người dùng quen chữ hơn: `<Kbd>Ctrl</Kbd>`, `<Kbd>Alt</Kbd>` — xem ô tìm kiếm ⌘K của docs này, đổi theo hệ điều hành.",
    ],
  },
  {
    slug: "label",
    name: "Label",
    group: "Nền tảng",
    runtime: "server",
    description: "Nhãn cho ô nhập: 14px, đậm vừa, giãn chữ 0.2px như FrameON. Là `<label>` thuần.",
    imports: 'import { Label } from "@hwagfu/frameui/label"',
    shadcn: "label",
    examples: [{ file: "label-demo", title: "Nhãn đi kèm checkbox" }],
    api: [{ name: "Label", props: [classNameProp, restProp("label")] }],
  },
  {
    slug: "separator",
    name: "Separator",
    group: "Nền tảng",
    runtime: "server",
    description: "Đường kẻ mảnh ngăn cách nội dung. Cùng thuộc tính ARIA với Base UI Separator nhưng không cần runtime client.",
    imports: 'import { Separator } from "@hwagfu/frameui/separator"',
    shadcn: "separator",
    examples: [{ file: "separator-demo", title: "Ngang và dọc" }],
    api: [{ name: "Separator", props: [{ name: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "Hướng đường kẻ." }, renderProp, classNameProp] }],
  },
  {
    slug: "spinner",
    name: "Spinner",
    group: "Nền tảng",
    runtime: "server",
    description: "Biểu tượng đang tải quay tròn. SVG tĩnh, animation bằng CSS.",
    imports: 'import { Spinner } from "@hwagfu/frameui/spinner"',
    shadcn: "spinner",
    examples: [{ file: "spinner-demo", title: "Kích thước và màu" }],
    api: [{ name: "Spinner", props: [classNameProp, restProp("svg")] }],
  },
  {
    slug: "skeleton",
    name: "Skeleton",
    group: "Nền tảng",
    runtime: "server",
    description: "Khung giữ chỗ khi nội dung đang tải.",
    imports: 'import { Skeleton } from "@hwagfu/frameui/skeleton"',
    shadcn: "skeleton",
    examples: [{ file: "skeleton-demo", title: "Thẻ phim đang tải" }],
    api: [{ name: "Skeleton", props: [classNameProp, restProp("div")] }],
  },
  {
    slug: "typography",
    name: "Typography",
    group: "Nền tảng",
    runtime: "server",
    description: "Các kiểu chữ trong trang Typography của shadcn, đặt theo thang chữ FrameON (display 32 · h1 28 · h3 20 · h2 18 · 16 · 14 · 12).",
    imports: 'import { TypographyH1, TypographyP, … } from "@hwagfu/frameui/typography"',
    shadcn: "typography",
    examples: [{ file: "typography-demo", title: "Văn bản dài" }],
    api: [
      {
        name: "TypographyH1 · H2 · H3 · H4 · P · Blockquote · List · InlineCode · Lead · Large · Small · Muted",
        props: [classNameProp, { name: "...props", type: "ComponentProps<thẻ tương ứng>", description: "Chuyển xuống thẻ HTML ngữ nghĩa tương ứng." }],
      },
    ],
    notes: ["Có thể dùng thẳng các class `text-display`, `text-h1`, `text-subtitle`, `text-caption`… mà theme cung cấp."],
  },
  {
    slug: "aspect-ratio",
    name: "Aspect Ratio",
    group: "Nền tảng",
    runtime: "server",
    description: "Giữ nội dung đúng tỉ lệ khung hình (poster 2:3, video 16:9…).",
    imports: 'import { AspectRatio } from "@hwagfu/frameui/aspect-ratio"',
    shadcn: "aspect-ratio",
    examples: [{ file: "aspect-ratio-demo", title: "Khung 16:9" }],
    api: [{ name: "AspectRatio", props: [{ name: "ratio", type: "number", description: "Tỉ lệ rộng / cao, ví dụ `16 / 9`." }, classNameProp, restProp("div")] }],
  },
]

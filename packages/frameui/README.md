# @hwagfu/frameui

Toàn bộ component của [shadcn/ui](https://ui.shadcn.com) (bản Base UI) được may lại theo giao diện **FrameON** —
nền tối, tím chủ đạo, vàng thương hiệu — và tối ưu cho **React Server Components**.

- **65 component**, đúng API của shadcn: `Button`, `Dialog`, `Select`, `Sidebar`, `DataTable`, `Chart`, `Questionnaire`…
- **Server Component trước tiên**: 25 component không gửi JavaScript nào; phần lớn còn lại chỉ gửi primitive
  tương tác của Base UI, còn class / cva / tailwind-merge ở lại máy chủ.
- **Tailwind CSS v4**, token màu theo tên biến của shadcn (`--primary`, `--accent`…) với giá trị FrameON.

## Cài đặt

```bash
pnpm add @hwagfu/frameui
```

Peer dependency: `react` / `react-dom` ≥ 19.2, `tailwindcss` 4.

```css
/* app/globals.css */
@import "tailwindcss";
@import "@hwagfu/frameui/styles.css"; /* hoặc theme.css nếu chỉ cần token */
```

Font: theme đọc biến `--font-be-vietnam` (Be Vietnam Pro), ví dụ qua `next/font/google`.

## Dùng

```tsx
import { Button } from "@hwagfu/frameui/button"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@hwagfu/frameui/dialog"

// Server Component — không cần "use client".
export default function Page() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="golden" />}>Nâng cấp VIP</DialogTrigger>
      <DialogContent variant="promo">
        <DialogTitle>Trở thành thành viên VIP</DialogTitle>
      </DialogContent>
    </Dialog>
  )
}
```

- Mỗi component có đường import riêng (`@hwagfu/frameui/<tên>`); barrel `@hwagfu/frameui` cũng có
  (trừ `sonner`, trùng tên `Toaster` với Toast của Base UI).
- `cn()` đã biết thang token FrameON: `@hwagfu/frameui/utils`.
- Thông báo: `<Toaster />` từ `@hwagfu/frameui/sonner`, gọi `toast()` từ gói `sonner`.

## Biến thể thêm của FrameON

| Component | Thêm |
|---|---|
| Button | `variant="golden"`, cỡ 32 / 38 / 46px, nút icon tròn |
| Badge | `variant="golden"` (VIP) |
| Card | `variant="elevated" \| "promo"` |
| Dialog | `DialogContent variant="promo"` |
| Alert | `variant="success" \| "warning" \| "info"` |
| Bubble | `variant="golden"` |
| Toggle | `variant="outline"` = chip lọc (Tag) |
| Tabs | `TabsList variant="line"` = thanh tab FrameON |

## Phát triển

```bash
pnpm build      # tsdown (unbundle, giữ "use client" từng file) + sinh bảng exports
pnpm typecheck
```

Tài liệu đầy đủ (tiếng Việt, có ví dụ trực tiếp): `apps/docs` trong monorepo — `pnpm docs:dev`.

## Giấy phép

MIT. Mã component dựa trên shadcn/ui (MIT, © shadcn); icon nội bộ lấy đường vẽ từ Lucide (ISC).

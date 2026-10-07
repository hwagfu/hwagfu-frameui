# hwagfu-frameui

Monorepo của thư viện component FrameON.

| Thư mục | Gói | Trạng thái |
|---|---|---|
| `packages/frameui` | `@hwagfu/frameui` — web, shadcn/ui (Base UI) + Tailwind CSS v4, Server Component trước tiên | Stage 1 — xong |
| `packages/frameui-native` | `@hwagfu/frameui-native` — React Native, HeroUI Native + Uniwind | Stage 2 |
| `apps/docs` | Trang tài liệu (Next.js 16, tiếng Việt) + shadcn registry `@frameui` | Stage 1 — xong |

```bash
pnpm install
pnpm build            # build thư viện
pnpm registry:build   # sinh shadcn registry vào apps/docs/public/r (docs:dev / docs:build tự chạy)
pnpm docs:dev         # chạy trang docs ở http://localhost:3100
pnpm docs:build
```

## Hai cách dùng FrameUI

1. **Gói npm** — `pnpm add @hwagfu/frameui`, rồi `import { Button } from "@hwagfu/frameui/button"`.
2. **shadcn CLI** — chép mã nguồn vào dự án: `pnpm dlx shadcn@latest add @frameui/button`, rồi
   `import { Button } from "@/components/ui/button"`.
3. **Trợ lý AI** — `pnpm dlx shadcn@latest mcp init --client claude`: MCP server của shadcn tìm, xem ví dụ và
   cài component từ `@frameui` (registry có sẵn toàn bộ ví dụ của docs dưới dạng `registry:example`).

Registry không có mã riêng: `apps/docs/scripts/gen-registry.mjs` đọc `packages/frameui/src`, viết lại import
tương đối thành `@/registry/frameui/…` và sinh `registry.json` (kèm theme FrameON dạng `cssVars` + `css`);
`shadcn build` biến nó thành `public/r/<tên>.json`. Trang docs phục vụ `/r/*` cho CLI khi request có
`Authorization: Bearer <FRAMEUI_REGISTRY_TOKEN>` — cùng token cài gói npm. Hướng dẫn cho người dùng:
trang *Cài bằng shadcn CLI* của docs.

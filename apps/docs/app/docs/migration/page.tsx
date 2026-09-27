import type { Metadata } from "next"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@hwagfu/frameui/table"

import { CodeBlock } from "@/components/code-block"
import { InlineMarkdown } from "@/components/inline-markdown"
import { Article, Code, H2, P, PageHeader } from "@/components/prose"

export const metadata: Metadata = { title: "Chuyển từ FrameON" }

const rows: [string, string, string][] = [
  ["`Button variant=\"primary\"`", "`Button` (variant `default`)", "Tím. `golden`, `secondary`, `outline`, `ghost` giữ nguyên tên."],
  ["`Button size=\"md\"`", "`Button` (size `default`)", "`sm` / `lg` giữ nguyên; thêm `xs`."],
  ["`Button pill`", "`className=\"rounded-full\"`", ""],
  ["`Button href=\"/x\"`", "`render={<Link href=\"/x\" />} nativeButton={false}`", "Chạy với mọi router, không phụ thuộc next/link."],
  ["`Button isIconOnly`", "`size=\"icon\" | \"icon-sm\" | \"icon-lg\"`", "Luôn tròn như cũ."],
  ["`IconButton label=…`", "`Button size=\"icon-*\" aria-label=…`", "Cỡ vuông: thêm `className=\"rounded-md\"`."],
  ["`Badge tone=\"vip\" | \"standard\" | \"neutral\"`", "`Badge variant=\"golden\" | \"default\" | \"secondary\"`", ""],
  ["`Card variant=\"standard\" | \"elevated\" | \"promo\"`", "`Card variant=\"default\" | \"elevated\" | \"promo\"`", "Thêm CardHeader/CardTitle/CardContent/CardFooter."],
  ["`Input label hint error iconLeft`", "`Field` + `FieldLabel` + `Input` + `FieldDescription` / `FieldError`; icon → `InputGroup`", "`pill` / `size=\"lg\"` → `InputGroup className=\"h-[46px] rounded-full\"`."],
  ["`Checkbox label` / `Radio label` / `Switch label`", "`Checkbox` / `RadioGroupItem` / `Switch` + `Label`", "Radio phải nằm trong `RadioGroup`."],
  ["`Select options label placeholder`", "`Select items` + `SelectTrigger` / `SelectValue placeholder` / `SelectItem`", "Hoặc `NativeSelect` nếu cần chạy không JS."],
  ["`Dropdown trigger items onSelect`", "`DropdownMenu` + `DropdownMenuTrigger render={…}` + `DropdownMenuItem onClick`", ""],
  ["`Dialog trigger open onClose promo`", "`Dialog open onOpenChange` + `DialogTrigger` + `DialogContent variant=\"promo\"`", "`title` → `DialogTitle`, `footer` → `DialogFooter`."],
  ["`Tabs items value` (link)", "Liên kết + `NavigationMenuLink active` / `Pagination`", "Tab đổi tại chỗ: `Tabs` + `TabsList variant=\"line\"`."],
  ["`Tag active href`", "`Toggle variant=\"outline\" pressed` hoặc `ToggleGroup variant=\"outline\"`", "Chip lọc chạy trên server: `Badge variant=\"outline\" render={<Link />}`."],
  ["`NavLink active`", "`NavigationMenuLink active`", ""],
  ["`Tooltip content placement`", "`Tooltip` + `TooltipTrigger` + `TooltipContent side`", "Tự lật khi chạm mép, không bị khung cha cắt."],
  ["`Toast tone` / `Toaster` / `toast()`", "`@hwagfu/frameui/sonner` + `toast()` của sonner", "Cùng API: `toast.success`, `toast.promise`, `toast.dismiss`…"],
  ["`MorphIcon` / `DetailsIcon`", "(giữ trong ứng dụng)", "Không thuộc shadcn — tiếp tục dùng `morphicons` ở tầng ứng dụng."],
]

export default function MigrationPage() {
  return (
    <Article>
      <PageHeader
        title="Chuyển từ FrameON"
        lead="Component tự viết trong frontend/src/components/ui của FrameON đều có bản tương ứng — hình thức giữ nguyên, API chuyển sang chuẩn shadcn."
      />

      <H2>Đối chiếu</H2>
      <div className="overflow-hidden rounded-md border border-border">
        <Table className="table-fixed">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[32%]">FrameON</TableHead>
              <TableHead className="w-[36%]">FrameUI</TableHead>
              <TableHead>Ghi chú</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map(([from, to, note]) => (
              <TableRow key={from}>
                <TableCell className="align-top text-caption whitespace-normal">
                  <InlineMarkdown text={from} />
                </TableCell>
                <TableCell className="align-top text-caption whitespace-normal">
                  <InlineMarkdown text={to} />
                </TableCell>
                <TableCell className="align-top text-caption whitespace-normal text-muted-foreground">
                  <InlineMarkdown text={note} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <H2>Token</H2>
      <P>
        Tên class đổi theo quy ước shadcn; giá trị giữ nguyên. Khoảng cách dùng thang số của Tailwind (<Code>p-4</Code> =
        16px = <Code>p-md</Code> cũ) để thư viện không chiếm tên <Code>sm</Code>/<Code>md</Code> của ứng dụng.
      </P>
      <CodeBlock
        code={`bg-page        → bg-background        text-body       → text-foreground
bg-card        → bg-card              text-heading    → text-heading
bg-modal       → bg-modal             text-secondary  → text-muted-foreground
bg-subtle      → bg-muted             text-tertiary   → text-tertiary
bg-accent      → bg-brand             text-accent     → text-brand
text-on-accent → text-brand-foreground border-subtle  → border-border
text-input     → text-control         p-xs/sm/md/lg/xl → p-2/3/4/5/6`}
      />
    </Article>
  )
}

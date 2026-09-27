import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@hwagfu/frameui/table"

import type { ApiPart } from "@/lib/types"
import { InlineMarkdown } from "./inline-markdown"

export function PropsTable({ part }: { part: ApiPart }) {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="m-0 font-mono text-subtitle font-bold text-brand-muted">{part.name}</h3>
      {part.description ? <p className="m-0 text-caption text-muted-foreground">{part.description}</p> : null}
      <div className="overflow-hidden rounded-md border border-border">
        <Table className="table-fixed">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[22%]">Prop</TableHead>
              <TableHead className="w-[30%]">Kiểu</TableHead>
              <TableHead className="w-[14%]">Mặc định</TableHead>
              <TableHead>Mô tả</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {part.props.map((prop) => (
              <TableRow key={prop.name}>
                <TableCell className="align-top font-mono text-caption whitespace-normal text-heading">
                  {prop.name}
                </TableCell>
                <TableCell className="align-top font-mono text-micro break-words whitespace-normal text-brand-muted">
                  {prop.type}
                </TableCell>
                <TableCell className="align-top font-mono text-micro whitespace-normal text-muted-foreground">
                  {prop.default ?? "—"}
                </TableCell>
                <TableCell className="align-top text-caption whitespace-normal text-muted-foreground">
                  <InlineMarkdown text={prop.description} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

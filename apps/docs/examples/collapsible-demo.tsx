import { ChevronsUpDown } from "lucide-react"

import { Button } from "@hwagfu/frameui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@hwagfu/frameui/collapsible"

export default function CollapsibleDemo() {
  return (
    <Collapsible className="flex w-full max-w-sm flex-col gap-2">
      <div className="flex items-center justify-between gap-4">
        <h4 className="text-subtitle font-bold text-heading">Diễn viên (3)</h4>
        <CollapsibleTrigger render={<Button variant="ghost" size="icon-sm" aria-label="Mở rộng" />}>
          <ChevronsUpDown />
        </CollapsibleTrigger>
      </div>
      <div className="rounded-md border border-border px-4 py-2 text-subtitle">Timothée Chalamet</div>
      <CollapsibleContent className="flex flex-col gap-2">
        <div className="rounded-md border border-border px-4 py-2 text-subtitle">Zendaya</div>
        <div className="rounded-md border border-border px-4 py-2 text-subtitle">Rebecca Ferguson</div>
      </CollapsibleContent>
    </Collapsible>
  )
}

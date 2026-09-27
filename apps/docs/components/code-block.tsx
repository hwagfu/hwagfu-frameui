import { cn } from "@hwagfu/frameui/utils"

import { highlight } from "@/lib/highlight"
import { CopyButton } from "./copy-button"

/** Server-highlighted code with a copy button. No highlighter reaches the browser. */
export async function CodeBlock({
  code,
  lang = "tsx",
  title,
  className,
}: {
  code: string
  lang?: "tsx" | "ts" | "bash" | "css" | "json"
  title?: string
  className?: string
}) {
  const html = await highlight(code, lang)

  return (
    <div
      data-slot="code-block"
      className={cn("group/code relative overflow-hidden rounded-md border border-border bg-sunken", className)}
    >
      {title ? (
        <div className="border-b border-border px-4 py-2 font-mono text-caption text-muted-foreground">{title}</div>
      ) : null}
      <CopyButton value={code} className="absolute top-2 right-2 z-10" />
      <div
        className="max-h-[520px] overflow-auto p-4 pr-14 font-mono text-code [&_pre]:m-0 [&_pre]:bg-transparent! [&_pre]:font-mono [&_pre]:leading-6"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )
}

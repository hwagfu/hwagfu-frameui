import { Fragment } from "react"

/** Renders `code` spans inside registry strings — the only markup they use. */
export function InlineMarkdown({ text }: { text: string }) {
  const parts = text.split(/(`[^`]+`)/g)
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("`") && part.endsWith("`") ? (
          <code
            key={i}
            className="rounded-xs bg-muted px-1 py-0.5 font-mono text-[0.92em] text-brand-muted"
          >
            {part.slice(1, -1)}
          </code>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        )
      )}
    </>
  )
}

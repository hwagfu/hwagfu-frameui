import "server-only"

import { createHighlighter, type Highlighter } from "shiki"

let highlighter: Promise<Highlighter> | undefined

/**
 * Highlights code on the server (at build time for static pages), so no
 * highlighter ever reaches the browser.
 */
export async function highlight(code: string, lang: "tsx" | "ts" | "bash" | "css" | "json" | "md" = "tsx") {
  highlighter ??= createHighlighter({
    themes: ["github-dark-default"],
    langs: ["tsx", "ts", "bash", "css", "json", "md"],
  })
  const h = await highlighter
  return h.codeToHtml(code, { lang, theme: "github-dark-default" })
}

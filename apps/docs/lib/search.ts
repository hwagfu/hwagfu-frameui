import { guides } from "./nav"
import { docsByGroup } from "./registry"

export type SearchItem = {
  href: string
  title: string
  group: string
  /** Extra text the search matches on (slug, first sentence of the description). */
  keywords: string[]
}

const firstSentence = (text: string) => text.replace(/`/g, "").split(/(?<=\.)\s/)[0] ?? ""

/**
 * Everything the ⌘K search can open, built on the server so the client
 * receives a short list instead of the whole component registry.
 */
export const searchItems: SearchItem[] = [
  ...guides.map((guide) => ({ href: guide.href, title: guide.title, group: "Bắt đầu", keywords: [] })),
  ...docsByGroup.flatMap(({ group, items }) =>
    items.map((doc) => ({
      href: `/docs/components/${doc.slug}`,
      title: doc.name,
      group,
      keywords: [doc.slug, firstSentence(doc.description)],
    }))
  ),
]

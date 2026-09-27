import type { ComponentDoc, Group } from "../types"
import { dataDisplay } from "./data"
import { chat, feedback, utilities } from "./feedback"
import { forms } from "./forms"
import { foundations } from "./foundations"
import { navigation } from "./navigation"
import { overlays } from "./overlays"

export const docs: ComponentDoc[] = [
  ...foundations,
  ...forms,
  ...dataDisplay,
  ...navigation,
  ...overlays,
  ...feedback,
  ...chat,
  ...utilities,
]

export const groups: Group[] = [
  "Nền tảng",
  "Biểu mẫu",
  "Hiển thị dữ liệu",
  "Điều hướng",
  "Lớp phủ",
  "Phản hồi",
  "Hội thoại",
  "Tiện ích",
]

export const docsByGroup = groups.map((group) => ({
  group,
  items: docs.filter((doc) => doc.group === group).sort((a, b) => a.name.localeCompare(b.name)),
}))

export function getDoc(slug: string) {
  return docs.find((doc) => doc.slug === slug)
}

/** Previous / next component in sidebar order. */
export function getNeighbours(slug: string) {
  const flat = docsByGroup.flatMap((g) => g.items)
  const index = flat.findIndex((doc) => doc.slug === slug)
  return { prev: flat[index - 1], next: flat[index + 1] }
}

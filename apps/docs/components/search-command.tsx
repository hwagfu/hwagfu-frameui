"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { BookOpen, Component, Search } from "lucide-react"

import { Button } from "@hwagfu/frameui/button"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@hwagfu/frameui/command"
import { Kbd } from "@hwagfu/frameui/kbd"

import type { SearchItem } from "@/lib/search"

/** Lower case without Vietnamese diacritics, so "cai dat" finds "Cài đặt". */
function fold(text: string) {
  return text.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase().replace(/đ/g, "d")
}

/**
 * cmdk filter: every word of the query must appear somewhere; a match in the
 * title ranks above one in the description. `keywords[0]` is the title.
 */
function score(_value: string, search: string, keywords: string[] = []) {
  const terms = fold(search).split(/\s+/).filter(Boolean)
  if (terms.length === 0) return 1
  const [title = "", ...rest] = keywords.map(fold)
  const text = `${title} ${rest.join(" ")}`
  if (!terms.every((term) => text.includes(term))) return 0
  if (title.startsWith(terms.join(" "))) return 1
  return terms.every((term) => title.includes(term)) ? 0.8 : 0.4
}

/** True while the user is typing somewhere, so "/" stays a normal character there. */
function isEditing(target: EventTarget | null) {
  return target instanceof HTMLElement && (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName))
}

/** ⌘K / Ctrl K (or "/") quick search over the guides and every component page. */
export function SearchCommand({ items }: { items: SearchItem[] }) {
  const router = useRouter()
  const [open, setOpen] = React.useState(false)
  const [mac, setMac] = React.useState(true)

  const groups = React.useMemo(() => {
    const map = new Map<string, SearchItem[]>()
    for (const item of items) map.set(item.group, [...(map.get(item.group) ?? []), item])
    return [...map]
  }, [items])

  React.useEffect(() => {
    if (!/Mac|iPhone|iPad/.test(navigator.platform)) setMac(false)
    const onKey = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        setOpen((value) => !value)
      } else if (event.key === "/" && !isEditing(event.target)) {
        event.preventDefault()
        setOpen(true)
      }
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [])

  const go = (href: string) => {
    setOpen(false)
    router.push(href)
  }

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        aria-label="Tìm kiếm"
        className="w-9 justify-center border-input bg-field px-0 text-tertiary hover:border-input hover:text-foreground md:w-60 md:justify-start md:px-3"
        onClick={() => setOpen(true)}
      >
        <Search />
        <span className="hidden flex-1 text-left md:inline">Tìm trang, component…</span>
        <Kbd className="hidden md:inline-flex" modifier={mac ? "command" : undefined}>
          {mac ? "K" : "Ctrl K"}
        </Kbd>
      </Button>
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        title="Tìm trong tài liệu"
        description="Gõ tên trang hoặc component để mở"
      >
        <Command filter={score}>
          <CommandInput placeholder="Tìm trang, component…" />
          <CommandList className="max-h-[min(24rem,60dvh)]">
            <CommandEmpty>Không tìm thấy gì.</CommandEmpty>
            {groups.map(([group, groupItems]) => (
              <CommandGroup key={group} heading={group}>
                {groupItems.map((item) => {
                  const Icon = item.href.startsWith("/docs/components/") ? Component : BookOpen
                  return (
                    <CommandItem
                      key={item.href}
                      value={item.href}
                      keywords={[item.title, ...item.keywords]}
                      onSelect={() => go(item.href)}
                    >
                      <Icon className="text-tertiary group-data-selected/command-item:text-accent-foreground" />
                      {item.title}
                    </CommandItem>
                  )
                })}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  )
}

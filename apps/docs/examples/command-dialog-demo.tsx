"use client"

import * as React from "react"
import { Clapperboard, Crown, Tv } from "lucide-react"

import { Button } from "@hwagfu/frameui/button"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@hwagfu/frameui/command"
import { Kbd } from "@hwagfu/frameui/kbd"

export default function CommandDialogDemo() {
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "j" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        setOpen((value) => !value)
      }
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [])

  return (
    <>
      <Button variant="secondary" onClick={() => setOpen(true)}>
        Mở bảng lệnh <Kbd modifier="command">J</Kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen} title="Bảng lệnh" description="Tìm lệnh để chạy">
        <CommandInput placeholder="Tìm kiếm…" />
        <CommandList>
          <CommandEmpty>Không có kết quả.</CommandEmpty>
          <CommandGroup heading="Đi tới">
            <CommandItem onSelect={() => setOpen(false)}>
              <Clapperboard /> Phim lẻ
            </CommandItem>
            <CommandItem onSelect={() => setOpen(false)}>
              <Tv /> Phim bộ
            </CommandItem>
            <CommandItem onSelect={() => setOpen(false)}>
              <Crown /> Gói VIP
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}

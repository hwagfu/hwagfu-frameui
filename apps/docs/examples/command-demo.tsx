import { Clapperboard, Crown, Settings, Tv, User } from "lucide-react"

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@hwagfu/frameui/command"

export default function CommandDemo() {
  return (
    <Command className="w-full max-w-md border border-border shadow-floating">
      <CommandInput placeholder="Gõ lệnh hoặc tên phim…" />
      <CommandList>
        <CommandEmpty>Không có kết quả.</CommandEmpty>
        <CommandGroup heading="Gợi ý">
          <CommandItem>
            <Clapperboard /> Phim lẻ mới
          </CommandItem>
          <CommandItem>
            <Tv /> Phim bộ đang chiếu
          </CommandItem>
          <CommandItem>
            <Crown /> Nâng cấp VIP
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Tài khoản">
          <CommandItem>
            <User /> Hồ sơ <CommandShortcut>⌘P</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <Settings /> Cài đặt <CommandShortcut>⌘,</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  )
}

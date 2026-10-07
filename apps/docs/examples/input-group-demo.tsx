import { ArrowUp, AtSign, Search } from "lucide-react"

import { Kbd } from "@hwagfu/frameui/kbd"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@hwagfu/frameui/input-group"

export default function InputGroupDemo() {
  return (
    <div className="grid w-full max-w-md gap-4">
      {/* Ô tìm kiếm của FrameON: viên thuốc, cao 46px */}
      <form action="/browse" role="search">
        <InputGroup className="h-[46px] rounded-full">
          <InputGroupInput name="q" type="search" placeholder="Tìm phim, diễn viên…" />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
          <InputGroupAddon align="inline-end">
            <Kbd modifier="command">K</Kbd>
          </InputGroupAddon>
        </InputGroup>
      </form>
      <InputGroup>
        <InputGroupAddon>
          <AtSign />
        </InputGroupAddon>
        <InputGroupInput placeholder="ten-nguoi-dung" />
        <InputGroupAddon align="inline-end">
          <InputGroupText>.frameon.vn</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupTextarea placeholder="Viết bình luận về bộ phim…" />
        <InputGroupAddon align="block-end">
          <InputGroupText>0/500</InputGroupText>
          <InputGroupButton size="icon-xs" variant="golden" className="ml-auto" aria-label="Gửi">
            <ArrowUp />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}

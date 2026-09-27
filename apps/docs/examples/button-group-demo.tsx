import { ChevronDown, Minus, Plus } from "lucide-react"

import { Button } from "@hwagfu/frameui/button"
import { ButtonGroup, ButtonGroupSeparator, ButtonGroupText } from "@hwagfu/frameui/button-group"

export default function ButtonGroupDemo() {
  return (
    <div className="flex flex-col items-start gap-4">
      <ButtonGroup>
        <Button variant="secondary">Tập trước</Button>
        <Button variant="secondary">Danh sách tập</Button>
        <Button variant="secondary">Tập sau</Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="golden">Xem ngay</Button>
        <ButtonGroupSeparator />
        <Button variant="golden" size="icon" aria-label="Chọn chất lượng">
          <ChevronDown />
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="outline" size="icon-sm" aria-label="Giảm">
          <Minus />
        </Button>
        <ButtonGroupText className="h-8">1080p</ButtonGroupText>
        <Button variant="outline" size="icon-sm" aria-label="Tăng">
          <Plus />
        </Button>
      </ButtonGroup>
    </div>
  )
}

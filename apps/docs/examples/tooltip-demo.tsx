import { Download, Heart, Share2 } from "lucide-react"

import { Button } from "@hwagfu/frameui/button"
import { Kbd } from "@hwagfu/frameui/kbd"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@hwagfu/frameui/tooltip"

export default function TooltipDemo() {
  return (
    <TooltipProvider>
      <div className="flex items-center gap-2">
        <Tooltip>
          <TooltipTrigger render={<Button variant="ghost" size="icon" aria-label="Yêu thích" />}>
            <Heart />
          </TooltipTrigger>
          <TooltipContent>Thêm vào yêu thích</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger render={<Button variant="ghost" size="icon" aria-label="Tải về" />}>
            <Download />
          </TooltipTrigger>
          <TooltipContent side="bottom">
            Tải về <Kbd>D</Kbd>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger render={<Button variant="ghost" size="icon" aria-label="Chia sẻ" />}>
            <Share2 />
          </TooltipTrigger>
          <TooltipContent side="right">Chia sẻ</TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  )
}

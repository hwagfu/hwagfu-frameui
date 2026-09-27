import { Badge } from "@hwagfu/frameui/badge"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@hwagfu/frameui/hover-card"

export default function HoverCardDemo() {
  return (
    <HoverCard>
      <HoverCardTrigger href="#" className="text-subtitle text-brand underline-offset-4 hover:underline">
        Hành tinh cát: Phần hai
      </HoverCardTrigger>
      <HoverCardContent className="w-72">
        <div className="flex gap-3">
          <img
            src="https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=160&h=240&fit=crop&q=60"
            alt=""
            className="h-[96px] w-16 rounded-sm object-cover"
          />
          <div className="flex flex-col gap-1.5">
            <div className="text-subtitle font-bold text-heading">Hành tinh cát: Phần hai</div>
            <div className="text-caption text-muted-foreground">2024 · 166 phút · T13</div>
            <div className="flex gap-1.5">
              <Badge variant="golden">VIP</Badge>
              <Badge variant="secondary">4K</Badge>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}

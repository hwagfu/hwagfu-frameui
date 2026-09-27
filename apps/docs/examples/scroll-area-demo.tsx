import { ScrollArea } from "@hwagfu/frameui/scroll-area"
import { Separator } from "@hwagfu/frameui/separator"

const episodes = Array.from({ length: 24 }, (_, i) => `Tập ${i + 1}`)

export default function ScrollAreaDemo() {
  return (
    <ScrollArea className="h-64 w-56 rounded-md border border-border bg-card">
      <div className="p-4">
        <h4 className="mb-3 text-caption font-medium text-tertiary uppercase">Danh sách tập</h4>
        {episodes.map((ep) => (
          <div key={ep}>
            <div className="text-subtitle">{ep}</div>
            <Separator className="my-2" />
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}

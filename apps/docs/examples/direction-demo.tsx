import { DirectionProvider } from "@hwagfu/frameui/direction"
import { Slider } from "@hwagfu/frameui/slider"

export default function DirectionDemo() {
  return (
    <DirectionProvider direction="rtl">
      <div dir="rtl" className="grid w-full max-w-sm gap-3">
        <p className="text-caption text-muted-foreground">واجهة من اليمين إلى اليسار</p>
        <Slider defaultValue={30} aria-label="RTL" />
      </div>
    </DirectionProvider>
  )
}

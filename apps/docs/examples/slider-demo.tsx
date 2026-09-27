import { Slider } from "@hwagfu/frameui/slider"

export default function SliderDemo() {
  return (
    <div className="grid w-full max-w-sm gap-8">
      <Slider defaultValue={65} aria-label="Âm lượng" />
      <Slider defaultValue={[1990, 2015]} min={1950} max={2026} aria-label="Năm phát hành" />
      <Slider defaultValue={30} disabled aria-label="Không khả dụng" />
    </div>
  )
}

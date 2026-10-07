import { AspectRatio } from "@hwagfu/frameui/aspect-ratio"
import { PosterArt } from "@hwagfu/frameui/poster-art"

export default function PosterArtDemo() {
  return (
    <div className="grid w-full max-w-xl grid-cols-[1fr_1fr_2fr] items-start gap-4">
      <AspectRatio ratio={2 / 3} className="overflow-hidden rounded-md">
        <PosterArt lines={["big", "buck", "bunny"]} background="oklch(0.34 0.06 140)" color="oklch(0.90 0.07 130)" textSize={22} studio="Blender Foundation" />
      </AspectRatio>
      <AspectRatio ratio={2 / 3} className="overflow-hidden rounded-md">
        <PosterArt variant="classic" lines={["elephants", "dream"]} background="oklch(0.32 0.06 50)" color="oklch(0.89 0.06 60)" textSize={13} studio="Blender Foundation" />
      </AspectRatio>
      <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-md">
        <PosterArt ratio="wide" lines={["tears", "of steel"]} background="oklch(0.30 0.04 255)" color="oklch(0.87 0.04 240)" textSize={20} />
      </AspectRatio>
    </div>
  )
}

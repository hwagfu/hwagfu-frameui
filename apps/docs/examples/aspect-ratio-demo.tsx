import { AspectRatio } from "@hwagfu/frameui/aspect-ratio"

export default function AspectRatioDemo() {
  return (
    <div className="w-full max-w-md">
      <AspectRatio ratio={16 / 9} className="rounded-md bg-card-nested">
        <img
          src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=900&q=70"
          alt="Rạp chiếu phim"
          className="size-full rounded-md object-cover"
        />
      </AspectRatio>
    </div>
  )
}

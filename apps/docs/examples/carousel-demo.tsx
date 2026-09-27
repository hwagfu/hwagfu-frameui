import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@hwagfu/frameui/carousel"

const posters = [
  "photo-1440404653325-ab127d49abc1",
  "photo-1478720568477-152d9b164e26",
  "photo-1485846234645-a62644f84728",
  "photo-1517604931442-7e0c8ed2963c",
  "photo-1489599849927-2ee91cede3ba",
  "photo-1536440136628-849c177e76a1",
]

export default function CarouselDemo() {
  return (
    <Carousel opts={{ align: "start" }} className="w-full max-w-lg px-12">
      <CarouselContent>
        {posters.map((id, index) => (
          <CarouselItem key={id} className="basis-1/2 sm:basis-1/3">
            <div className="overflow-hidden rounded-md border border-border bg-card-nested">
              <img
                src={`https://images.unsplash.com/${id}?w=300&h=450&fit=crop&q=60`}
                alt={`Poster ${index + 1}`}
                className="aspect-[2/3] w-full object-cover"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-0" />
      <CarouselNext className="right-0" />
    </Carousel>
  )
}

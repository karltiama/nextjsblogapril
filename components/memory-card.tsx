import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import Image from "next/image"

interface MemoryCardProps {
  title?: string
  date?: string
  photos?: string[]
}

export default function MemoryCard({ 
  title = "Summer Beach Trip", 
  date = "August 15, 2023", 
  photos = [
    "/placeholder.svg?height=400&width=600",
    "/placeholder.svg?height=400&width=600",
    "/placeholder.svg?height=400&width=600"
  ]
}: MemoryCardProps) {
  return (
    <Card className="w-full max-w-md mx-auto overflow-hidden">
      <CardContent className="p-0">
        <div className="relative aspect-video">
          {photos.length > 0 ? (
            <Carousel>
              <CarouselContent>
                {photos.map((photo, index) => (
                  <CarouselItem key={index}>
                    <div className="relative aspect-video">
                      <Image
                        src={photo}
                        alt={`Memory photo ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2" />
              <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2" />
            </Carousel>
          ) : (
            <div className="flex items-center justify-center h-full bg-gray-200">
              <p className="text-gray-500">No photos available</p>
            </div>
          )}
        </div>
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-2">{title}</h2>
          <p className="text-sm text-gray-500">{date}</p>
        </div>
      </CardContent>
    </Card>
  )
}
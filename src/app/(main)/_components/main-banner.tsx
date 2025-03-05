'use client'
import React from 'react'
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem as OrignalCarouselItem,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { cn } from '@/lib/utils';
import { type CarouselApi } from "@/components/ui/carousel"

const CarouselItem = ({ children }: { children: React.ReactNode }) => {
  return (<OrignalCarouselItem>
    <div className='relative w-full h-full'>
      <div className='absolute inset-0 bg-black/30'></div>
      {children}
    </div>
  </OrignalCarouselItem>)
}

const CarouseDots = ({ active, length }: { active: number, length: number }) => {
  return (
    <div className=" absolute bottom-0 w-full flex justify-center gap-2 p-2">
      {
        Array.from({ length }).map((_, index) => {
          return <div key={index} className={cn("w-2 h-2 rounded-full bg-black/80 border border-white", active === index + 1 && "bg-white")}></div>
        })
      }
    </div >
  )
}
const MainBanner = ({
  items
}: {
  items: {
    src: string
  }[]
}) => {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  React.useEffect(() => {
    if (!api) {
      return
    }
    setCurrent(api.selectedScrollSnap() + 1)
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  return (
    <div>
      <Carousel
        setApi={setApi}
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]} opts={{
          loop: true,
        }}>
        <CarouselContent className='unselectable relative'>
          {items.map((item, index) => {
            return (
              <CarouselItem key={index}>
                <Image src={item.src} alt={`main-banner-${index}`} width={1500} height={500} className="m-auto w-full" />
              </CarouselItem>
            )
          }
          )}
        </CarouselContent>
        <CarouseDots length={items.length} active={current} />
      </Carousel>
    </div>
  )
}

export default MainBanner
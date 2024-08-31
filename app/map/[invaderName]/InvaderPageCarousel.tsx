import { Carousel, CarouselContent, CarouselItem } from "@/components/Carousel";
import { HitPlaceholder } from "@/components/Placeholder";
import { SliderActions } from "@/components/SliderActions";
import { BoxClasses } from "@/utils";
import { Card } from "@radix-ui/themes";
import { clsx } from "clsx";
import Image from "next/image";
import React, { FC } from "react";

type InvaderPageCarouselProps = { imageList: string[] };

const InvaderPageCarousel: FC<InvaderPageCarouselProps> = ({ imageList }) => {
  return (
    <Card asChild className="p-0" variant="classic">
      <Carousel className="aspect-square w-full place-self-center sm:h-[40dvh] sm:w-fit">
        <CarouselContent className="flex aspect-square sm:h-[40dvh]">
          {imageList.map((url, i) => (
            <CarouselItem key={i}>
              <Image
                className="h-full w-full object-contain"
                src={url}
                alt="Image not found"
                style={{ objectFit: "contain" }}
                placeholder={HitPlaceholder(400, 400)}
                width={400}
                height={400}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <SliderActions />
      </Carousel>
    </Card>
  );
};

export default InvaderPageCarousel;

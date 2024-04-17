import { Carousel, CarouselContent, CarouselItem } from "@/components/Carousel";
import { HitPlaceholder } from "@/components/Placeholder";
import { SliderActions } from "@/components/SliderActions";
import { BoxClasses } from "@/utils";
import { clsx } from "clsx";
import Image from "next/image";
import React, { FC } from "react";

type InvaderPageCarouselProps = { imageList: string[] };

const InvaderPageCarousel: FC<InvaderPageCarouselProps> = ({ imageList }) => {
  return (
    <Carousel
      className={clsx(BoxClasses, "aspect-square w-full md:h-60 md:w-fit")}
    >
      <CarouselContent className="flex aspect-square md:h-60">
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
  );
};

export default InvaderPageCarousel;

"use client";
import { Carousel, CarouselApi, CarouselContent } from "@/components/Carousel";
import { SliderActions } from "@/components/SliderActions";
import { Badge } from "@radix-ui/themes";
import React, { FC, PropsWithChildren } from "react";

export const ReviewsCarousel: FC<PropsWithChildren> = ({ children }) => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);
  return (
    <Carousel setApi={setApi}>
      <CarouselContent rootClassName="overflow-visible" ml="-3">
        {children}
      </CarouselContent>
      <Badge
        color="gray"
        variant="solid"
        className="absolute bottom-0 right-1/2 z-10 translate-x-1/2 translate-y-1/2"
      >
        {current} / {count}
      </Badge>
      <SliderActions />
    </Carousel>
  );
};

export default ReviewsCarousel;

"use client";
import { Carousel, CarouselApi, CarouselContent } from "@/components/Carousel";
import { SliderActions } from "@/components/SliderActions";
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
      <CarouselContent className="-ml-2" rootClassName="overflow-visible">
        {children || <h1>fesse</h1>}
      </CarouselContent>
      <span className="absolute bottom-0 right-1/2 z-10 flex translate-x-1/2 translate-y-1/2 justify-center border border-dashed border-primary bg-black px-2 py-1">
        {current} / {count}
      </span>

      <SliderActions />
    </Carousel>
  );
};

export default ReviewsCarousel;

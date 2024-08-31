import { CarouselNext, CarouselPrevious } from "@/components/Carousel";
import { IconButton } from "@radix-ui/themes";
import ChevronLeft from "pixelarticons/svg/chevron-left.svg";
import ChevronRight from "pixelarticons/svg/chevron-right.svg";
import React, { FC } from "react";
import { clsx } from "clsx";

export const SliderActions: FC = () => {
  return (
    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
      <CarouselPrevious color="gray" variant="surface" size="3">
        <ChevronLeft className="h-full w-full" />
      </CarouselPrevious>
      <CarouselNext color="gray" variant="surface" size="3">
        <ChevronRight className="h-full w-full" />
      </CarouselNext>
    </div>
  );
};

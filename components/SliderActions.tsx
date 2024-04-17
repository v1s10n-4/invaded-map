import { CarouselNext, CarouselPrevious } from "@/components/Carousel";
import ChevronLeft from "pixelarticons/svg/chevron-left.svg";
import ChevronRight from "pixelarticons/svg/chevron-right.svg";
import React, { FC } from "react";
import { clsx } from "clsx";

const SliderActionClasses = clsx("btn btn-square btn-outline bg-black/70");
export const SliderActions: FC = () => {
  return (
    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
      <CarouselPrevious className={SliderActionClasses}>
        <ChevronLeft className="h-full w-full" />
      </CarouselPrevious>
      <CarouselNext className={SliderActionClasses}>
        <ChevronRight className="h-full w-full" />
      </CarouselNext>
    </div>
  );
};

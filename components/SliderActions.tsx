import { CarouselNext, CarouselPrevious } from "@/components/Carousel";
import { Flex } from "@v1s10n_4/radix-ui-themes";
import ChevronLeft from "pixelarticons/svg/chevron-left.svg";
import ChevronRight from "pixelarticons/svg/chevron-right.svg";
import React, { FC } from "react";

export const SliderActions: FC = () => {
  return (
    <Flex
      justify="between"
      className="absolute left-4 right-4 top-1/2 -translate-y-1/2 transform"
    >
      <CarouselPrevious color="gray" variant="surface" size="3">
        <ChevronLeft className="h-6 w-6" />
      </CarouselPrevious>
      <CarouselNext color="gray" variant="surface" size="3">
        <ChevronRight className="h-6 w-6" />
      </CarouselNext>
    </Flex>
  );
};

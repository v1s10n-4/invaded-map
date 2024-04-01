import { defaultHtmlTextColor } from "@/app/list/utils";
import BuildingCommunity from "pixelarticons/svg/building-community.svg";
import ImageFlash from "pixelarticons/svg/image-flash.svg";
import React, { FC, PropsWithChildren } from "react";
import Placeholder from "@/components/placeholder.svg";

export const SkeletonHit: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="group carousel-item flex flex-col gap-2 border-4 border-double border-primary p-2">
      <div className="relative w-full">
        <Placeholder className="h-full w-full" width={192} height={192} />
        <div className="absolute left-1 top-1 h-[38px] w-32 border border-primary bg-black p-1.5 md:h-6 md:p-1">
          <div className="h-full w-full bg-primary" />
        </div>
        <div className="absolute bottom-1 right-1 h-[38px] w-32 border border-primary bg-black p-1.5 md:h-6 md:p-1">
          <div className="h-full w-full bg-primary" />
        </div>
      </div>
      <div className="flex items-center gap-2 text-xs">
        <ImageFlash className="flex h-5 w-5 shrink-0" />
        <div className="h-4 w-20" style={defaultHtmlTextColor} />
      </div>
      <div className="flex items-center gap-2 text-xs">
        <BuildingCommunity className="h-5 w-5 shrink-0" />
        <div className="h-4 w-40" style={defaultHtmlTextColor} />
      </div>
      {children}
    </div>
  );
};

import { HitPlaceholder } from "@/components/Placeholder";
import { BoxClasses } from "@/utils";
import { clsx } from "clsx";
import Image from "next/image";
import BuildingCommunity from "pixelarticons/svg/building-community.svg";
import Coin from "pixelarticons/svg/coin.svg";
import ImageFlash from "pixelarticons/svg/image-flash.svg";
import React from "react";

const Loading = () => (
  <div className="scrollbar flex flex-col items-center gap-4 p-4 md:flex-row">
    <div className={clsx(BoxClasses, "flex overflow-hidden md:h-60")}>
      <div className="min-w-0 shrink-0 grow-0 basis-full">
        <Image
          className="h-full w-full object-contain"
          src={HitPlaceholder(400, 400)}
          alt="Image not found"
          unoptimized
          style={{ objectFit: "contain" }}
          placeholder={HitPlaceholder(400, 400)}
          width={400}
          height={400}
        />
      </div>
    </div>
    <div className="flex h-full w-full flex-col justify-around gap-4 px-4 sm:flex-row md:flex-col">
      <div className="flex flex-col gap-4">
        <p className="flex items-center gap-2 text-xl">
          <Coin className="h-7 w-7" />
          <span className="font-bold">██</span> points
        </p>
        <p className="flex items-center gap-2">
          <ImageFlash className="h-7 w-7" /> ███████
        </p>
      </div>
      <div className="flex flex-col gap-4">
        <p className="flex items-center gap-2">
          <BuildingCommunity className="h-7 w-7" />
          ███████
        </p>
        <p>Created: ██/██/████</p>
      </div>
    </div>
  </div>
);

export default Loading;

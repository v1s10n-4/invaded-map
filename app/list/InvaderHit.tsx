import { Hit } from "instantsearch.js";
import { Invader } from "@/app/list/page";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import BuildingCommunity from "pixelarticons/svg/building-community.svg";
import ImageFlash from "pixelarticons/svg/image-flash.svg";
import Pin from "pixelarticons/svg/pin.svg";

export const InvaderHit = ({
  name,
  images,
  points,
  state,
  city,
  longitude,
  reportDate,
}: Hit<Invader>) => {
  return (
    <Link
      href={`/map/${name}`}
      className="group carousel-item flex flex-col gap-2 border-4 border-double border-primary p-2"
      key={name}
    >
      <div className="relative w-full">
        <Image
          className="h-fit w-full object-contain"
          src={`/assets/images/invaders/${images[0]}`}
          alt={`${name}'s invader picture`}
          width={192}
          height={192}
        />
        <p className="absolute left-1 top-1 border border-secondary bg-base-100 px-1 py-0.5 text-2xl text-primary md:text-sm">
          {name}
        </p>
        {longitude && (
          <Pin className="absolute right-1 top-1 h-9 w-9 border border-secondary bg-base-100 px-1 py-0.5 text-primary md:h-7 md:w-7 md:px-0.5 md:py-0" />
        )}
        <p className="absolute bottom-1 right-1 border border-secondary bg-base-100 px-1 py-0.5 text-2xl text-primary md:text-sm">
          {points}pts
        </p>
      </div>
      <p className="flex items-center gap-2 text-xs">
        <ImageFlash className="flex h-5 w-5 shrink-0" />
        {state} {reportDate && `(${reportDate})`}
      </p>
      <p className="flex items-center gap-2 text-xs">
        <BuildingCommunity className="h-5 w-5 shrink-0" />
        {city}
      </p>
    </Link>
  );
};

export default InvaderHit;

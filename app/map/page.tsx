"use client";
import React, { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { InvaderWithLocation } from "@/components/Map";
import useIVDMapStore from "@/app/store";
const MapPage: FC = () => {
  const invadersInView = useIVDMapStore((state) => state.invadersInView);
  return (
    <div className="carousel absolute inset-x-2 bottom-2 h-48 rounded-3xl bg-base-200 md:inset-x-4 md:bottom-4">
      {invadersInView.map((invader) => (
        <Link
          key={invader.name}
          href={`/map/${invader.name}`}
          className="carousel-item w-48"
        >
          <Image
            className="w-full"
            src={`/assets/images/invaders/${invader.name}.png`}
            alt={`${invader.name}'s invader picture`}
            width={192}
            height={192}
          />
        </Link>
      ))}
    </div>
  );
};

export default MapPage;

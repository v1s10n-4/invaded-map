"use client";
import React, { FC, Suspense, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import useIVDMapStore from "@/app/store";
import { useRouter } from "next/navigation";

const MapPage: FC = () => {
  const invadersInView = useIVDMapStore((state) => state.invadersInView);
  const [isHydrated, setIsHydrated] = useState(false);

  // Wait till Next.js rehydration completes
  useEffect(() => {
    setIsHydrated(true);
  }, []);
  return (
    <div className="carousel h-full">
      {isHydrated &&
        invadersInView.map((invader) => (
          <Link
            key={invader.name}
            href={`/map/${invader.name}`}
            className="carousel-item w-48"
          >
            <Image
              className="w-full object-cover"
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

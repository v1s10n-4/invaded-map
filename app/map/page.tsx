"use client";
import { HitPlaceholder } from "@/components/Placeholder";
import React, { FC, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import useIVDMapStore from "@/app/store";
import { clsx } from "clsx";

export const runtime = "edge";
const MapPage: FC = () => {
  const invaders = useIVDMapStore((state) => state.invadersInView);
  const [isHydrated, setIsHydrated] = useState(false);

  // Wait till Next.js rehydration completes
  useEffect(() => {
    setIsHydrated(true);
  }, []);
  return (
    <div
      className={`scrollbar carousel-vertical m-0.5 grid h-[calc(100%-4px)] grid-cols-2 gap-0.5 md:grid-cols-3 lg:grid-cols-4`}
    >
      {isHydrated &&
        invaders.slice(0, 20).map((invader) => (
          <Link
            key={invader.n}
            href={`/map/${invader.n}`}
            className={clsx(
              "group carousel-item relative h-fit w-full outline-none",
              "hover:after:absolute hover:after:inset-0 hover:after:border hover:after:border-primary",
              "focus-visible:after:absolute focus-visible:after:inset-0 focus-visible:after:border focus-visible:after:border-primary"
            )}
          >
            <Image
              className="h-fit w-full text-wrap object-contain text-center align-middle text-xs leading-[192px]"
              src={invader.t}
              alt="Image not found"
              placeholder={HitPlaceholder(192, 192)}
              width={192}
              height={192}
            />
            <p className="pointer-events-none absolute left-1 top-1 border border-secondary bg-base-100 px-1 text-lg text-primary group-hover:font-bold group-focus-visible:font-bold">
              {invader.n}
            </p>
          </Link>
        ))}
    </div>
  );
};

export default MapPage;

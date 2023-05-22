import React, { FC } from "react";
import invaders from "@/invaders.json";
import { notFound } from "next/navigation";
import { getInvader } from "@/components/Map";
import { Metadata } from "next";
import Image from "next/image";
import { SliderActions } from "@/components/SliderActions";
import { BoxClasses } from "@/utils";
import { clsx } from "clsx";

const vercelTempUrl = "https://invaded-map-git-dev-v1s10n4.vercel.app";
type Params = { invaderName: string };
type GenerateInvaderMapPageMetadata = ({
  params,
}: {
  params: Params;
}) => Metadata;
export const generateMetadata: GenerateInvaderMapPageMetadata = ({
  params,
}) => {
  const invader = getInvader(params.invaderName);
  return {
    title: `${invader?.name || "Invader not found"} | Invaded Map`,
    description: "Locate all space invaders for Flash Invaders app & more!",
    authors: {
      name: "v1s10n_4",
      url: "https://github.com/v1s10n-4/",
    },
    keywords: ["space", "invader", "map", invader?.name || ""],
    referrer: "origin",
    themeColor: "#000000",
    colorScheme: "dark",
    creator: "v1s10n_4",
    publisher: "not made by invader",
    openGraph: {
      title: invader?.name || "Invader not found | Invaded Map",
      description: "Locate all space invaders for Flash Invaders app & more!",
      siteName: "Invaded Map",
      locale: "EN",
      url: `${vercelTempUrl}/map/${invader?.name || 404}`,
      images: `${vercelTempUrl}/api/map/invaders/${invader?.name || 404}/OG`,
      countryName: "France",
    },
    twitter: {
      title: invader?.name || "Invader not found | Invaded Map",
      description: "Locate all space invaders for Flash Invaders app & more!",
      site: "Invaded Map",
      creator: "v1s10n_4",
      images: `${vercelTempUrl}/api/map/invaders/${invader?.name || 404}/OG`,
    },
  };
};

export type InvaderWithImage = {
  name: string;
  images: string[];
  state: string;
  reportDate: string;
  city: string;
  points: string;
};
const InvaderPlacePage: FC<{ params: Params }> = ({
  params: { invaderName },
}) => {
  const invader = invaders.find((i) => i.name === invaderName) as
    | InvaderWithImage
    | undefined;
  if (!invader) notFound();
  return (
    <div className="flex flex-col items-center gap-4 p-4 scrollbar md:flex-row">
      <div className={clsx("relative flex items-center p-0.5", BoxClasses)}>
        <div className="carousel w-full md:h-60">
          {invader.images.map((image, i, arr) => (
            <div key={image} id={`slide${i}`} className="carousel-item w-full">
              <Image
                className="h-full w-full object-contain"
                src={`/assets/images/invaders/${image}`}
                alt={`${invader.name}'s invader picture`}
                priority
                width={400}
                height={400}
              />
            </div>
          ))}
          <SliderActions count={invader.images.length} />
        </div>
      </div>
      <div className="flex h-full w-full flex-col justify-around gap-4 px-4">
        <p className="text-2xl">
          <span className="font-bold">{invader.points}</span> points
        </p>
        <p className="text-xs">
          Last known state: {invader.state} ({invader.reportDate})
        </p>
      </div>
    </div>
  );
};
export default InvaderPlacePage;

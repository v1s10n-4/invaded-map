import React, { FC } from "react";
import invaders from "@/invaders.json";
import { notFound } from "next/navigation";
import { getInvader } from "@/components/Map";
import { Metadata } from "next";
import Image from "next/image";

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
    <div className="mb-4 flex flex-col gap-4 scrollbar">
      <div className="flex items-center">
        {invader.images.map((image) => (
          <Image
            key={image}
            className="h-1/2 w-1/2 object-contain"
            src={`/assets/images/invaders/${image}`}
            alt={`${invader.name}'s invader picture`}
            width={400}
            height={400}
          />
        ))}
      </div>
      <div className="flex h-full w-full flex-col justify-around gap-4 px-4">
        <p className="text-2xl">
          <span className="font-bold">{invader.points}</span> points
        </p>
        <p className="text-xs">
          Last known state: {invader.state} ({invader.reportDate})
        </p>
      </div>
      {/*<pre className="absolute bottom-8 left-8">*/}
      {/*  {JSON.stringify(invader, null, 2)}*/}
      {/*</pre>*/}
    </div>
  );
};
export default InvaderPlacePage;

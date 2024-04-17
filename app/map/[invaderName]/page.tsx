import EditModal from "@/app/map/[invaderName]/EditModal";
import InvaderPageCarousel from "@/app/map/[invaderName]/InvaderPageCarousel";
import { getInvader, getState } from "@/utils/data";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import BuildingCommunity from "pixelarticons/svg/building-community.svg";
import Coin from "pixelarticons/svg/coin.svg";
import ImageFlashIcon from "pixelarticons/svg/image-flash.svg";
import React, { FC, Suspense } from "react";

export const runtime = "edge";

type Params = { invaderName: string };
type GenerateInvaderMapPageMetadata = ({
  params,
}: {
  params: Params;
}) => Promise<Metadata>;

export const generateMetadata: GenerateInvaderMapPageMetadata = async ({
  params,
}) => {
  const invader = await getInvader(params.invaderName);
  const title = invader?.name || "Invader not found";
  const description = `${
    invader ? `Everything about ${invader.name}` : "Locate all space invaders"
  } for Flash Invaders app`;
  return {
    title,
    description,
    authors: {
      name: "v1s10n_4",
      url: "https://github.com/v1s10n-4/",
    },
    keywords: ["space", "invader", "map", invader?.name || ""],
    referrer: "origin",
    creator: "v1s10n_4",
    publisher: "not made by invader",
    openGraph: {
      title,
      description,
      siteName: "Invaded Map",
      locale: "EN",
      url: `${process.env.URL}/map/${invader?.name || 404}`,
      images: `${process.env.URL}/api/invaders/${invader?.name || 404}/OG`,
      countryName: "France",
    },
    twitter: {
      title,
      description,
      site: "Invaded Map",
      creator: "v1s10n_4",
      images: `${process.env.URL}/api/invaders/${invader?.name || 404}/OG`,
    },
  };
};

const InvaderPlacePage: FC<{ params: Params }> = async ({
  params: { invaderName },
}) => {
  const invader = await getInvader(invaderName);
  if (!invader) notFound();
  return (
    <div className="scrollbar flex flex-col items-center gap-4 p-4 md:flex-row">
      <InvaderPageCarousel
        imageList={[invader.thumbnail, ...invader.images.map((x) => x.url)]}
      />
      <div className="relative flex h-full w-full flex-col justify-around gap-4 px-4 sm:flex-row md:flex-col">
        <div className="flex flex-col gap-4">
          <p className="flex items-center gap-2 text-xl">
            <Coin className="h-7 w-7" />
            <span className="font-bold">{invader.points}</span> points
          </p>
          <p className="flex items-center gap-2">
            <ImageFlashIcon className="h-7 w-7" /> {getState(invader.state)}
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <p className="flex items-center gap-2">
            <BuildingCommunity className="h-7 w-7" />
            {invader.city_name}
          </p>
          <p>Created: {new Date(invader.create_date).toLocaleDateString()}</p>
        </div>
        <Suspense fallback={<div>loading</div>}>
          <EditModal data={invader} />
        </Suspense>
      </div>
    </div>
  );
};
export default InvaderPlacePage;

import React, { FC } from "react";
import invaders from "@/invaders.json";
import { notFound } from "next/navigation";
import { getInvader } from "@/components/Map";
import { Metadata } from "next";
import { Colors } from "@/utils";

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
    themeColor: Colors.primary,
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

const InvaderPlacePage: FC<{ params: Params }> = ({
  params: { invaderName },
}) => {
  const invader = invaders.find((i) => i.name === invaderName);
  if (!invader) notFound();
  return (
    <div>
      <pre className="absolute bottom-8 left-8">
        {JSON.stringify(invader, null, 2)}
      </pre>
    </div>
  );
};
export default InvaderPlacePage;

import HistoryModalContent from "@/app/map/[invaderName]/historyModalContent";
import InvaderPageCarousel from "@/app/map/[invaderName]/InvaderPageCarousel";
import ThreeDotsMenu from "@/app/map/[invaderName]/ThreeDotsMenu";
import { getInvader, getState } from "@/utils/data";
import { DataList, Flex } from "@v1s10n_4/radix-ui-themes";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import BuildingCommunity from "pixelarticons/svg/building-community.svg";
import Calendar from "pixelarticons/svg/calendar-month.svg";
import Coin from "pixelarticons/svg/coin.svg";
import ImageFlashIcon from "pixelarticons/svg/image-flash.svg";
import React, { FC } from "react";

export const runtime = "edge";

type Params = Promise<{ invaderName: string }>;
type GenerateInvaderMapPageMetadata = ({
  params,
}: {
  params: Params;
}) => Promise<Metadata>;

export const generateMetadata: GenerateInvaderMapPageMetadata = async (
  props
) => {
  const { invaderName } = await props.params;
  const invader = await getInvader(invaderName);
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

const InvaderPlacePage: FC<{ params: Params }> = async (props) => {
  const { invaderName } = await props.params;
  const invader = await getInvader(invaderName);
  if (!invader) notFound();
  return (
    <Flex direction="column" gap="4" p="4">
      <InvaderPageCarousel
        imageList={[invader.thumbnail, ...invader.images.map((x) => x.url)]}
      />
      <Flex
        direction="column"
        gap="2"
        flexGrow="1"
        justify="start"
        align="start"
        position="relative"
      >
        <DataList.Root orientation="horizontal" size="1">
          <DataList.Item>
            <DataList.Label className="flex items-center">
              <Coin className="mr-2 h-6 w-6" />
              Points
            </DataList.Label>
            <DataList.Value>{invader.points}</DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <DataList.Label className="flex items-center">
              <ImageFlashIcon className="mr-2 h-6 w-6" />
              State
            </DataList.Label>
            <DataList.Value>{getState(invader.state)}</DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <DataList.Label className="flex items-center">
              <BuildingCommunity className="mr-2 h-6 w-6" />
              City
            </DataList.Label>
            <DataList.Value>{invader.city_name}</DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <DataList.Label className="flex items-center">
              <Calendar className="mr-2 h-6 w-6" />
              Created
            </DataList.Label>
            <DataList.Value>
              {new Date(invader.create_date).toLocaleDateString()}
            </DataList.Value>
          </DataList.Item>
        </DataList.Root>
        <ThreeDotsMenu invader={invader}>
          <HistoryModalContent {...invader} />
        </ThreeDotsMenu>
      </Flex>
    </Flex>
  );
};
export default InvaderPlacePage;

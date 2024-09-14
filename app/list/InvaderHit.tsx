import { Card } from "@/components/Card";
import { HitPlaceholder } from "@/components/Placeholder";
import { Invader } from "@/db";
import {
  Box,
  DataList,
  Flex,
  Text,
  Tooltip,
  VisuallyHidden,
} from "@v1s10n_4/radix-ui-themes";
import { Hit } from "instantsearch.js";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import BuildingCommunity from "pixelarticons/svg/building-community.svg";
import ImageFlash from "pixelarticons/svg/image-flash.svg";
import Pin from "pixelarticons/svg/pin.svg";

export const InvaderHit = ({
  name,
  thumbnail,
  points,
  state,
  city_name,
  location,
  create_date,
}: Hit<Invader>) => {
  return (
    <Card elevation className="carousel-item group" asChild>
      <Flex direction="column" gap="2" p="2" asChild>
        <Link href={`/map/${name}`} key={name}>
          <div className="relative w-full">
            <Image
              unoptimized
              className="h-fit w-full text-wrap rounded-[--radius-3] object-contain text-center align-middle text-xs leading-[192px]"
              src={thumbnail}
              alt="image not found"
              placeholder={HitPlaceholder(192, 192)}
              width={192}
              height={192}
            />
            <Text
              className="absolute left-1 top-1 rounded-[--radius-1] border border-[--gray-6] bg-[--color-panel-solid] px-1 py-0.5"
              size="4"
            >
              {name}
            </Text>
            {!location && (
              <Tooltip content="location not available">
                <Box
                  className="absolute right-1 top-1 h-9 w-9 rounded-[--radius-1] border border-[--gray-6] bg-[--color-panel-solid]"
                  px="1"
                >
                  <Pin className="h-full w-full" />
                  <Text as="span" size="6" className="absolute left-1 top-0">
                    /
                  </Text>
                </Box>
              </Tooltip>
            )}
            <Text
              className="absolute bottom-1 right-1 rounded-[--radius-1] border border-[--gray-6] bg-[--color-panel-solid] px-1 py-0.5"
              size="3"
            >
              {points}pts
            </Text>
          </div>
          <DataList.Root size="1">
            <DataList.Item align="center">
              <Tooltip content="State">
                <DataList.Label minWidth="24px">
                  <ImageFlash className="h-6 w-6" />
                  <VisuallyHidden>State</VisuallyHidden>
                </DataList.Label>
              </Tooltip>
              <DataList.Value>{state}</DataList.Value>
            </DataList.Item>
            <DataList.Item align="center">
              <Tooltip content="City">
                <DataList.Label minWidth="24px">
                  <BuildingCommunity className="h-6 w-6" />
                  <VisuallyHidden>City</VisuallyHidden>
                </DataList.Label>
              </Tooltip>
              <DataList.Value>{city_name}</DataList.Value>
            </DataList.Item>
          </DataList.Root>
        </Link>
      </Flex>
    </Card>
  );
};

export default InvaderHit;

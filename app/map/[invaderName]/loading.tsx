import { Card, DataList, Flex, Skeleton, Spinner } from "@radix-ui/themes";
import BuildingCommunity from "pixelarticons/svg/building-community.svg";
import Calendar from "pixelarticons/svg/calendar-month.svg";
import Coin from "pixelarticons/svg/coin.svg";
import ImageFlashIcon from "pixelarticons/svg/image-flash.svg";
import React from "react";

const Loading = () => (
  <Flex direction={{ initial: "column", sm: "row" }} gap="4" p="4">
    <Card className="aspect-square h-auto w-full p-16 xs:p-24 sm:h-[40dvh] sm:w-auto sm:p-32">
      <Skeleton>
        <Spinner className="h-full w-full" />
      </Skeleton>
    </Card>
    <Flex
      direction={{ initial: "column", sm: "row", md: "column" }}
      gap="2"
      flexGrow="1"
      justify={{ initial: "start", md: "center" }}
      align={{ initial: "start", sm: "center", md: "start" }}
      position="relative"
    >
      <DataList.Root
        orientation={{ initial: "horizontal", sm: "vertical" }}
        size={{ initial: "1", xs: "2", sm: "3" }}
      >
        <DataList.Item>
          <DataList.Label className="flex items-center">
            <Coin className="mr-2 h-6 w-6" />
            Points
          </DataList.Label>
          <DataList.Value>
            <Skeleton>42</Skeleton>
          </DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label className="flex items-center">
            <ImageFlashIcon className="mr-2 h-6 w-6" />
            State
          </DataList.Label>
          <DataList.Value>
            <Skeleton>Active</Skeleton>
          </DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label className="flex items-center">
            <BuildingCommunity className="mr-2 h-6 w-6" />
            City
          </DataList.Label>
          <DataList.Value>
            <Skeleton>Paris 75017</Skeleton>
          </DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label className="flex items-center">
            <Calendar className="mr-2 h-6 w-6" />
            Created
          </DataList.Label>
          <DataList.Value>
            <Skeleton>{new Date().toLocaleDateString()}</Skeleton>
          </DataList.Value>
        </DataList.Item>
      </DataList.Root>
      <Skeleton
        className="absolute -right-1 top-0"
        width="40px"
        height="40px"
      />
    </Flex>
  </Flex>
);

export default Loading;

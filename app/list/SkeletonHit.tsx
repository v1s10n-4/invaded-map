import { getRandomLengthStringSSR } from "@/app/highscores/utils";
import { Card } from "@/components/Card";
import Placeholder from "@/components/placeholder.svg";
import {
  DataList,
  Flex,
  Skeleton,
  Text,
  Tooltip,
  VisuallyHidden,
} from "@v1s10n_4/radix-ui-themes";
import BuildingCommunity from "pixelarticons/svg/building-community.svg";
import ImageFlash from "pixelarticons/svg/image-flash.svg";
import React, { FC, PropsWithChildren } from "react";

export const SkeletonHit: FC<{ index: number } & PropsWithChildren> = ({
  index,
  children,
}) => {
  return (
    <Card elevation className="carousel-item group" asChild>
      <Flex direction="column" gap="2" p="2">
        <div className="relative w-full">
          <Skeleton>
            <Placeholder
              className="h-full w-full rounded-[--radius-3]"
              width={192}
              height={192}
            />
          </Skeleton>
          <Text
            className="absolute left-1 top-1 rounded-[--radius-1] border border-[--gray-6] bg-[--color-panel-solid] px-1 py-0.5"
            size="4"
          >
            <Skeleton>{getRandomLengthStringSSR(index, 6, 8)}</Skeleton>
          </Text>
          <Text
            className="absolute bottom-1 right-1 rounded-[--radius-1] border border-[--gray-6] bg-[--color-panel-solid] px-1 py-0.5"
            size="3"
          >
            <Skeleton>{getRandomLengthStringSSR(index, 6, 7)}</Skeleton>
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
            <DataList.Value>
              <Skeleton>{getRandomLengthStringSSR(index, 10, 22, 4)}</Skeleton>
            </DataList.Value>
          </DataList.Item>
          <DataList.Item align="center">
            <Tooltip content="City">
              <DataList.Label minWidth="24px">
                <BuildingCommunity className="h-6 w-6" />
                <VisuallyHidden>City</VisuallyHidden>
              </DataList.Label>
            </Tooltip>
            <DataList.Value>
              <Skeleton>{getRandomLengthStringSSR(index, 8, 28, 6)}</Skeleton>
            </DataList.Value>
          </DataList.Item>
        </DataList.Root>
        {children}
      </Flex>
    </Card>
  );
};

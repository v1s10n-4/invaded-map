"use client";
import { Card } from "@/components/Card";
import Icon from "@/components/Icon/Icon";
import { Box, Flex, RadioCards, Tooltip } from "@v1s10n_4/radix-ui-themes";
import { usePathname, useRouter } from "next/navigation";
import ChatIcon from "pixelarticons/svg/chat.svg";
import ListIcon from "pixelarticons/svg/list.svg";
import MapIcon from "pixelarticons/svg/map.svg";
import SearchIcon from "pixelarticons/svg/search.svg";
import React, { FC } from "react";
import CustomThemePopover from "@/app/CustomThemePopover";

type RootNavProps = {};

const RootNav: FC<RootNavProps> = ({}) => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <Box
      position="fixed"
      left="4"
      top="2"
      width="auto"
      className="bottom-16 z-[1] mt-0 hidden h-auto w-auto flex-col justify-between sm:flex pwa:top-[calc(env(safe-area-inset-top)+var(--space-2))]"
    >
      <Card elevation asChild className="flex">
        <Flex direction="column" align="center" gap="4">
          <Icon icon="invadedMap" className="h-12 w-12" />
          <RadioCards.Root
            autoFocus
            value={pathname}
            onValueChange={router.push}
            gap="2"
            columns="1"
          >
            <Tooltip content="Map" side="right">
              <div>
                <RadioCards.Item
                  value={"/map"}
                  className="aspect-square w-fit data-[state=checked]:text-[--accent-9]"
                >
                  <MapIcon className="h-6 w-6" />
                </RadioCards.Item>
              </div>
            </Tooltip>
            <Tooltip content="Search" side="right">
              <div>
                <RadioCards.Item
                  value={"/list"}
                  className="aspect-square w-fit data-[state=checked]:text-[--accent-9]"
                >
                  <SearchIcon className="h-6 w-6" />
                </RadioCards.Item>
              </div>
            </Tooltip>
            <Tooltip content="Highscores" side="right">
              <div>
                <RadioCards.Item
                  value={"/highscores"}
                  className="aspect-square w-fit data-[state=checked]:text-[--accent-9]"
                >
                  <ListIcon className="h-6 w-6" />
                </RadioCards.Item>
              </div>
            </Tooltip>
            <Tooltip content="Help & Support" side="right">
              <div>
                <RadioCards.Item
                  value={"/help"}
                  className="aspect-square w-fit data-[state=checked]:text-[--accent-9]"
                >
                  <ChatIcon className="h-6 w-6" />
                </RadioCards.Item>
              </div>
            </Tooltip>
          </RadioCards.Root>
        </Flex>
      </Card>
      <Card elevation>
        <CustomThemePopover />
      </Card>
    </Box>
  );
};

export default RootNav;

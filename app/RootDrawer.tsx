"use client";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/Drawer";
import Icon from "@/components/Icon/Icon";
import { RadioGroupProps } from "@radix-ui/react-radio-group";
import { Card, Flex, IconButton, RadioCards, Text } from "@radix-ui/themes";
import { usePathname, useRouter } from "next/navigation";
import ChatIcon from "pixelarticons/svg/chat.svg";
import ListIcon from "pixelarticons/svg/list.svg";
import MapIcon from "pixelarticons/svg/map.svg";
import MenuIcon from "pixelarticons/svg/menu.svg";
import SearchIcon from "pixelarticons/svg/search.svg";
import React, { FC, useState } from "react";

type RootDrawerProps = {};

const RootDrawer: FC<RootDrawerProps> = ({}) => {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const onValueChange: RadioGroupProps["onValueChange"] = (value) => {
    setOpen(false);
    router.push(value as "/");
  };
  return (
    <Drawer
      direction="left"
      open={open}
      onOpenChange={setOpen}
      shouldScaleBackground={pathname !== "/list"}
    >
      <DrawerTrigger asChild>
        <IconButton size="4" variant="surface" className="flex sm:hidden">
          <MenuIcon className="h-8 w-8" />
          <span className="sr-only">Toggle Menu</span>
        </IconButton>
      </DrawerTrigger>
      <DrawerContent
        forceMount
        className="fixed inset-y-0 left-0 focus-visible:outline-0"
        // prevent lag due to default focus handler
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <Card className="-ml-11 flex h-full w-auto flex-col rounded-l-none pl-14 pt-[env(safe-area-inset-top)] before:rounded-l-none after:!inset-[--base-card-border-width] after:!w-[inherit] after:rounded-l-none">
          <DrawerHeader mb="2">
            <Icon icon="invadedMap" className="mx-auto h-12 w-12" />
          </DrawerHeader>
          <Flex direction="column" px="2">
            <RadioCards.Root
              autoFocus
              value={pathname}
              onValueChange={onValueChange}
              gap="2"
            >
              <RadioCards.Item
                value={"/map"}
                className="justify-start data-[state=checked]:text-[--accent-9]"
              >
                <MapIcon className="h-6 w-6" />
                <Text>Map</Text>
              </RadioCards.Item>
              <RadioCards.Item
                value={"/list"}
                className="justify-start data-[state=checked]:text-[--accent-9]"
              >
                <SearchIcon className="h-6 w-6" />
                <Text>Search</Text>
              </RadioCards.Item>
              <RadioCards.Item
                value={"/highscores"}
                className="justify-start data-[state=checked]:text-[--accent-9]"
              >
                <ListIcon className="h-6 w-6" />
                <Text>Highscores</Text>
              </RadioCards.Item>
              <RadioCards.Item
                value={"/help"}
                className="justify-start data-[state=checked]:text-[--accent-9]"
              >
                <ChatIcon className="h-6 w-6" />
                <Text>Help & Support</Text>
              </RadioCards.Item>
            </RadioCards.Root>
          </Flex>
          <DrawerFooter>Settings</DrawerFooter>
        </Card>
      </DrawerContent>
    </Drawer>
  );
};

export default RootDrawer;

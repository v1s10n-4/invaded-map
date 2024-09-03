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
import MenuIcon from "pixelarticons/svg/menu.svg";
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
    <Drawer direction="left" open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <IconButton size="4" variant="surface">
          <MenuIcon className="h-8 w-8" />
          <span className="sr-only">Toggle Menu</span>
        </IconButton>
      </DrawerTrigger>
      <DrawerContent asChild forceMount>
        <Card className="fixed bottom-0 left-0 -ml-11 flex h-full w-auto flex-col rounded-l-none pl-14 pt-[env(safe-area-inset-top)] before:rounded-l-none after:!inset-[--base-card-border-width] after:!w-[inherit] after:rounded-l-none focus-visible:outline-0">
          <DrawerHeader mb="2">
            <Icon icon="invadedMap" className="mx-auto h-12 w-12" />
          </DrawerHeader>
          <Flex direction="column" px="2">
            <RadioCards.Root
              autoFocus
              defaultValue={pathname}
              onValueChange={onValueChange}
              gap="2"
            >
              <RadioCards.Item value={"/map"} className="justify-start">
                <Text>Map</Text>
              </RadioCards.Item>
              <RadioCards.Item value={"/list"} className="justify-start">
                <Text>List</Text>
              </RadioCards.Item>
              <RadioCards.Item value={"/highscores"} className="justify-start">
                <Text>Highscores</Text>
              </RadioCards.Item>
              <RadioCards.Item value={"/help"} className="justify-start">
                <Text>help</Text>
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

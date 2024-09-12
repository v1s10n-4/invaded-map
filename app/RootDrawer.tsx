"use client";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/Drawer";
import Icon from "@/components/Icon/Icon";
import { RadioGroupProps } from "@radix-ui/react-radio-group";
import {
  Card,
  Dialog,
  Flex,
  IconButton,
  RadioCards,
  Text,
  useThemeContext,
} from "@radix-ui/themes";
import { usePathname, useRouter } from "next/navigation";
import ChatIcon from "pixelarticons/svg/chat.svg";
import ListIcon from "pixelarticons/svg/list.svg";
import MapIcon from "pixelarticons/svg/map.svg";
import MenuIcon from "pixelarticons/svg/menu.svg";
import SearchIcon from "pixelarticons/svg/search.svg";
import React, { FC, PropsWithChildren, useState } from "react";
import CloseIcon from "pixelarticons/svg/close.svg";
import { CustomThemeForm } from "@/app/CustomThemeForm";
import { DialogProps } from "@radix-ui/react-dialog";
import Fill from "pixelarticons/svg/fill.svg";
import FillHalf from "pixelarticons/svg/fill-half.svg";

type RootDrawerProps = {};

const CustomThemeModal: FC<
  PropsWithChildren<Pick<DialogProps, "onOpenChange">>
> = ({ onOpenChange, children, ...props }) => {
  const [open, setOpen] = React.useState(false);
  const themeContext = useThemeContext();

  return (
    <Dialog.Root
      onOpenChange={(newOpen) => {
        if (onOpenChange) onOpenChange(newOpen);
        setOpen(newOpen);
      }}
      {...props}
    >
      <Dialog.Trigger>{children}</Dialog.Trigger>
      <Dialog.Content
        onInteractOutside={(e) => {
          console.log(e);
          e.preventDefault();
        }}
      >
        <Dialog.Close>
          <IconButton
            size="2"
            color="gray"
            variant="ghost"
            type="button"
            className="absolute right-3 top-3"
          >
            <CloseIcon className="h-6 w-6" />
          </IconButton>
        </Dialog.Close>
        <CustomThemeForm {...themeContext} />
      </Dialog.Content>
    </Dialog.Root>
  );
};

const RootDrawer: FC<RootDrawerProps> = ({}) => {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);

  const themeContext = useThemeContext();
  const [themeModalOpen, setThemeModalOpen] = React.useState(false);

  const onValueChange: RadioGroupProps["onValueChange"] = (value) => {
    setOpen(false);
    if (value === "theme") {
      setThemeModalOpen(true);
    } else {
      router.push(value as "/");
    }
  };

  return (
    <>
      <Dialog.Root open={themeModalOpen} onOpenChange={setThemeModalOpen}>
        <Dialog.Content>
          <Dialog.Close>
            <IconButton
              size="2"
              color="gray"
              variant="ghost"
              type="button"
              className="absolute right-3 top-3"
            >
              <CloseIcon className="h-6 w-6" />
            </IconButton>
          </Dialog.Close>
          <CustomThemeForm {...themeContext} />
        </Dialog.Content>
      </Dialog.Root>
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
            <RadioCards.Root
              autoFocus
              value={pathname}
              onValueChange={onValueChange}
              gap="2"
            >
              <Flex direction="column" px="2">
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
                <RadioCards.Item
                  value={"theme"}
                  className="justify-start data-[state=checked]:text-[--accent-9]"
                >
                  {open ? (
                    <Fill className="h-6 w-6" />
                  ) : (
                    <FillHalf className="h-6 w-6" />
                  )}
                  Customize
                </RadioCards.Item>
              </Flex>
            </RadioCards.Root>
          </Card>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default RootDrawer;

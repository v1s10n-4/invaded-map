"use client";
import SideMenuContentMobile from "@/components/SideMenuContentMobile";
import {
  Drawer,
  DrawerContent,
  DrawerOverlay,
  DrawerPortal,
  DrawerTrigger,
} from "@/components/Drawer";
import MenuIcon from "pixelarticons/svg/menu.svg";
import React from "react";

const SidebarMobile = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <Drawer direction="left" open={open} onOpenChange={setOpen}>
      <DrawerTrigger className="btn btn-square btn-ghost outline-none lg:hidden">
        <MenuIcon className="h-full w-full text-primary" />
        <span className="sr-only">Toggle Menu</span>
      </DrawerTrigger>
      <DrawerPortal>
        <DrawerOverlay className="fixed inset-0 bg-black/10" />
        <DrawerContent className="fixed bottom-0 left-0 h-full w-80 gap-3 rounded-none border-y-0 border-r-4 border-double border-primary bg-base-100 p-4 outline-none">
          <SideMenuContentMobile onOpenChange={setOpen} />
        </DrawerContent>
      </DrawerPortal>
    </Drawer>
  );
};

export default SidebarMobile;

"use client";

import { Flex, Grid, Heading, Theme, Text, Dialog } from "@radix-ui/themes";
import {
  ComponentPropsAs,
  ComponentPropsWithout,
} from "@radix-ui/themes/src/helpers";
import * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul";

import { cn } from "@/lib/utils";

const Drawer = ({
  shouldScaleBackground = true,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) => (
  <DrawerPrimitive.Root
    shouldScaleBackground={shouldScaleBackground}
    {...props}
  />
);
Drawer.displayName = "Drawer";

const DrawerTrigger = DrawerPrimitive.Trigger;

const DrawerPortal = DrawerPrimitive.Portal;

const DrawerClose = DrawerPrimitive.Close;

const DrawerOverlay = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Overlay
    ref={ref}
    className={cn("rt-BaseDialogOverlay rt-DialogOverlay", className)}
    {...props}
  />
));
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName;

const DrawerContent = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DrawerPortal>
    <Theme>
      <DrawerOverlay />
      <DrawerPrimitive.Content
        ref={ref}
        className={cn(
          // "bg-background fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border",
          // "rt-BaseDialogContent rt-DialogContent",
          "fixed bottom-0 left-0 mr-[--space-5] flex h-full w-auto flex-col rounded-r-[--radius-5] bg-[--accent-2]",
          className
        )}
        {...props}
      >
        {/*<div className="bg-muted mx-auto mt-4 h-2 w-[100px] rounded-full" />*/}
        {children}
      </DrawerPrimitive.Content>
    </Theme>
  </DrawerPortal>
));
DrawerContent.displayName = "DrawerContent";

const DrawerHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <Grid
    gap="1"
    p="4"
    className={cn("text-center sm:text-left", className)}
    {...props}
  />
);
DrawerHeader.displayName = "DrawerHeader";

const DrawerFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <Flex direction="column" gap="2" p="4" mt="auto" {...props} />
);
DrawerFooter.displayName = "DrawerFooter";

type DrawerTitleElement = React.ElementRef<typeof Heading>;
type DrawerTitleProps = ComponentPropsWithout<typeof Heading, "asChild">;
const DrawerTitle = React.forwardRef<DrawerTitleElement, DrawerTitleProps>(
  (props, forwardedRef) => (
    <DrawerPrimitive.Title asChild>
      <Heading
        size="5"
        mb="3"
        trim="start"
        {...props}
        asChild={false}
        ref={forwardedRef}
      />
    </DrawerPrimitive.Title>
  )
);
DrawerTitle.displayName = "DrawerTitle";

type DrawerDescriptionElement = HTMLParagraphElement;
type DrawerDescriptionProps = ComponentPropsAs<typeof Text, "p">;
const DrawerDescription = React.forwardRef<
  DrawerDescriptionElement,
  DrawerDescriptionProps
>((props, forwardedRef) => (
  <DrawerPrimitive.Description asChild>
    <Text as="p" size="3" {...props} asChild={false} ref={forwardedRef} />
  </DrawerPrimitive.Description>
));
DrawerDescription.displayName = "DrawerDescription";

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
};

"use client";

import { cn } from "@/lib/utils";
import { Flex, FlexProps, Grid, Heading, Text, Theme } from "@radix-ui/themes";
import {
  ComponentPropsAs,
  ComponentPropsWithout,
} from "@radix-ui/themes/src/helpers";
import * as React from "react";
import { ComponentProps } from "react";
import { Drawer as DrawerPrimitive } from "vaul";

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
>((props, ref) => (
  <DrawerPortal>
    <Theme>
      <DrawerPrimitive.Content ref={ref} {...props} />
    </Theme>
  </DrawerPortal>
));
DrawerContent.displayName = "DrawerContent";

const DrawerHeader = ({ className, ...props }: ComponentProps<typeof Grid>) => (
  <Grid
    gap="1"
    p="4"
    className={cn("text-center sm:text-left", className)}
    {...props}
  />
);
DrawerHeader.displayName = "DrawerHeader";

const DrawerFooter = ({ className, ...props }: FlexProps) => (
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

"use client";
import {
  Badge,
  Button,
  Card,
  IconButton,
  Inset,
  ScrollArea,
  Separator,
  VisuallyHidden,
} from "@v1s10n_4/radix-ui-themes";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/Drawer";
import BellIcon from "@/app/bell.svg";
import BellRingIcon from "@/app/bell-ring.svg";
import React, { ComponentProps, FC } from "react";
import { useCounts } from "@novu/react";
import NotificationList from "@/app/NotificationList";

const NotificationTrigger: FC<ComponentProps<typeof IconButton>> = (props) => {
  const { counts, isFetching, isLoading } = useCounts({
    filters: [{ read: false }],
  });
  return (
    <IconButton
      size="3"
      variant="ghost"
      color="gray"
      mr="2"
      className="relative"
      {...props}
    >
      <div>
        {counts && counts[0].count > 0 && (isLoading || isFetching) ? (
          <BellRingIcon className="h-8 w-8" />
        ) : (
          <BellIcon className="h-8 w-8" />
        )}

        {counts && counts[0].count > 0 && (
          <Badge color="red" className="absolute right-0 top-0">
            {counts[0].count}
          </Badge>
        )}
        <VisuallyHidden>
          Notification Center ({counts && counts[0].count} unread)
        </VisuallyHidden>
      </div>
    </IconButton>
  );
};

const NotificationCenter = () => {
  return (
    <Drawer direction="top" modal={false}>
      <DrawerTrigger asChild>
        <NotificationTrigger />
      </DrawerTrigger>
      <DrawerContent
        className="fixed right-0 top-2 max-h-[98dvh] focus-visible:outline-0 sm:right-2 sm:top-24"
        asChild
      >
        <Card className="mx-2 flex max-w-screen-xs flex-col rounded-t-none pb-[env(safe-area-inset-top)] [box-shadow:--shadow-5] before:rounded-b-none after:!inset-[--base-card-border-width] after:rounded-t-none">
          <DrawerHeader pt="2">
            <DrawerTitle align="center" size="1" mb="0">
              Notifications
            </DrawerTitle>
            <VisuallyHidden>
              <DrawerDescription></DrawerDescription>
            </VisuallyHidden>
          </DrawerHeader>
          <Inset side="x">
            <Separator size="4" mb="3" />
          </Inset>
          <ScrollArea>
            <NotificationList />
          </ScrollArea>
          <Inset side="x">
            <Separator size="4" mt="3" />
          </Inset>
          <DrawerFooter px="0" py="3">
            <DrawerClose asChild>
              <Button variant="surface" color="gray">
                Close
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </Card>
      </DrawerContent>
    </Drawer>
  );
};

export default NotificationCenter;

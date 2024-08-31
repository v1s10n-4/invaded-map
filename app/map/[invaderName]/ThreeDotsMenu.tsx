"use client";
import EditModal from "@/app/map/[invaderName]/EditModal";
import HistoryIcon from "@/app/map/[invaderName]/history.svg";
import { Dialog } from "@/components/Dialog";
import { Invader } from "@/db";
import { DropdownMenu, IconButton, Text } from "@radix-ui/themes";
import EditIcon from "pixelarticons/svg/edit.svg";
import MoreVerticalIcon from "pixelarticons/svg/more-vertical.svg";
import React, { FC, PropsWithChildren, useState } from "react";

type ThreeDotsMenuProps = { invader: Invader } & PropsWithChildren;

const ThreeDotsMenu: FC<ThreeDotsMenuProps> = ({ invader, children }) => {
  const [dialogOpen, setDialogOpen] = useState<Record<string, boolean>>({});

  const handleDialogToggle = (id: string, open: boolean) => {
    setDialogOpen((prev) => ({ ...prev, [id]: open }));
  };
  return (
    <>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <IconButton
            className="absolute -right-1 top-0"
            size="3"
            variant="surface"
          >
            <MoreVerticalIcon className="h-6 w-6" />
          </IconButton>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content align="end" loop>
          <DropdownMenu.Label>More</DropdownMenu.Label>
          <DropdownMenu.Separator />
          <DropdownMenu.Group>
            <DropdownMenu.Item
              onSelect={() => handleDialogToggle("edit", true)}
            >
              <EditIcon className="h-6 w-6" />
              <Text as="span">Suggest an edit</Text>
            </DropdownMenu.Item>
            <DropdownMenu.Item
              onSelect={() => handleDialogToggle("history", true)}
            >
              <HistoryIcon className="h-6 w-6" />
              <Text as="span">View history</Text>
            </DropdownMenu.Item>
          </DropdownMenu.Group>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
      <EditModal
        data={invader}
        open={dialogOpen["edit"]}
        onOpenChange={(open) => handleDialogToggle("edit", open)}
      />
      <Dialog
        open={dialogOpen["history"]}
        onOpenChange={(open) => handleDialogToggle("history", open)}
      >
        {children}
      </Dialog>
    </>
  );
};

export default ThreeDotsMenu;

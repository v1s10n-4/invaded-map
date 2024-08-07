"use client";
import EditModal from "@/app/map/[invaderName]/EditModal";
import HistoryIcon from "@/app/map/[invaderName]/history.svg";
import { Dialog } from "@/components/Dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/DropdownMenu";
import { Invader } from "@/db";
import { cn } from "@/lib/utils";
import { tooltipClass } from "@/utils";
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
      <DropdownMenu>
        <DropdownMenuTrigger
          className={cn(
            "btn btn-square btn-outline absolute -right-1 top-0 self-start p-2",
            tooltipClass
          )}
          data-tip="more"
        >
          <MoreVerticalIcon className="h-full w-full" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" loop>
          <DropdownMenuLabel>More</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onSelect={() => handleDialogToggle("edit", true)}>
              <EditIcon className="h-8 w-8" />
              <span>Edit</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={() => handleDialogToggle("history", true)}
            >
              <HistoryIcon className="h-8 w-8" />
              <span>History</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
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

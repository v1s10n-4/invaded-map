"use client";
import React, { FC } from "react";
import {
  IconButton,
  IconButtonProps,
  Popover,
  useThemeContext,
} from "@v1s10n_4/radix-ui-themes";
import Fill from "pixelarticons/svg/fill.svg";
import FillHalf from "pixelarticons/svg/fill-half.svg";
import CloseIcon from "pixelarticons/svg/close.svg";
import { CustomThemeForm } from "@/app/CustomThemeForm";

const CustomThemePopover: FC<IconButtonProps> = ({ children, ...props }) => {
  const [open, setOpen] = React.useState(false);
  const themeContext = useThemeContext();

  return (
    <Popover.Root onOpenChange={(newOpen) => setOpen(newOpen)}>
      <Popover.Trigger>
        <IconButton
          size="4"
          variant="surface"
          color={open ? undefined : "gray"}
          className="aspect-square h-auto w-full"
          {...props}
        >
          {open ? (
            <Fill className="h-6 w-6" />
          ) : (
            <FillHalf className="h-6 w-6" />
          )}
          {children}
        </IconButton>
      </Popover.Trigger>
      <Popover.Content
        onInteractOutside={(e) => {
          console.log(e);
          e.preventDefault();
        }}
        minWidth="30dvw"
        minHeight="30dvh"
        side="right"
        align="end"
        alignOffset={-12}
        sideOffset={20}
      >
        <Popover.Close>
          <IconButton
            size="2"
            color="gray"
            variant="ghost"
            type="button"
            className="absolute right-3 top-3"
          >
            <CloseIcon className="h-6 w-6" />
          </IconButton>
        </Popover.Close>
        <CustomThemeForm {...themeContext} />
      </Popover.Content>
    </Popover.Root>
  );
};

export default CustomThemePopover;

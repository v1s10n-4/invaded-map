"use client";

import {
  Button,
  ButtonProps,
  Card,
  ScrollArea,
  Theme,
} from "@v1s10n_4/radix-ui-themes";
import * as React from "react";
import * as MenuBarPrimitive from "@radix-ui/react-menubar";
import Circle from "pixelarticons/svg/circle.svg";
import ChevronRight from "pixelarticons/svg/chevron-right.svg";
import Check from "pixelarticons/svg/check.svg";
import { cn } from "@/lib/utils";
import "@v1s10n_4/radix-ui-themes/src/components/base-menu.css";

const MenuBarMenu = MenuBarPrimitive.Menu;

const MenuBarGroup = MenuBarPrimitive.Group;

const MenuBarPortal = MenuBarPrimitive.Portal;

const MenuBarSub = MenuBarPrimitive.Sub;

const MenuBarRadioGroup = MenuBarPrimitive.RadioGroup;

const MenuBar = React.forwardRef<
  React.ElementRef<typeof MenuBarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof MenuBarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <MenuBarPrimitive.Root
    ref={ref}
    className={cn(
      "flex gap-1",
      // "flex h-10 items-center gap-1 rounded-[max(var(--radius-3),var(--radius-full))] border border-[--gray-a7] bg-[--color-surface]",
      className
    )}
    asChild
  >
    <Card {...props} />
  </MenuBarPrimitive.Root>
));
MenuBar.displayName = MenuBarPrimitive.Root.displayName;

const MenuBarTrigger = React.forwardRef<
  React.ElementRef<typeof MenuBarPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof MenuBarPrimitive.Trigger> & ButtonProps
>(({ className, ...props }, ref) => (
  <MenuBarPrimitive.Trigger
    ref={ref}
    className={cn("flex shrink", className)}
    asChild
  >
    <Button {...props} />
  </MenuBarPrimitive.Trigger>
));
MenuBarTrigger.displayName = MenuBarPrimitive.Trigger.displayName;

const MenuBarSubTrigger = React.forwardRef<
  React.ElementRef<typeof MenuBarPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof MenuBarPrimitive.SubTrigger> & {
    inset?: boolean;
  }
>(({ className, inset, children, ...props }, ref) => (
  <MenuBarPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "rt-BaseMenuItem",
      "rt-BaseMenuSubTrigger",
      "rt-DropdownMenuItem",
      "rt-DropdownMenuSubTrigger",
      inset && "pl-8",
      className
    )}
    {...props}
  >
    {children}
    <div className="rt-BaseMenuShortcut rt-DropdownMenuShortcut">
      <ChevronRight className="rt-BaseMenuSubTriggerIcon rt-DropdownMenuSubtriggerIcon" />
    </div>
  </MenuBarPrimitive.SubTrigger>
));
MenuBarSubTrigger.displayName = MenuBarPrimitive.SubTrigger.displayName;

const MenuBarSubContent = React.forwardRef<
  React.ElementRef<typeof MenuBarPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof MenuBarPrimitive.SubContent>
>(({ className, children, ...props }, ref) => (
  <MenuBarPrimitive.Portal>
    <Theme>
      <MenuBarPrimitive.SubContent
        ref={ref}
        className={cn(
          "rt-PopperContent",
          "rt-BaseMenuContent",
          "rt-BaseMenuSubContent",
          "rt-DropdownMenuContent",
          "rt-DropdownMenuSubContent",
          "rt-r-size-2 rt-variant-solid",
          className
        )}
        {...props}
        style={{
          // may be wrong, to test
          ["--radix-dropdown-menu-subcontent-transform-origin" as string]:
            "var(--radix-menubar-subcontent-transform-origin)",
          ["--radix-dropdown-menu-subcontent-available-width" as string]:
            "var(--radix-menubar-subcontent-available-width)",
          ["--radix-dropdown-menu-subcontent-available-height" as string]:
            "var(--radix-menubar-subcontent-available-height)",
          ["--radix-dropdown-menu-subtrigger-width" as string]:
            "var(--radix-menubar-subtrigger-width)",
          ["--radix-dropdown-menu-subtrigger-height" as string]:
            "var(--radix-menubar-subtrigger-height)",
        }}
      >
        <ScrollArea type="auto">
          <div className="rt-BaseMenuViewport rt-DropdownMenuViewport">
            {children}
          </div>
        </ScrollArea>
      </MenuBarPrimitive.SubContent>
    </Theme>
  </MenuBarPrimitive.Portal>
));
MenuBarSubContent.displayName = MenuBarPrimitive.SubContent.displayName;

const MenuBarContent = React.forwardRef<
  React.ElementRef<typeof MenuBarPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof MenuBarPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <MenuBarPrimitive.Portal>
    <Theme>
      <MenuBarPrimitive.Content
        ref={ref}
        align="start"
        collisionPadding={10}
        sideOffset={4}
        className={cn(
          "rt-PopperContent rt-BaseMenuContent rt-DropdownMenuContent rt-r-size-2 rt-variant-solid",
          className
        )}
        {...props}
        style={{
          ["--radix-dropdown-menu-content-transform-origin" as string]:
            "var(--radix-menubar-content-transform-origin)",
          ["--radix-dropdown-menu-content-available-width" as string]:
            "var(--radix-menubar-content-available-width)",
          ["--radix-dropdown-menu-content-available-height" as string]:
            "var(--radix-menubar-content-available-height)",
          ["--radix-dropdown-menu-trigger-width" as string]:
            "var(--radix-menubar-trigger-width)",
          ["--radix-dropdown-menu-trigger-height" as string]:
            "var(--radix-menubar-trigger-height)",
        }}
      >
        <ScrollArea type="auto">
          <div className="rt-BaseMenuViewport rt-DropdownMenuViewport">
            {children}
          </div>
        </ScrollArea>
      </MenuBarPrimitive.Content>
    </Theme>
  </MenuBarPrimitive.Portal>
));
MenuBarContent.displayName = MenuBarPrimitive.Content.displayName;

const MenuBarItem = React.forwardRef<
  React.ElementRef<typeof MenuBarPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof MenuBarPrimitive.Item> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <MenuBarPrimitive.Item
    ref={ref}
    className={cn(
      "rt-reset",
      "rt-BaseMenuItem",
      "rt-DropdownMenuItem",
      inset && "pl-8",
      className
    )}
    {...props}
  />
));
MenuBarItem.displayName = MenuBarPrimitive.Item.displayName;

const MenuBarCheckboxItem = React.forwardRef<
  React.ElementRef<typeof MenuBarPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof MenuBarPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <MenuBarPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "rt-BaseMenuItem",
      "rt-BaseMenuCheckboxItem",
      "rt-DropdownMenuItem",
      "rt-DropdownMenuCheckboxItem",
      className
    )}
    checked={checked}
    {...props}
  >
    {children}
    <MenuBarPrimitive.ItemIndicator className="rt-BaseMenuItemIndicator rt-DropdownMenuItemIndicator">
      <Check className="rt-BaseMenuItemIndicatorIcon rt-ContextMenuItemIndicatorIcon" />
    </MenuBarPrimitive.ItemIndicator>
  </MenuBarPrimitive.CheckboxItem>
));
MenuBarCheckboxItem.displayName = MenuBarPrimitive.CheckboxItem.displayName;

const MenuBarRadioItem = React.forwardRef<
  React.ElementRef<typeof MenuBarPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof MenuBarPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <MenuBarPrimitive.RadioItem
    ref={ref}
    className={cn(
      "rt-BaseMenuItem",
      "rt-BaseMenuRadioItem",
      "rt-DropdownMenuItem",
      "rt-DropdownMenuRadioItem",
      className
    )}
    {...props}
  >
    {children}
    <MenuBarPrimitive.ItemIndicator className="rt-BaseMenuItemIndicator rt-DropdownMenuItemIndicator">
      <Circle className="rt-BaseMenuItemIndicatorIcon rt-DropdownMenuItemIndicatorIcon" />
    </MenuBarPrimitive.ItemIndicator>
  </MenuBarPrimitive.RadioItem>
));
MenuBarRadioItem.displayName = MenuBarPrimitive.RadioItem.displayName;

const MenuBarLabel = React.forwardRef<
  React.ElementRef<typeof MenuBarPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof MenuBarPrimitive.Label> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <MenuBarPrimitive.Label
    ref={ref}
    className={cn(
      "rt-BaseMenuLabel",
      "rt-DropdownMenuLabel",
      inset && "pl-8",
      className
    )}
    {...props}
  />
));
MenuBarLabel.displayName = MenuBarPrimitive.Label.displayName;

const MenuBarSeparator = React.forwardRef<
  React.ElementRef<typeof MenuBarPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof MenuBarPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <MenuBarPrimitive.Separator
    ref={ref}
    className={cn(
      "rt-BaseMenuSeparator",
      "rt-DropdownMenuSeparator",
      className
    )}
    {...props}
  />
));
MenuBarSeparator.displayName = MenuBarPrimitive.Separator.displayName;

const MenuBarShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn("rt-BaseMenuShortcut rt-DropdownMenuShortcut", className)}
      {...props}
    />
  );
};
MenuBarShortcut.displayname = "MenuBarShortcut";

export {
  MenuBar,
  MenuBarMenu,
  MenuBarTrigger,
  MenuBarContent,
  MenuBarItem,
  MenuBarSeparator,
  MenuBarLabel,
  MenuBarCheckboxItem,
  MenuBarRadioGroup,
  MenuBarRadioItem,
  MenuBarPortal,
  MenuBarSubContent,
  MenuBarSubTrigger,
  MenuBarGroup,
  MenuBarSub,
  MenuBarShortcut,
};

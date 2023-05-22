"use client";

import * as React from "react";
import * as MenuBarPrimitive from "@radix-ui/react-menubar";
import { Check, ChevronRight, Circle } from "lucide-react";

import { cn } from "@/lib/utils";

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
      "flex h-10 items-center gap-1 border border-primary bg-base-100",
      className
    )}
    {...props}
  />
));
MenuBar.displayName = MenuBarPrimitive.Root.displayName;

const MenuBarTrigger = React.forwardRef<
  React.ElementRef<typeof MenuBarPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof MenuBarPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <MenuBarPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center border border-transparent px-3 py-1.5 text-sm font-medium outline-none focus:border-primary data-[state=open]:text-primary",
      className
    )}
    {...props}
  />
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
      "focus:text-accent-foreground data-[state=open]:text-accent-foreground flex cursor-default select-none items-center px-2 py-1.5 text-sm outline-none focus:bg-primary data-[state=open]:bg-primary",
      inset && "pl-8",
      className
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto h-4 w-4" />
  </MenuBarPrimitive.SubTrigger>
));
MenuBarSubTrigger.displayName = MenuBarPrimitive.SubTrigger.displayName;

const MenuBarSubContent = React.forwardRef<
  React.ElementRef<typeof MenuBarPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof MenuBarPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <MenuBarPrimitive.SubContent
    ref={ref}
    className={cn(
      "text-popover-foreground z-50 min-w-[8rem] overflow-hidden border border-primary bg-base-100 p-1 shadow-md animate-in data-[side=bottom]:slide-in-from-top-1 data-[side=left]:slide-in-from-right-1 data-[side=right]:slide-in-from-left-1 data-[side=top]:slide-in-from-bottom-1",
      className
    )}
    {...props}
  />
));
MenuBarSubContent.displayName = MenuBarPrimitive.SubContent.displayName;

const MenuBarContent = React.forwardRef<
  React.ElementRef<typeof MenuBarPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof MenuBarPrimitive.Content>
>(
  (
    { className, align = "start", alignOffset = -4, sideOffset = 8, ...props },
    ref
  ) => (
    <MenuBarPrimitive.Portal>
      <MenuBarPrimitive.Content
        ref={ref}
        align={align}
        alignOffset={alignOffset}
        sideOffset={sideOffset}
        className={cn(
          "text-popover-foreground z-50 min-w-[12rem] overflow-hidden border border-primary bg-base-100 p-0.5 shadow-md animate-in slide-in-from-top-1",
          className
        )}
        {...props}
      />
    </MenuBarPrimitive.Portal>
  )
);
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
      "focus:text-accent-foreground relative flex cursor-default select-none items-center border border-transparent px-2 py-1.5 text-sm outline-none focus:border-primary data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
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
      "focus:text-accent-foreground relative flex cursor-default select-none items-center border border-transparent py-1.5 pl-8 pr-2 text-sm outline-none focus:border-primary data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <MenuBarPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </MenuBarPrimitive.ItemIndicator>
    </span>
    {children}
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
      "focus:text-accent-foreground relative flex cursor-default select-none items-center py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <MenuBarPrimitive.ItemIndicator>
        <Circle className="h-2 w-2 fill-current" />
      </MenuBarPrimitive.ItemIndicator>
    </span>
    {children}
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
      "px-2 py-1.5 text-sm font-semibold",
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
    className={cn("bg-muted -mx-1 my-1 h-px", className)}
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
      className={cn(
        "text-muted-foreground ml-auto text-xs tracking-widest",
        className
      )}
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

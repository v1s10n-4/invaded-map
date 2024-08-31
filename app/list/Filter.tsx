"use client";
import {
  MenuBarCheckboxItem,
  MenuBarContent,
  MenuBarItem,
  MenuBarMenu,
  MenuBarTrigger,
} from "@/components/MenuBar";
import { ScrollArea } from "@/components/ScrollArea";
import { Text } from "@radix-ui/themes";
import { clsx } from "clsx";
import BuildingCommunity from "pixelarticons/svg/building-community.svg";
import Coin from "pixelarticons/svg/coin.svg";
import ImageFlash from "pixelarticons/svg/image-flash.svg";
import { FC } from "react";
import {
  RefinementListProps,
  useClearRefinements,
  useRefinementList,
} from "react-instantsearch";

export const Filter: FC<RefinementListProps> = (props) => {
  const { items, refine } = useRefinementList(props);
  const { refine: clear, canRefine } = useClearRefinements({
    includedAttributes: [props.attribute],
  });
  const Icon = {
    city: <BuildingCommunity className="h-6 w-6" />,
    points: <Coin className="h-6 w-6" />,
    state: <ImageFlash className="h-6 w-6" />,
  }[props.attribute];
  return (
    <MenuBarMenu>
      <MenuBarTrigger className="h-full w-full justify-center gap-1 py-0 capitalize md:gap-2">
        {Icon}
        <span className="relative flex items-center gap-1">
          <Text as="span" className="hidden md:block">
            {props.attribute}
          </Text>
          {canRefine && (
            <div className="absolute -top-4 right-px border-4 border-primary bg-base-100 md:static md:border-0 md:bg-primary md:px-1 md:pt-0.5 md:text-base-100">
              <span className="hidden text-xs md:block">
                {items.filter((item) => item.isRefined).length}
              </span>
            </div>
          )}
        </span>
      </MenuBarTrigger>
      <MenuBarContent
        align="center"
        className="mx-2 -mb-4 max-w-[calc(100vw-16px)]"
      >
        {canRefine && (
          <MenuBarItem onClick={() => clear()}>
            <span className="mx-auto">Clear</span>
          </MenuBarItem>
        )}
        <ScrollArea type="auto">
          {items.map((item) => (
            <MenuBarCheckboxItem
              key={item.value}
              textValue={item.value}
              checked={item.isRefined}
              onClick={() => refine(item.value)}
              className={clsx(
                "flex justify-between gap-2 text-base",
                item.isRefined && "text-primary"
              )}
            >
              <span className="truncate">{item.label}</span>
              <span>({item.count})</span>
            </MenuBarCheckboxItem>
          ))}
        </ScrollArea>
      </MenuBarContent>
    </MenuBarMenu>
  );
};

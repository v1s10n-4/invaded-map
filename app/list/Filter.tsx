"use client";
import {
  MenuBarCheckboxItem,
  MenuBarContent,
  MenuBarItem,
  MenuBarMenu,
  MenuBarSeparator,
  MenuBarTrigger,
} from "@/components/MenuBar";
import { Badge, Text } from "@radix-ui/themes";
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
      <MenuBarTrigger
        variant="ghost"
        size="3"
        className="relative h-9 w-full justify-center gap-1 py-0 capitalize md:gap-2"
      >
        {Icon}
        <Text as="span" className="hidden md:block">
          {props.attribute}
        </Text>
        {canRefine && (
          <Badge
            className="absolute right-1/2 top-0.5 translate-x-[130%] py-1.5 md:static md:translate-x-0 md:py-0.5"
            variant="solid"
          >
            <span className="hidden md:block">
              {items.filter((item) => item.isRefined).length}
            </span>
          </Badge>
        )}
      </MenuBarTrigger>
      <MenuBarContent>
        {canRefine && (
          <>
            <MenuBarItem onClick={() => clear()}>
              <span className="mx-auto">Reset</span>
            </MenuBarItem>
            <MenuBarSeparator />
          </>
        )}
        {items.map((item) => (
          <MenuBarCheckboxItem
            key={item.value}
            textValue={item.value}
            checked={item.isRefined}
            onClick={() => refine(item.value)}
            className={clsx(
              "flex justify-between gap-2",
              item.isRefined && "text-[--accent-9]"
            )}
          >
            <span className="truncate">{item.label}</span>
            <span>({item.count})</span>
          </MenuBarCheckboxItem>
        ))}
      </MenuBarContent>
    </MenuBarMenu>
  );
};

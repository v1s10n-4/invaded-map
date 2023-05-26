import {
  MenuBarCheckboxItem,
  MenuBarContent,
  MenuBarItem,
  MenuBarMenu,
  MenuBarTrigger,
} from "@/components/MenuBar";
import {
  useClearRefinements,
  useRefinementList,
} from "react-instantsearch-hooks";
import { RefinementListProps } from "react-instantsearch-hooks-web";
import { FC } from "react";
import { clsx } from "clsx";
import BuildingCommunity from "pixelarticons/svg/building-community.svg";
import ImageFlash from "pixelarticons/svg/image-flash.svg";
import Coin from "pixelarticons/svg/coin.svg";

export const Filter: FC<RefinementListProps> = (props) => {
  const { items, refine } = useRefinementList(props);
  const { refine: clear, canRefine } = useClearRefinements({
    includedAttributes: [props.attribute],
  });
  const Icon = {
    city: <BuildingCommunity className="h-7 w-7 text-current md:h-5 md:w-5" />,
    points: <Coin className="h-7 w-7 text-current md:h-5 md:w-5" />,
    state: <ImageFlash className="h-7 w-7 text-current md:h-5 md:w-5" />,
  }[props.attribute];
  return (
    <MenuBarMenu>
      <MenuBarTrigger className="h-full w-full justify-center gap-1 py-0 capitalize md:gap-2 md:text-lg">
        {Icon}
        <span className="relative flex items-center gap-1">
          <span className="hidden md:block">{props.attribute}</span>
          {canRefine && (
            <div className="absolute -top-4 right-px border-4 border-primary bg-base-100 md:static md:border-0 md:bg-primary md:px-1 md:pt-0.5 md:text-base-100">
              <span className="hidden text-xs md:block">
                {items.filter((item) => item.isRefined).length}
              </span>
            </div>
          )}
        </span>
      </MenuBarTrigger>
      <MenuBarContent align="center" className="mx-2 max-w-[calc(100vw-16px)]">
        {canRefine && (
          <MenuBarItem onClick={() => clear()}>
            <span className="mx-auto">Clear</span>
          </MenuBarItem>
        )}
        {items.map((item) => (
          <MenuBarCheckboxItem
            key={item.value}
            textValue={item.value}
            checked={item.isRefined}
            onClick={(e) => {
              console.log(e);
              refine(item.value);
            }}
            className={clsx(
              "flex justify-between gap-2 text-base",
              item.isRefined && "text-primary"
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
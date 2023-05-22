import {
  MenuBarCheckboxItem,
  MenuBarContent,
  MenuBarMenu,
  MenuBarTrigger,
} from "@/components/MenuBar";
import { useRefinementList } from "react-instantsearch-hooks";
import { RefinementListProps } from "react-instantsearch-hooks-web";
import { FC } from "react";
import { clsx } from "clsx";

export const Filter: FC<RefinementListProps> = (props) => {
  const { items, refine } = useRefinementList(props);
  return (
    <MenuBarMenu>
      <MenuBarTrigger className="w-full justify-center text-lg capitalize">
        {props.attribute}
      </MenuBarTrigger>
      <MenuBarContent align="center" className="mx-2">
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
              "flex justify-between gap-2 truncate text-base",
              item.isRefined && "text-primary"
            )}
          >
            {item.label}
            <span>({item.count})</span>
          </MenuBarCheckboxItem>
        ))}
      </MenuBarContent>
    </MenuBarMenu>
  );
};

import BooleanFilter from "@/app/list/BooleanFilter";
import {
  MenuBar,
  MenuBarItem,
  MenuBarMenu,
  MenuBarTrigger,
} from "@/components/MenuBar";
import { Filter } from "@/app/list/Filter";

export const FilterMenu = () => {
  return (
    <MenuBar className="h-full w-full p-px">
      <Filter attribute="city" limit={Infinity} />
      <Filter attribute="points" />
      <Filter attribute="state" />
      <BooleanFilter attribute="location" />
    </MenuBar>
  );
};

export default FilterMenu;

import { MenuBar } from "@/components/MenuBar";
import { Filter } from "@/app/list/Filter";

export const FilterMenu = () => {
  return (
    <MenuBar className="h-full w-full p-px">
      <Filter attribute="city" />
      <Filter attribute="points" />
      <Filter attribute="state" />
    </MenuBar>
  );
};

export default FilterMenu;

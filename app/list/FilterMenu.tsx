import { Filter } from "@/app/list/Filter";
import { MenuBar } from "@/components/MenuBar";

export const FilterMenu = () => {
  return (
    <MenuBar className="h-full w-full border-[--gray-a7] p-1.5">
      <Filter attribute="city" limit={Infinity} />
      <Filter attribute="points" />
      <Filter attribute="state" />
    </MenuBar>
  );
};

export default FilterMenu;

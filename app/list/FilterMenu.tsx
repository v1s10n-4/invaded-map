import { Filter } from "@/app/list/Filter";
import { MenuBar } from "@/components/MenuBar";

export const FilterMenu = () => {
  return (
    <MenuBar className="h-full w-full rounded-[max(var(--radius-3),var(--radius-full))] p-2 px-3.5 after:rounded-[max(var(--radius-3),var(--radius-full))]">
      <Filter attribute="city" limit={Infinity} />
      <Filter attribute="points" />
      <Filter attribute="state" />
    </MenuBar>
  );
};

export default FilterMenu;

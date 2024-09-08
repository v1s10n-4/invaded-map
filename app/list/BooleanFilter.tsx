"use client";
import { MenuBarMenu, MenuBarTrigger } from "@/components/MenuBar";
import Pin from "pixelarticons/svg/pin.svg";
import { FC } from "react";
import {
  ToggleRefinementProps,
  useToggleRefinement,
} from "react-instantsearch";

export const BooleanFilter: FC<ToggleRefinementProps> = (props) => {
  const { value, canRefine, refine, sendEvent, createURL } =
    useToggleRefinement(props);
  const Icon = {
    location: <Pin className="h-7 w-7 text-current md:h-5 md:w-5" />,
  }[props.attribute];
  if (!Icon) {
    console.warn("<BooleanFilter/> attribute prop doesn't match any icon");
  }
  return (
    <MenuBarMenu>
      <MenuBarTrigger
        className="relative disabled:text-white/30"
        disabled={!canRefine}
        onClick={() => refine(value)}
        onKeyDown={(event) => {
          if (!canRefine) return;
          if (["Enter", " "].includes(event.key)) refine(value);
        }}
      >
        {Icon}
        {value.isRefined && (
          <div className="absolute bottom-1 right-1 h-2 w-2 bg-[--accent-7]" />
        )}
      </MenuBarTrigger>
    </MenuBarMenu>
  );
};

export default BooleanFilter;

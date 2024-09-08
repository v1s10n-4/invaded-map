"use client";

import { IconButton, TextField } from "@radix-ui/themes";
import { FC } from "react";
import { SearchBoxProps, useSearchBox } from "react-instantsearch";
import Search from "pixelarticons/svg/search.svg";
import CloseBox from "pixelarticons/svg/close-box.svg";

export const SearchInput: FC<SearchBoxProps> = (props) => {
  const { query, refine, clear } = useSearchBox(props);
  return (
    <TextField.Root
      size="3"
      type="search"
      value={query}
      placeholder="Search"
      className="w-full"
      onChange={(e) => refine(e.target.value)}
    >
      <TextField.Slot>
        <Search className="h-6 w-6" />
      </TextField.Slot>
      {query && (
        <TextField.Slot>
          <IconButton variant="ghost" onClick={clear}>
            <CloseBox className="h-6 w-6" />
          </IconButton>
        </TextField.Slot>
      )}
    </TextField.Root>
  );
};

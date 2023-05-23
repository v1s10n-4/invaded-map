"use client";

import { FC } from "react";
import { SearchBoxProps, useSearchBox } from "react-instantsearch-hooks-web";
import Search from "pixelarticons/svg/search.svg";
import CloseBox from "pixelarticons/svg/close-box.svg";

export const SearchInput: FC<SearchBoxProps> = (props) => {
  const { query, refine, clear } = useSearchBox(props);
  return (
    <div className="relative w-full">
      <Search className="absolute inset-y-0 left-2 h-full w-7 place-self-center md:w-6" />
      <input
        type="text"
        value={query}
        placeholder="Search"
        className="caret input-bordered input w-full border-primary px-10 caret-primary focus:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        onChange={(e) => refine(e.target.value)}
      />
      {query && (
        <button
          onClick={clear}
          className="absolute inset-y-0 right-0 h-full w-10 place-self-center hover:text-primary focus-visible:text-primary"
        >
          <CloseBox className="ml-1 h-6 w-6" />
        </button>
      )}
    </div>
  );
};

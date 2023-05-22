"use client";

import { FC } from "react";
import { SearchBoxProps, useSearchBox } from "react-instantsearch-hooks-web";

export const SearchInput: FC<SearchBoxProps> = (props) => {
  const { query, refine, clear } = useSearchBox(props);
  return (
    <input
      type="text"
      value={query}
      placeholder="Type here"
      className="input-bordered input w-full border-primary"
      onChange={(e) => refine(e.target.value)}
    />
  );
};

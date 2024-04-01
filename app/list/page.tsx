import { ListPage } from "@/app/list/ListPage";
import { createFetchRequester } from "@algolia/requester-fetch";
import React, { FC, PropsWithChildren } from "react";
import algoliasearch from "algoliasearch/lite";
import { SearchInput } from "@/components/SearchInput";
import FilterMenu from "@/app/list/FilterMenu";
import { InstantSearchNext } from "react-instantsearch-nextjs";

export const runtime = "edge";
// export const dynamic = "force-dynamic";

const ListLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex h-full flex-col pt-24 md:pt-28 lg:pt-32">
      <ListPage />
    </div>
  );
};

export default ListLayout;

"use client";
import React, { FC } from "react";
import algoliasearch from "algoliasearch/lite";
import { InstantSearch } from "react-instantsearch-hooks-web";
import InvaderList from "@/app/list/InvaderList";
import { SearchInput } from "@/components/SearchInput";
import FilterMenu from "@/app/list/FilterMenu";

export const runtime = "edge";

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID!,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY!
);

const ListPage: FC = () => {
  return (
    <div className="flex h-full flex-col pt-24 md:pt-28 lg:pt-32">
      <InstantSearch searchClient={searchClient} indexName="invaders">
        <div className="flex flex-row-reverse items-center gap-2 border-b-4 border-double border-primary px-2 pb-2 md:flex-col md:px-4 md:pb-4 lg:px-6 lg:pb-6">
          <FilterMenu />
          <SearchInput />
        </div>
        <InvaderList />
      </InstantSearch>
    </div>
  );
};

export default ListPage;

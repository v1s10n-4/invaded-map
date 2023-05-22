"use client";
import React, { FC } from "react";
import algoliasearch from "algoliasearch/lite";
import { InstantSearch } from "react-instantsearch-hooks-web";
import InvaderList from "@/app/list/InvaderList";
import { SearchInput } from "@/components/SearchInput";
import FilterMenu from "@/app/list/FilterMenu";

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID!,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY!
);

export type Invader = {
  name: string;
  images: string[];
  state: string;
  reportDate: string;
  city: string;
  points: string;
  longitude?: number;
  latitude?: number;
  address?: string;
};
const ListPage: FC = () => {
  return (
    <div className="flex h-full flex-col pt-24">
      <InstantSearch searchClient={searchClient} indexName="invaders">
        <div className="flex flex-col items-center gap-2 border-b-4 border-double border-primary px-2 pb-2 md:px-4 lg:px-6">
          <FilterMenu />
          <SearchInput />
        </div>
        <InvaderList />
      </InstantSearch>
    </div>
  );
};

export default ListPage;

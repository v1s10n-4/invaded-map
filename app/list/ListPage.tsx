"use client";
import FilterMenu from "@/app/list/FilterMenu";
import InvaderList from "@/app/list/InvaderList";
import { SearchInput } from "@/components/SearchInput";
import { createFetchRequester } from "@algolia/requester-fetch";
import algoliasearch from "algoliasearch/lite";
import React, { FC } from "react";
import { InstantSearchNext } from "react-instantsearch-nextjs";

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID!,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY!,
  { requester: createFetchRequester() }
);
export const ListPage: FC = () => {
  return (
    <InstantSearchNext
      searchClient={searchClient}
      indexName="invaders"
      future={{ preserveSharedStateOnUnmount: true }}
      routing
    >
      <div className="flex flex-row-reverse items-center gap-2 border-b-4 border-double border-primary px-2 pb-2 md:flex-col md:px-4 md:pb-4 lg:px-6 lg:pb-6">
        <FilterMenu />
        <SearchInput />
      </div>
      <InvaderList />
    </InstantSearchNext>
  );
};

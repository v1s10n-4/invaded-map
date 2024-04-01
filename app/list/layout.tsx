"use client";
import { createFetchRequester } from "@algolia/requester-fetch";
import React, { FC, PropsWithChildren } from "react";
import algoliasearch from "algoliasearch/lite";
import { SearchInput } from "@/components/SearchInput";
import FilterMenu from "@/app/list/FilterMenu";
import { InstantSearchNext } from "react-instantsearch-nextjs";

export const runtime = "edge";
// export const dynamic = "force-dynamic";

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID!,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY!,
  { requester: createFetchRequester() }
);

const ListLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex h-full flex-col pt-24 md:pt-28 lg:pt-32">
      <InstantSearchNext
        searchClient={searchClient}
        indexName="invaders"
        future={{ preserveSharedStateOnUnmount: true }}
        // routing
      >
        <div className="flex flex-row-reverse items-center gap-2 border-b-4 border-double border-primary px-2 pb-2 md:flex-col md:px-4 md:pb-4 lg:px-6 lg:pb-6">
          <FilterMenu />
          <SearchInput />
        </div>
        {children}
      </InstantSearchNext>
    </div>
  );
};

export default ListLayout;

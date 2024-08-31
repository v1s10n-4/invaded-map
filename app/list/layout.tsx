"use client";
import { createFetchRequester } from "@algolia/requester-fetch";
import { Flex, Separator } from "@radix-ui/themes";
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
    <Flex direction="column" height="100%">
      <InstantSearchNext
        searchClient={searchClient}
        indexName="invaders"
        future={{ preserveSharedStateOnUnmount: true }}
        // routing
      >
        <Flex align="center" gap="2" px="4" pb="2">
          <SearchInput />
          <FilterMenu />
        </Flex>
        <Separator size="4" />
        {children}
      </InstantSearchNext>
    </Flex>
  );
};

export default ListLayout;

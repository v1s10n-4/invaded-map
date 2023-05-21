"use client";
import React, { FC } from "react";
import algoliasearch from "algoliasearch/lite";
import {
  InstantSearch,
  RefinementList,
  SearchBox,
} from "react-instantsearch-hooks-web";
import InvaderList from "@/app/list/InvaderList";

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

// const fesse = async () => {
//   const res = await searchClient.search<Invader>([]);
//   res.results.map(item => item.hits)
// }
// console.log({ res });
const ListPage: FC = () => {
  return (
    <div className="flex h-full flex-col pt-32">
      <InstantSearch searchClient={searchClient} indexName="invaders">
        <SearchBox />
        <RefinementList attribute="city" searchable />
        <RefinementList attribute="points" />
        <InvaderList />
      </InstantSearch>
    </div>
  );
};

export default ListPage;

"use client";
import React from "react";
import { Invader } from "@/app/list/page";
import InfiniteScroll from "react-infinite-scroller";
import {
  useInfiniteHits,
  UseInfiniteHitsProps,
} from "react-instantsearch-hooks";
import InvaderHit from "@/app/list/InvaderHit";
import { Colors } from "@/utils";

const InvaderList = (props: UseInfiniteHitsProps<Invader>) => {
  const { hits, isLastPage, showMore, results } = useInfiniteHits(props);
  return (
    <div
      className="carousel-vertical h-full scroll-pt-4 overflow-y-scroll scrollbar scrollbar-thumb-current scrollbar-track-black"
      style={{ scrollbarColor: Colors.primary }}
    >
      <InfiniteScroll
        className="grid grid-cols-1 gap-4 p-2 sm:grid-cols-2 md:grid-cols-3 md:p-4 lg:p-6 xl:grid-cols-4"
        loadMore={showMore || (() => null)}
        hasMore={!isLastPage}
        useWindow={false}
      >
        {hits.map((hit) => (
          <InvaderHit key={hit.objectID} {...hit} />
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default InvaderList;

"use client";
import InvaderHit from "@/app/list/InvaderHit";
import { SkeletonHit } from "@/app/list/SkeletonHit";
import { Invader } from "@/db";
import { Colors } from "@/utils";
import React, { useState } from "react";
import useInfiniteScroll from "react-infinite-scroll-hook";
import {
  useInfiniteHits,
  UseInfiniteHitsProps,
  useInstantSearch,
} from "react-instantsearch";

const InvaderList = (props: UseInfiniteHitsProps<Invader>) => {
  const { hits, isLastPage, showMore, results } = useInfiniteHits(props);
  const { status } = useInstantSearch();
  const loading = status === "stalled" || status === "loading";
  const [triggered, setTriggered] = useState(false);

  const [sentryRef, { rootRef }] = useInfiniteScroll({
    loading: loading,
    hasNextPage: !isLastPage,
    onLoadMore: showMore,
    disabled: isLastPage || status === "error",
    rootMargin: "0px 0px 400px 0px",
  });

  return (
    <div
      className="scrollbar carousel-vertical h-full scroll-pt-4 overflow-y-scroll scrollbar-thumb-current scrollbar-track-black"
      style={{ scrollbarColor: Colors.primary }}
      ref={rootRef}
    >
      <div className="grid grid-cols-1 gap-4 p-2 sm:grid-cols-2 md:grid-cols-3 md:p-4 lg:p-6 xl:grid-cols-4">
        {hits.map((hit) => (
          <InvaderHit key={hit.id} {...hit} />
        ))}
        {(loading || triggered) &&
          !isLastPage &&
          [...Array(20)].map((_x, i) => <SkeletonHit key={i} />)}
      </div>
      {(loading || !isLastPage) && <div ref={sentryRef}></div>}
    </div>
    // </>
  );
};

export default InvaderList;

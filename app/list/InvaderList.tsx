"use client";
import InvaderHit from "@/app/list/InvaderHit";
import { SkeletonHit } from "@/app/list/SkeletonHit";
import { Invader } from "@/db";
import { Colors } from "@/utils";
import React, { FC, PropsWithChildren, useEffect, useState } from "react";
import useInfiniteScroll from "react-infinite-scroll-hook";
import {
  useInfiniteHits,
  UseInfiniteHitsProps,
  useInstantSearch,
} from "react-instantsearch";

const Grid: FC<PropsWithChildren> = ({ children }) => (
  <div className="grid grid-cols-1 gap-4 p-2 sm:grid-cols-2 md:grid-cols-3 md:p-4 lg:p-6 xl:grid-cols-4">
    {children}
  </div>
);
const InvaderList = (props: UseInfiniteHitsProps<Invader>) => {
  const {
    hits,
    isLastPage,
    showMore: onLoadMore,
    results,
  } = useInfiniteHits(props);
  const { status } = useInstantSearch();
  const loading = status === "stalled" || status === "loading";
  const disabled = isLastPage || status === "error";
  const [mounted, setMounted] = useState(false);
  const [sentryRef, { rootRef }] = useInfiniteScroll({
    loading,
    hasNextPage: !isLastPage,
    onLoadMore,
    disabled,
    rootMargin: "0px 0px 400px 0px",
  });
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      className="scrollbar carousel-vertical h-full scroll-pt-4 overflow-y-scroll scrollbar-thumb-current scrollbar-track-black"
      style={{ scrollbarColor: Colors.primary }}
      ref={rootRef}
    >
      <Grid>
        {(mounted ? hits : results?.hits || []).map((hit) => (
          <InvaderHit key={hit.id} {...hit} />
        ))}
        {!disabled && (
          <>
            <SkeletonHit>
              <div ref={sentryRef} />
            </SkeletonHit>
            {[...Array(19)].map((_x, i) => (
              <SkeletonHit key={"skeleton" + i} />
            ))}
          </>
        )}
      </Grid>
    </div>
  );
};

export default InvaderList;

"use client";
import InvaderHit from "@/app/list/InvaderHit";
import { SkeletonHit } from "@/app/list/SkeletonHit";
import { Invader } from "@/db";
import { Grid, ScrollArea } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";
import useInfiniteScroll from "react-infinite-scroll-hook";
import {
  useInfiniteHits,
  UseInfiniteHitsProps,
  useInstantSearch,
} from "react-instantsearch";

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
    <ScrollArea
      ref={rootRef}
      type="always"
      scrollbars="vertical"
      size="2"
      className="h-[calc(100dvh-(160px+env(safe-area-inset-bottom)))] [&>div]:snap-y [&>div]:snap-mandatory [&>div]:scroll-py-[--space-4] [&>div]:scroll-smooth"
      asChild
    >
      <main>
        <Grid
          columns={{ initial: "1", sm: "2", md: "3", lg: "4" }}
          p="4"
          gap="4"
        >
          {(mounted ? hits : results?.hits || []).map((hit) => (
            <InvaderHit key={hit.id} {...hit} />
          ))}
          {!loading && !disabled && (
            <SkeletonHit index={42}>
              <div ref={sentryRef} />
            </SkeletonHit>
          )}
          {loading &&
            !disabled &&
            [...Array(19)].map((_x, i) => (
              <SkeletonHit key={"skeleton" + i} index={i} />
            ))}
        </Grid>
      </main>
    </ScrollArea>
  );
};

export default InvaderList;

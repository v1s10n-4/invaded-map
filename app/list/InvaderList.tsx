"use client";
import InvaderHit from "@/app/list/InvaderHit";
import { SkeletonHit } from "@/app/list/SkeletonHit";
import { Invader } from "@/db";
import { Colors } from "@/utils";
import { Grid, ScrollArea } from "@radix-ui/themes";
import React, { FC, PropsWithChildren, useEffect, useState } from "react";
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
      className="h-[calc(100dvh-(140px+env(safe-area-inset-bottom)))]"
      asChild
    >
      <main>
        <Grid
          columns={{ initial: "1", sm: "2", md: "3", lg: "4" }}
          p={{ initial: "2", md: "4", lg: "6" }}
          px="4"
          gap="4"
        >
          {(mounted ? hits : results?.hits || []).map((hit) => (
            <InvaderHit key={hit.id} {...hit} />
          ))}
          {!loading && !disabled && (
            <SkeletonHit>
              <div ref={sentryRef} />
            </SkeletonHit>
          )}
          {loading &&
            !disabled &&
            [...Array(19)].map((_x, i) => <SkeletonHit key={"skeleton" + i} />)}
        </Grid>
      </main>
    </ScrollArea>
  );
};

export default InvaderList;

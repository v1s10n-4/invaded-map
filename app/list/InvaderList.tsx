import React from "react";
import { Invader } from "@/app/list/page";
import Image from "next/image";
import Link from "next/link";
import InfiniteScroll from "react-infinite-scroller";
import {
  useInfiniteHits,
  UseInfiniteHitsProps,
} from "react-instantsearch-hooks";
import { Hit } from "instantsearch.js";

export const InvaderHit = ({
  name,
  images,
  points,
  state,
  city,
}: Hit<Invader>) => {
  return (
    <Link
      href={`/map/${name}`}
      className="flex flex-col items-center gap-2 border-4 border-double border-primary p-2"
      key={name}
    >
      <Image
        src={`/assets/images/invaders/${images[0]}`}
        width={200}
        height={200}
        alt={`${name}'s image`}
      />
      <p>{name}</p>
      <p>{points}</p>
      <p>{state}</p>
      <p>{city}</p>
    </Link>
  );
};
const InvaderList = (props: UseInfiniteHitsProps<Invader>) => {
  const { hits, isLastPage, showMore } = useInfiniteHits(props);
  return (
    <div className="h-full overflow-y-scroll scrollbar scrollbar-thumb-current scrollbar-track-black">
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

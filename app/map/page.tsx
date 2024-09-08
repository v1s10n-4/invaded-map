"use client";
import useIVDMapStore from "@/app/store";
import { HitPlaceholder } from "@/components/Placeholder";
import { Card, Grid, Inset, ScrollArea, Text } from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const runtime = "edge";
function MapPage() {
  const invaders = useIVDMapStore((state) => state.invadersInView);
  return (
    <ScrollArea
      type="always"
      scrollbars="vertical"
      size="2"
      className="h-[calc(100%-4px)] [&>div]:snap-y [&>div]:snap-mandatory [&>div]:scroll-smooth"
      asChild
    >
      <main>
        <Grid
          columns={{ initial: "2", sm: "3", md: "4" }}
          gap={{ initial: "1", sm: "2", md: "4" }}
        >
          {invaders.slice(0, 20).map((invader) => (
            <Card
              key={invader.n}
              className="group carousel-item relative aspect-square"
              asChild
            >
              <Link href={`/map/${invader.n}`}>
                <Inset clip="padding-box" side="all">
                  <Image
                    className="h-full w-full text-wrap object-contain text-center align-middle text-xs leading-[192px]"
                    src={invader.t}
                    alt="Image not found"
                    placeholder={HitPlaceholder(192, 192)}
                    width={192}
                    height={192}
                  />
                </Inset>
                <Text
                  className="pointer-events-none absolute left-1 top-1 rounded-[--radius-1] border border-[--gray-6] bg-[--color-panel-solid] px-1 py-0.5"
                  size={{ initial: "2", sm: "3", md: "4" }}
                >
                  {invader.n}
                </Text>
              </Link>
            </Card>
          ))}
        </Grid>
      </main>
    </ScrollArea>
  );
}

export default MapPage;

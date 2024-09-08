import { SkeletonHit } from "@/app/list/SkeletonHit";
import { Grid, ScrollArea } from "@radix-ui/themes";
import React from "react";

export const runtime = "edge";
const ListLoading = () => (
  <ScrollArea
    type="always"
    scrollbars="vertical"
    size="2"
    className="h-[calc(100dvh-(140px+env(safe-area-inset-bottom)))] [&>div]:snap-y [&>div]:snap-mandatory [&>div]:scroll-py-[--space-4] [&>div]:scroll-smooth"
    asChild
  >
    <main>
      <Grid
        columns={{ initial: "1", sm: "2", md: "3", lg: "4" }}
        p={{ initial: "2", md: "4", lg: "6" }}
        px="4"
        gap="4"
      >
        {[...Array(20)].map((_x, i) => (
          <SkeletonHit key={"loading" + i} index={i} />
        ))}
      </Grid>
    </main>
  </ScrollArea>
);
export default ListLoading;

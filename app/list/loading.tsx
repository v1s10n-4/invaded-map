import { SkeletonHit } from "@/app/list/SkeletonHit";
import { Grid, ScrollArea } from "@radix-ui/themes";
import React from "react";

export const runtime = "edge";
// <div className="flex h-full flex-col pt-24 md:pt-28 lg:pt-32">
//   <div className="flex flex-row-reverse items-center gap-2 border-b-4 border-double border-primary px-2 pb-2 md:flex-col md:px-4 md:pb-4 lg:px-6 lg:pb-6">
//     <div className="flex h-12 w-full items-center justify-around gap-1 border border-primary bg-base-100 p-2 md:h-[34px]">
//       <div
//         className="relative h-full w-[30px] md:w-28"
//         style={defaultHtmlTextColor}
//       />
//       <div
//         className="relative h-full w-[30px] md:w-28"
//         style={defaultHtmlTextColor}
//       />
//       <div
//         className="relative h-full w-[30px] md:w-28"
//         style={defaultHtmlTextColor}
//       />
//     </div>
//     <div className="h-12 w-full border border-primary p-2">
//       <div className="h-8 w-8" style={defaultHtmlTextColor} />
//     </div>
//   </div>
// </div>
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

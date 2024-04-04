import { SkeletonHit } from "@/app/list/SkeletonHit";
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
  <main className="scrollbar carousel-vertical h-full scroll-pt-4 overflow-y-scroll scrollbar-thumb-current scrollbar-track-black">
    <div className="grid grid-cols-1 gap-4 p-2 sm:grid-cols-2 md:grid-cols-3 md:p-4 lg:p-6 xl:grid-cols-4">
      {[...Array(20)].map((_x, i) => (
        <SkeletonHit key={"loading" + i} />
      ))}
    </div>
  </main>
);
export default ListLoading;

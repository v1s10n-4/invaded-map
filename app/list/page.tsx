import { ListPage } from "@/app/list/ListPage";
import React, { FC } from "react";

export const runtime = "edge";
export const dynamic = "force-dynamic";

const Page: FC = () => {
  return (
    <div className="flex h-full flex-col pt-24 md:pt-28 lg:pt-32">
      <ListPage />
    </div>
  );
};

export default Page;

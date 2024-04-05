import { InvalidateTag } from "@/app/fesse/InvalidateTag";
import { auth } from "@/auth";
import { TagName, tags } from "@/utils/revalidation-tags";
import { redirect } from "next/navigation";
import React, { FC } from "react";

export const runtime = "edge";
const FessePage: FC = async () => {
  const session = await auth();
  if (!session?.user) return redirect("/signin");
  const user = session.user;
  if (user.role !== "superuser") return redirect("/map");
  return (
    <div className="mx-4 mt-32 flex flex-col gap-2 md:mx-2">
      <details className="collapse collapse-plus bg-base-200">
        <summary className="collapse-title text-xl font-medium">
          Revalidation
        </summary>
        <div className="collapse-content flex flex-col gap-2">
          {Object.keys(tags).map((tagName) => (
            <InvalidateTag
              key={tagName}
              tagName={tagName as TagName}
              isSpecific={typeof tags[tagName as TagName] === "function"}
            />
          ))}
        </div>
      </details>
      <details className="collapse collapse-plus bg-base-200">
        <summary className="collapse-title text-xl font-medium">
          Session
        </summary>
        <div className="collapse-content flex flex-col gap-2">
          <pre className="overflow-scroll text-xs md:text-base">
            {JSON.stringify(session, null, 2)}
          </pre>
        </div>
      </details>
    </div>
  );
};

export default FessePage;

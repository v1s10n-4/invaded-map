import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/Dialog";
import { db, Invader } from "@/db";
import CircleIcon from "pixelarticons/svg/circle.svg";
import React, { FC, Suspense } from "react";

export const InvaderContributionHistory: FC<Invader> = async ({
  id,
  images,
  create_date,
}) => {
  let res = await db.query.contributions.findMany({
    where: (contributions, { eq }) => eq(contributions.entity_id, id),
    orderBy: (contributions, { desc }) => [desc(contributions.created_at)],
  });
  if (res.length === 0 || res[res.length - 1].type !== "create") {
    res.push({
      id: -1,
      reviewer_id: "v1s10n_4",
      created_at: new Date("05-07-2023"),
      comment: `Credits: (${["Awazleon", ...new Set(images.map(({ author }) => author))].join(", ")})`,
      entity_id: -1,
      editor_id: "v1s10n_4",
      data: null,
      type: "create",
    });
  }
  return (
    <ul className="timeline timeline-vertical timeline-compact timeline-snap-icon">
      <li>
        <div className="timeline-middle">
          <CircleIcon className="h-5 w-5 text-primary" />
        </div>
        <p className="timeline-end mt-1.5">Now</p>
        <hr className="bg-current" />
      </li>
      {res.map((contribution, i) => (
        <li key={contribution.id}>
          <hr className="bg-current" />
          <div className="timeline-middle">
            <CircleIcon className="h-5 w-5 text-primary" />
          </div>
          <div className="timeline-end mb-6 mt-2.5 text-sm">
            <p
              className="mb-1"
              title={new Date(contribution.created_at).toLocaleTimeString()}
            >
              {new Date(contribution.created_at).toLocaleDateString()}
            </p>
            <div className="timeline-box border-dashed border-primary">
              {contribution.type === "edit" ? (
                <p>Updated {Object.keys(contribution.data || {}).join(", ")}</p>
              ) : (
                <p>
                  {contribution.type === "create"
                    ? "Added to Invaded Map"
                    : "deleted"}
                </p>
              )}
              {contribution.comment && (
                <p className="mt-1 border-t border-dotted border-current pt-2 text-xs">
                  {contribution.comment}
                </p>
              )}
            </div>
          </div>
          <hr className="bg-current" />
        </li>
      ))}
      <li className="text-sm">
        <hr className="bg-current" />
        <div className="timeline-middle">
          <CircleIcon className="h-5 w-5 text-primary" />
        </div>
        <div className="timeline-end mt-2.5">
          <p className="mb-1">{new Date(create_date).toLocaleDateString()}</p>
          <p className="timeline-box border-dashed border-primary">
            Invader has been installed
          </p>
        </div>
      </li>
    </ul>
  );
};

const HistoryModalContent: FC<Invader> = ({ ...invader }) => {
  return (
    <DialogContent className="flex max-h-dvh flex-col gap-4 p-4">
      <DialogHeader>
        <DialogTitle>Change history</DialogTitle>
      </DialogHeader>
      <Suspense
        fallback={
          <div className="my-12 p-6">
            <div className="flex items-center justify-center p-2">
              <span className="loading loading-bars h-8 w-8" />
            </div>
          </div>
        }
      >
        <InvaderContributionHistory {...invader} />
      </Suspense>
      <DialogFooter className="mt-4">
        <DialogClose className="btn btn-outline w-full" type="button">
          Close
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
};

export default HistoryModalContent;

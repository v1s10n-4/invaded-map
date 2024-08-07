import {
  ContributionData,
  getInvaderHistory,
  getUpdateLabel,
} from "@/app/map/[invaderName]/utils";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/Dialog";
import { VisuallyHidden } from "@/components/VisuallyHidden";
import { Invader, User } from "@/db";
import CircleIcon from "pixelarticons/svg/circle.svg";
import React, { FC, Suspense } from "react";

export const InvaderContributionHistory: FC<Invader> = async ({
  id,
  images,
  create_date,
}) => {
  const getter = await getInvaderHistory(id);
  const res = await getter();
  if (res.length === 0 || res[res.length - 1].type !== "create") {
    res.push({
      id: -1,
      reviewer_id: "v1s10n_4",
      created_at: new Date("05-07-2023"),
      comment: `Photos credits: (${["Awazleon", ...new Set(images.slice(0, 1).map(({ author }) => author))].join(", ")})`,
      entity_id: -1,
      editor_id: "v1s10n_4",
      data: null,
      type: "create",
      editor: {
        name: "v1s10n_4",
      } as User,
    });
  }
  return (
    <ul className="timeline timeline-vertical timeline-compact timeline-snap-icon overflow-auto">
      <li className="relative">
        <div className="timeline-middle sticky top-0">
          <CircleIcon className="h-5 w-5 bg-black text-primary" />
        </div>
        <p className="timeline-end sticky top-0 mt-1.5">Now</p>
        <hr className="bg-current" />
      </li>
      {res.map((contribution, i) => (
        <li className="relative" key={contribution.id}>
          <hr className="bg-current" />
          <div className="timeline-middle sticky top-0">
            <CircleIcon className="h-5 w-5 bg-black text-primary" />
          </div>
          <div className="timeline-end sticky top-0 mb-6 mt-2.5 text-sm">
            <p
              className="mb-1"
              title={new Date(contribution.created_at).toLocaleTimeString()}
            >
              {new Date(contribution.created_at).toLocaleDateString()}
            </p>
            <div className="timeline-box border-dashed border-primary">
              {contribution.type === "edit" ? (
                <p>
                  Updated{" "}
                  {getUpdateLabel(
                    contribution.data as ContributionData<"edit">
                  )}{" "}
                  ({contribution.editor.name})
                </p>
              ) : (
                <p>
                  {contribution.type === "create"
                    ? "Added to Invaded Map"
                    : "deleted"}
                </p>
              )}{" "}
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
      <li className=" text-sm">
        <hr className="bg-current" />
        <div className="timeline-middle sticky top-0">
          <CircleIcon className="h-5 w-5 bg-black text-primary" />
        </div>
        <div className="timeline-end sticky top-0 mt-2.5">
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
        <VisuallyHidden asChild>
          <DialogDescription>
            All changes made to {invader.name} are listed here by date
          </DialogDescription>
        </VisuallyHidden>
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

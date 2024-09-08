"use client";
import { invalidateTag } from "@/app/fesse/actions";
import SubmitButton from "@/components/SubmitButton";
import { TagName } from "@/utils/revalidation-tags";
import Repeat from "pixelarticons/svg/repeat.svg";
import { FC, useActionState } from "react";

type InvalidateTagProps = {
  tagName: TagName;
  isSpecific: boolean;
};

const initialState = {
  message: "",
  error: false,
};

export const InvalidateTag: FC<InvalidateTagProps> = ({
  tagName,
  isSpecific,
}) => {
  const [state, formAction] = useActionState(invalidateTag, initialState);
  return (
    <>
      <form
        action={formAction}
        className="flex items-center justify-between gap-4"
      >
        <div className="flex w-full items-center justify-between">
          <p className="text-xs md:text-base">{tagName}</p>
          <input name="tag" defaultValue={tagName} required hidden />
          {isSpecific && (
            <input
              // required
              min={1}
              max={128}
              name="specific"
              type="text"
              placeholder="value"
              className="input input-sm input-bordered input-primary max-w-32"
            />
          )}
        </div>
        <SubmitButton className="btn-square btn-outline btn-primary btn-sm">
          <Repeat className="h-6 w-6" />
        </SubmitButton>
      </form>
      {(state.error || state.message) && (
        <p className={state.error ? "text-error" : "text-success"}>
          {state.message}
        </p>
      )}
    </>
  );
};

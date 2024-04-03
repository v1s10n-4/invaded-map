"use client";
import { invalidateTag } from "@/app/fesse/actions";
import { TagName } from "@/utils/revalidation-tags";
import { FC } from "react";
import { useFormState, useFormStatus } from "react-dom";
import Repeat from "pixelarticons/svg/repeat.svg";

type InvalidateTagProps = {
  tagName: TagName;
  isSpecific: boolean;
};

const initialState = {
  message: "",
  error: false,
};

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <button
      className="btn btn-square btn-outline btn-primary btn-sm"
      disabled={pending}
    >
      {pending ? (
        <span className="loading loading-spinner loading-sm" />
      ) : (
        <Repeat className="h-6 w-6" />
      )}
    </button>
  );
};
export const InvalidateTag: FC<InvalidateTagProps> = ({
  tagName,
  isSpecific,
}) => {
  const [state, formAction] = useFormState(invalidateTag, initialState);
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
        <SubmitButton />
      </form>
      {(state.error || state.message) && (
        <p className={state.error ? "text-error" : "text-success"}>
          {state.message}
        </p>
      )}
    </>
  );
};

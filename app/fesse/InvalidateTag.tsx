"use client";
import { invalidateTag } from "@/app/fesse/actions";
import SubmitButton from "@/components/SubmitButton";
import { TagName } from "@/utils/revalidation-tags";
import { Text, TextField } from "@radix-ui/themes";
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
          <Text size={{ initial: "1", sm: "2" }}>{tagName}</Text>
          <input name="tag" defaultValue={tagName} required hidden />
          {isSpecific && (
            <TextField.Root
              // required
              min={1}
              max={128}
              name="specific"
              type="text"
              placeholder="value"
              className="max-w-32"
            />
          )}
        </div>
        <SubmitButton className="aspect-square p-0">
          <Repeat className="h-6 w-6" />
        </SubmitButton>
      </form>
      {(state.error || state.message) && (
        <Text color={state.error ? "red" : "gray"}>{state.message}</Text>
      )}
    </>
  );
};

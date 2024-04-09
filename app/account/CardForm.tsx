"use client";
import { CardContent, CardFooter } from "@/components/Card";
import SubmitButton from "@/components/SubmitButton";
import { cn } from "@/lib/utils";
import { clsx } from "clsx";
import React, {
  DO_NOT_USE_OR_YOU_WILL_BE_FIRED_EXPERIMENTAL_FORM_ACTIONS,
  FC,
  PropsWithChildren,
} from "react";
import { useFormState } from "react-dom";
import { SafeParseSuccess } from "zod";
import { typeToFlattenedError } from "zod/lib/ZodError";

type CardFormState =
  | SafeParseSuccess<Record<string, string[]>>
  | { success: false; errors: typeToFlattenedError<any>["fieldErrors"] };

type CardFormAction = (state: CardFormState, formData: FormData) => any;

type CardFormProps = {
  action: CardFormAction;
  deleteAction?: (formData: FormData) => void;
  name: string;
  submitText?: string;
} & PropsWithChildren;

const CardForm: FC<CardFormProps> = ({
  action,
  name,
  submitText = "Save",
  deleteAction,
  children,
}) => {
  const [state, formAction] = useFormState(action, { success: true });
  return (
    <form action={formAction}>
      <CardContent>
        {children}
        {!state.success && (
          <div className="label">
            <span className="label-text-alt text-error">
              {state.errors[name]?.join(", ")}
            </span>
          </div>
        )}
      </CardContent>
      <CardFooter
        className={cn(
          "border-t border-primary px-6 py-4",
          deleteAction && "justify-between"
        )}
      >
        {deleteAction && (
          <SubmitButton
            formAction={deleteAction}
            className="btn-outline btn-primary"
          >
            Delete
          </SubmitButton>
        )}
        <SubmitButton className="btn-primary">{submitText}</SubmitButton>
      </CardFooter>
    </form>
  );
};

export default CardForm;

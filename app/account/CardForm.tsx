"use client";
import { CardContent, CardFooter } from "@/components/Card";
import SubmitButton from "@/components/SubmitButton";
import React, { FC, PropsWithChildren } from "react";
import { useFormState } from "react-dom";
import { SafeParseSuccess } from "zod";
import { typeToFlattenedError } from "zod/lib/ZodError";

type CardFormState =
  | SafeParseSuccess<Record<string, string[]>>
  | { success: false; errors: typeToFlattenedError<any>["fieldErrors"] };

type CardFormAction = (state: CardFormState, formData: FormData) => any;

type CardFormProps = {
  action: CardFormAction;
  name: string;
} & PropsWithChildren;

const CardForm: FC<CardFormProps> = ({ action, name, children }) => {
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
      <CardFooter className="border-t border-primary px-6 py-4">
        <SubmitButton className="btn-outline btn-primary">Save</SubmitButton>
      </CardFooter>
    </form>
  );
};

export default CardForm;

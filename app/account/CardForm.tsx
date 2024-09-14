"use client";
import { CardContent, CardFooter } from "@/components/Card";
import SubmitButton from "@/components/SubmitButton";
import { Separator, Text } from "@v1s10n_4/radix-ui-themes";
import React, { FC, PropsWithChildren, useActionState } from "react";
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
  showSubmit?: boolean;
} & PropsWithChildren;

const CardForm: FC<CardFormProps> = ({
  action,
  name,
  submitText = "Save",
  showSubmit = true,
  deleteAction,
  children,
}) => {
  const [state, formAction] = useActionState(action, { success: true });
  return (
    <form action={formAction}>
      <CardContent>
        {children}
        {!state.success && (
          <Text size="1" className="text-[--red-9]">
            {state.errors[name]?.join(", ")}
          </Text>
        )}
      </CardContent>
      {showSubmit && (
        <>
          <Separator size="4" mb="5" />
          <CardFooter justify={deleteAction ? "between" : "end"}>
            {deleteAction && (
              <SubmitButton variant="outline" formAction={deleteAction}>
                Delete
              </SubmitButton>
            )}
            <SubmitButton>{submitText}</SubmitButton>
          </CardFooter>
        </>
      )}
    </form>
  );
};

export default CardForm;

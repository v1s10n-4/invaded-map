"use client";
import { CardContent, CardFooter } from "@/components/Card";
import SubmitButton from "@/components/SubmitButton";
import { Flex, Separator, Text } from "@radix-ui/themes";
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
          <Text size="1" className="text-[--red-9]">
            {state.errors[name]?.join(", ")}
          </Text>
        )}
      </CardContent>
      <Separator size="4" mb="5" />
      <CardFooter justify={deleteAction ? "between" : "end"}>
        {deleteAction && (
          <SubmitButton variant="outline" formAction={deleteAction}>
            Delete
          </SubmitButton>
        )}
        <SubmitButton>{submitText}</SubmitButton>
      </CardFooter>
    </form>
  );
};

export default CardForm;

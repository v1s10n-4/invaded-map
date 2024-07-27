"use client";
import { UpdateInvaderResponse } from "@/app/map/[invaderName]/actions";
import { FC, FormHTMLAttributes, PropsWithChildren, useEffect } from "react";
import { useFormState } from "react-dom";

type EditFormProps = {
  action: (
    state: Awaited<UpdateInvaderResponse>,
    formData: FormData
  ) => UpdateInvaderResponse | Promise<UpdateInvaderResponse>;
} & PropsWithChildren;

const initialState = {
  errors: [],
  success: false,
};

const EditForm: FC<EditFormProps> = ({ action, children }) => {
  const [state, formAction] = useFormState(action, initialState);
  useEffect(() => {
    if (state.success) {
      console.log("success");
    }
  }, [state.success]);
  return (
    <>
      <form action={formAction} id="edit-form" className="overflow-auto">
        {children}
      </form>
      {!state.success &&
        state.errors.map((message, i) => (
          <p key={i} className="text-xs text-error">
            {message}
          </p>
        ))}
    </>
  );
};

export default EditForm;

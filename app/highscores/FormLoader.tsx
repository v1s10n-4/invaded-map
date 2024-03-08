"use client";

import { useFormState, useFormStatus } from "react-dom";

export const FormLoader = () => {
  const { pending } = useFormStatus();
  return (
    pending && (
      <div className="mt-2x mx-1 flex justify-center border border-primary p-4 uppercase ring-1 ring-primary ring-offset-2 ring-offset-black">
        LOADING...
      </div>
    )
  );
};

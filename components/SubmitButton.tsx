"use client";
import { Button, ButtonProps } from "@v1s10n_4/radix-ui-themes";
import { FC, forwardRef } from "react";
import { useFormStatus } from "react-dom";

type SubmitButtonProps = ButtonProps;

const SubmitButton: FC<SubmitButtonProps> = forwardRef<
  HTMLButtonElement,
  ButtonProps
>(({ children, ...rest }, ref) => {
  const { pending: loading } = useFormStatus();
  const props = {
    ref,
    loading,
    ...rest,
  };
  return <Button {...props}>{children}</Button>;
});

SubmitButton.displayName = "SubmitButton";

export default SubmitButton;

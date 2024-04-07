"use client";
import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, FC, HTMLAttributes } from "react";
import { useFormStatus } from "react-dom";

type SubmitButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const SubmitButton: FC<SubmitButtonProps> = ({
  className,
  children,
  ...props
}) => {
  const { pending } = useFormStatus();
  return (
    <button className={cn("btn", className)} disabled={pending} {...props}>
      {pending ? (
        <span className="loading loading-spinner loading-sm" />
      ) : (
        children
      )}
    </button>
  );
};

export default SubmitButton;
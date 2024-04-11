"use client";
import { tooltipClass } from "@/utils";
import { clsx } from "clsx";
import CopyIcon from "pixelarticons/svg/copy.svg";
import ChechIcon from "pixelarticons/svg/check.svg";
import React, { ButtonHTMLAttributes, FC, useCallback, useState } from "react";

type CopyLinkButtonProps = {
  link: string;
  icons?: boolean | "only";
  tooltip?: string;
  confirmationMessage?: string;
  confirmationDuration?: number;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const CopyLinkButton: FC<CopyLinkButtonProps> = ({
  link,
  icons = true,
  tooltip = false,
  confirmationMessage = "copied",
  confirmationDuration = 1500,
  className,
  children = "Copy",
  ...props
}) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const copyToClipboard = useCallback(async () => {
    await navigator.clipboard.writeText(link);
    setShowConfirmation(true);
    const timer = setTimeout(
      () => setShowConfirmation(false),
      confirmationDuration
    );
    return () => clearTimeout(timer);
  }, [confirmationDuration, link]);
  return (
    <button
      onClick={copyToClipboard}
      type="button"
      className={clsx(tooltipClass, className)}
      data-tip={showConfirmation ? "copied" : "copy"}
      {...props}
    >
      {icons &&
        (showConfirmation ? (
          <ChechIcon className="h-6 w-6" />
        ) : (
          <CopyIcon className="h-6 w-6" />
        ))}
      {icons !== "only" && (showConfirmation ? confirmationMessage : children)}
    </button>
  );
};

export default CopyLinkButton;

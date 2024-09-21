"use client";
import {
  IconButton,
  IconButtonProps,
  Tooltip,
} from "@v1s10n_4/radix-ui-themes";
import ChechIcon from "pixelarticons/svg/check.svg";
import CopyIcon from "pixelarticons/svg/copy.svg";
import React, { FC, useCallback, useState } from "react";

type CopyLinkButtonProps = {
  link: string;
  icons?: boolean | "only";
  tooltip?: string;
  confirmationMessage?: string;
  confirmationDuration?: number;
} & IconButtonProps;

const CopyLinkButton: FC<CopyLinkButtonProps> = ({
  link,
  icons = true,
  tooltip = false,
  confirmationMessage = "copied",
  confirmationDuration = 1500,
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
    <Tooltip content={showConfirmation ? "copied" : "copy"}>
      <IconButton onClick={copyToClipboard} type="button" {...props}>
        {icons &&
          (showConfirmation ? (
            <ChechIcon className="h-6 w-6" />
          ) : (
            <CopyIcon className="h-6 w-6" />
          ))}
        {icons !== "only" &&
          (showConfirmation ? confirmationMessage : children)}
      </IconButton>
    </Tooltip>
  );
};

export default CopyLinkButton;

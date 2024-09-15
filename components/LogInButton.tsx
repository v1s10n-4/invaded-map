"use client";
import { IconButton } from "@v1s10n_4/radix-ui-themes";
import { signIn } from "next-auth/react";
import LoginIcon from "pixelarticons/svg/login.svg";
import React, { FC } from "react";

type LogInButtonProps = {};

const LogInButton: FC<LogInButtonProps> = ({}) => {
  return (
    <IconButton variant="outline" size="4" onClick={() => signIn()}>
      <LoginIcon className="h-8 w-8" />
    </IconButton>
  );
};

export default LogInButton;

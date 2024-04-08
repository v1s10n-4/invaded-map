"use client";
import { MobileLink } from "@/components/SideMenuContentMobile";
import { BoxActiveClasses, BoxClasses, BoxHoverClasses } from "@/utils";
import { clsx } from "clsx";
import { SessionContextValue, signIn } from "next-auth/react";
import LoginIcon from "pixelarticons/svg/login.svg";
import React, { FC } from "react";

export const AuthButton: FC<Pick<SessionContextValue, "status">> = ({
  status,
}) => {
  const btnClass = clsx(
    "mt-auto flex items-center justify-between",
    "px-4 py-2 align-middle text-xl text-primary",
    BoxClasses,
    BoxHoverClasses,
    BoxActiveClasses
  );
  return {
    unauthenticated: (
      <button className={btnClass} onClick={() => signIn()}>
        Log In
        <LoginIcon className="h-7 w-7" />
      </button>
    ),
    authenticated: (
      <MobileLink href={"/account"} className={btnClass}>
        Account
      </MobileLink>
    ),
    loading: (
      <div className={btnClass}>
        <span className="loading loading-bars h-7 w-7" />
      </div>
    ),
  }[status];
};

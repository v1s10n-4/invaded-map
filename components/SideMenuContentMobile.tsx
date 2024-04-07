"use client";
import { cn } from "@/lib/utils";
import { BoxActiveClasses, BoxClasses, BoxHoverClasses } from "@/utils";
import { clsx } from "clsx";
import { signIn, useSession } from "next-auth/react";
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import LoginIcon from "pixelarticons/svg/login.svg";
import React, { FC } from "react";

type MobileLinkProps<RouteInferType = any> = LinkProps<RouteInferType> & {
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
};

const itemClass = clsx(
  "px-4 py-2 align-middle text-xl text-primary",
  BoxClasses,
  BoxHoverClasses,
  BoxActiveClasses
);

const MobileLink = ({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: MobileLinkProps) => {
  const router = useRouter();
  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString());
        onOpenChange?.(false);
      }}
      className={clsx(className)}
      {...props}
    >
      {children}
    </Link>
  );
};

const AuthButton: FC = () => {
  const { status } = useSession();
  const btnClass = cn(itemClass, "mt-auto flex items-center justify-between");
  return {
    unauthenticated: (
      <button className={btnClass} onClick={() => signIn()}>
        Log In
        <LoginIcon className="h-8 w-8" />
      </button>
    ),
    authenticated: (
      <MobileLink href={"/account"} className={btnClass}>
        Account
      </MobileLink>
    ),
    loading: (
      <div className={btnClass}>
        <span className="loading loading-bars" />
      </div>
    ),
  }[status];
};

export const SideMenuContentMobile: FC<
  Pick<MobileLinkProps, "onOpenChange">
> = ({ onOpenChange }) => {
  return (
    <>
      <MobileLink
        href={"/map"}
        onOpenChange={onOpenChange}
        className={itemClass}
      >
        Map
      </MobileLink>
      <MobileLink
        href={"/list"}
        onOpenChange={onOpenChange}
        className={itemClass}
      >
        All invaders
      </MobileLink>
      <MobileLink
        href={"/highscores"}
        onOpenChange={onOpenChange}
        className={itemClass}
      >
        Highscores
      </MobileLink>
      <AuthButton />
      <MobileLink
        href={"/help"}
        onOpenChange={onOpenChange}
        className={itemClass}
      >
        Help
      </MobileLink>
    </>
  );
};

export default SideMenuContentMobile;

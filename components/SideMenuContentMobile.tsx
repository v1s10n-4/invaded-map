"use client";
import { AuthButton } from "@/components/AuthButton";
import { cn } from "@/lib/utils";
import { BoxActiveClasses, BoxClasses, BoxHoverClasses } from "@/utils";
import { clsx } from "clsx";
import { SessionContextValue, signIn, useSession } from "next-auth/react";
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import LoginIcon from "pixelarticons/svg/login.svg";
import React, { FC } from "react";

type MobileLinkProps<RouteInferType = any> = LinkProps<RouteInferType> & {
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
};

export const itemClass = clsx(
  "px-4 py-2 align-middle text-xl text-primary",
  BoxClasses,
  BoxHoverClasses,
  BoxActiveClasses
);

export const MobileLink = ({
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
      className={className}
      {...props}
    >
      {children}
    </Link>
  );
};

export const SideMenuContentMobile: FC<
  Pick<MobileLinkProps, "onOpenChange">
> = ({ onOpenChange }) => {
  const { status } = useSession();
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
      <AuthButton status={status} />
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

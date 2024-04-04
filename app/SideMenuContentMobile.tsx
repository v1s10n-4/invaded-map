"use client";
import { BoxActiveClasses, BoxClasses, BoxHoverClasses } from "@/utils";
import { clsx } from "clsx";
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import React, { FC } from "react";

type MobileLinkProps<RouteInferType = any> = LinkProps<RouteInferType> & {
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
};

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

export const SideMenuContentMobile: FC<
  Pick<MobileLinkProps, "onOpenChange">
> = ({ onOpenChange }) => {
  return (
    <>
      <MobileLink
        href={"/map"}
        onOpenChange={onOpenChange}
        className={clsx(
          "px-4 py-2 align-middle text-xl text-primary",
          BoxClasses,
          BoxHoverClasses,
          BoxActiveClasses
        )}
      >
        Map
      </MobileLink>
      <MobileLink
        href={"/list"}
        onOpenChange={onOpenChange}
        className={clsx(
          "px-4 py-2 align-middle text-xl text-primary",
          BoxClasses,
          BoxHoverClasses,
          BoxActiveClasses
        )}
      >
        All invaders
      </MobileLink>
      <MobileLink
        href={"/highscores"}
        onOpenChange={onOpenChange}
        className={clsx(
          "px-4 py-2 align-middle text-xl text-primary",
          BoxClasses,
          BoxHoverClasses,
          BoxActiveClasses
        )}
      >
        Highscores
      </MobileLink>
      <MobileLink
        href={"/help"}
        onOpenChange={onOpenChange}
        className={clsx(
          "px-4 py-2 align-middle text-xl text-primary",
          BoxClasses,
          BoxHoverClasses,
          BoxActiveClasses
        )}
      >
        Help
      </MobileLink>
    </>
  );
};

export default SideMenuContentMobile;

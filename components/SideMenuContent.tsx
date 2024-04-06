import UserProfile from "@/components/UserProfile";
import { BoxActiveClasses, BoxClasses, BoxHoverClasses } from "@/utils";
import { clsx } from "clsx";
import Link from "next/link";
import React, { FC } from "react";

export const SideMenuContent: FC = () => {
  return (
    <>
      <Link
        href={"/map"}
        className={clsx(
          "px-4 py-2 align-middle text-xl text-primary",
          BoxClasses,
          BoxHoverClasses,
          BoxActiveClasses
        )}
      >
        Map
      </Link>
      <Link
        href={"/list"}
        className={clsx(
          "px-4 py-2 align-middle text-xl text-primary",
          BoxClasses,
          BoxHoverClasses,
          BoxActiveClasses
        )}
      >
        All invaders
      </Link>
      <Link
        href={"/highscores"}
        className={clsx(
          "px-4 py-2 align-middle text-xl text-primary",
          BoxClasses,
          BoxHoverClasses,
          BoxActiveClasses
        )}
      >
        Highscores
      </Link>
      <UserProfile />
      <Link
        href={"/help"}
        className={clsx(
          "px-4 py-2 align-middle text-xl text-primary",
          BoxClasses,
          BoxHoverClasses,
          BoxActiveClasses
        )}
      >
        Help
      </Link>
    </>
  );
};

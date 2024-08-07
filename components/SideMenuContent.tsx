import { auth } from "@/auth";
import { AuthButton } from "@/components/AuthButton";
import { BoxActiveClasses, BoxClasses, BoxHoverClasses } from "@/utils";
import { clsx } from "clsx";
import Link from "next/link";
import React, { FC, Suspense } from "react";

const UserProfile: FC = async () => {
  const session = await auth();
  return (
    <AuthButton
      status={session?.user?.id ? "authenticated" : "unauthenticated"}
    />
  );
};

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
      <Suspense
        fallback={
          <div
            className={clsx(
              "mt-auto flex items-center justify-center px-4 py-2 text-xl text-primary",
              BoxClasses,
              BoxHoverClasses,
              BoxActiveClasses
            )}
          >
            <span className="loading loading-bars h-7 w-7" />
          </div>
        }
      >
        <UserProfile />
      </Suspense>
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

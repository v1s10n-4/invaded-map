import { signInAction } from "@/app/actions";
import { auth } from "@/auth";
import { BoxActiveClasses, BoxClasses, BoxHoverClasses } from "@/utils";
import { clsx } from "clsx";
import Link from "next/link";
import LoginIcon from "pixelarticons/svg/login.svg";
import React, { FC, Suspense } from "react";

const UserProfile: FC = async () => {
  const session = await auth();
  return (
    <form
      className={clsx(
        "mt-auto flex w-full items-center justify-between text-xl text-primary",
        BoxClasses,
        BoxHoverClasses,
        BoxActiveClasses
      )}
    >
      {session?.user ? (
        <Link href={"/account"} className="w-full px-4 py-2">
          Account
        </Link>
      ) : (
        <button formAction={signInAction} className="w-full px-4 py-2">
          Log In
          <LoginIcon className="h-8 w-8" />
        </button>
      )}
    </form>
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
            <span className="loading loading-bars" />
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

import SidebarMobile from "@/components/SidebarMobile";
import { BoxClasses } from "@/utils";
import { clsx } from "clsx";
import Link from "next/link";
import React from "react";

export const Header = () => {
  return (
    <header className="sticky inset-x-2 top-2 z-10 place-self-center md:top-5 md:w-fit">
      <nav className={clsx("navbar bg-base-100", BoxClasses, "!py-0")}>
        <div className="navbar-start">
          <SidebarMobile />
        </div>
        <div className="navbar-center">
          <Link
            href={"/"}
            className={clsx(
              "box-border border-y-2 border-transparent pt-1 text-2xl uppercase text-primary outline-none",
              "hover:border-y-2 hover:border-primary hover:font-bold focus-visible:border-y-2",
              "focus-visible:border-primary focus-visible:font-bold active:border-dashed",
              "sm:text-4xl lg:pt-1.5 lg:text-5xl"
            )}
          >
            <h1>Invaded map</h1>
          </Link>
        </div>
        <div className="navbar-end"></div>
      </nav>
    </header>
  );
};

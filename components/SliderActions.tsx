"use client";
import ChevronLeft from "pixelarticons/svg/chevron-left.svg";
import ChevronRight from "pixelarticons/svg/chevron-right.svg";
import React, { FC, useCallback, useEffect, useState } from "react";
import { clsx } from "clsx";

type SliderActionsProps = {
  count: number;
  id?: string;
};

const SliderActionClasses = clsx(
  "h-10 w-10 flex justify-center align-center bg-base-100 box-border",
  "hover:text-primary hover:ring-1 hover:ring-primary",
  "focus-visible:text-primary focus-visible:ring-1 focus-visible:ring-primary"
);
const useHash = () => {
  const [hash, setHash] = useState<string>();

  const handleHashChange = useCallback<(e: HashChangeEvent) => void>(
    (e) => setHash(new URL(e.newURL).hash),
    []
  );

  useEffect(() => {
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [handleHashChange]);

  return hash;
};
export const SliderActions: FC<SliderActionsProps> = ({
  id = "slide",
  count,
}) => {
  const hash = useHash();
  const index = hash ? Number(hash.replace(`#${id}`, "")) : 0;
  if (count === 0) return null;
  return (
    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
      <a
        href={`#${id}${index === 0 ? count - 1 : index - 1}`}
        className={SliderActionClasses}
      >
        <ChevronLeft className="h-full w-full" />
      </a>
      <a
        href={`#${id}${index === count - 1 ? 0 : index + 1}`}
        className={SliderActionClasses}
      >
        <ChevronRight className="h-full w-full" />
      </a>
    </div>
  );
};

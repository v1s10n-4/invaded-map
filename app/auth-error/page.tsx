import Icon from "@/components/Icon/Icon";
import { ErrorProps } from "@auth/core/lib/pages/error";
import type { ErrorPageParam } from "@auth/core/src/types";
import { clsx } from "clsx";
import Link from "next/link";
import { FC } from "react";

type Params = { searchParams: ErrorProps };

interface ErrorView {
  status: number;
  heading: string;
  message: JSX.Element;
}

const errors: Record<ErrorPageParam | "default", ErrorView> = {
  default: {
    status: 200,
    heading: "Error",
    message: (
      <Link className="btn btn-primary uppercase" href={"/help"}>
        Contact me
      </Link>
    ),
  },
  Configuration: {
    status: 500,
    heading: "Server error",
    message: (
      <div>
        <p>There is a problem with the server configuration.</p>
        <p>Check the server logs for more information.</p>
      </div>
    ),
  },
  AccessDenied: {
    status: 403,
    heading: "Access Denied",
    message: (
      <div>
        <p>You do not have permission to sign in.</p>
        <p>
          <Link className="btn btn-outline btn-primary mt-4" href={"/map"}>
            Go to map
          </Link>
        </p>
      </div>
    ),
  },
  Verification: {
    status: 403,
    heading: "Unable to sign in",
    message: (
      <>
        <div>
          <p>The sign in link is no longer valid.</p>
          <p>It may have been used already or it may have expired.</p>
        </div>
        <a
          className="btn btn-outline btn-primary mt-2 uppercase"
          href={"/signin"}
        >
          Sign in
        </a>
      </>
    ),
  },
};

const ErrorPage: FC<Params> = async ({
  searchParams: { error = "default", url },
}) => {
  const errorType = Object.keys(errors).includes(error) ? error : "default";
  const errorView = errors[errorType as ErrorPageParam];
  console.warn(`[${errorView.status}] ${errorView.heading}`);
  return (
    <div className="relative mx-auto flex h-full flex-col items-center justify-center gap-16 pb-48">
      <Link href={"/"}>
        <Icon icon="invadedMap" className="h-32 w-32 text-primary" />
      </Link>
      <div
        className={clsx(
          "flex flex-col items-center gap-2",
          error && "mx-4 border-4 border-double border-primary p-4"
        )}
      >
        <h1
          className={clsx(
            "text-center text-lg uppercase lg:text-2xl",
            error && "text-primary underline"
          )}
        >
          {errorView.heading}
        </h1>
        <h2 className="text-center">{errorView.message}</h2>
      </div>
    </div>
  );
};

export default ErrorPage;

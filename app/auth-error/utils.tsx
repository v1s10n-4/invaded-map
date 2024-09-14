import { Button } from "@v1s10n_4/radix-ui-themes";
import Link from "next/link";

export type ErrorPageParam = "Configuration" | "AccessDenied" | "Verification";

export interface ErrorView {
  status: number;
  heading: string;
  message: JSX.Element;
}

export const errors: Record<ErrorPageParam | "default", ErrorView> = {
  default: {
    status: 200,
    heading: "Error",
    message: (
      <Button asChild>
        <Link className="uppercase" href={"/help"}>
          Contact me
        </Link>
      </Button>
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
          <Button asChild>
            <Link className="mt-4" href={"/map"}>
              Go to map
            </Link>
          </Button>
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
        <Button asChild>
          <a className="mt-2 uppercase" href={"/signin"}>
            Sign in
          </a>
        </Button>
      </>
    ),
  },
};

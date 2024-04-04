import { ErrorPageParam, errors } from "@/app/auth-error/utils";
import Icon from "@/components/Icon/Icon";
import { clsx } from "clsx";
import Link from "next/link";
import { FC } from "react";

type Params = { searchParams: { error: ErrorPageParam } };
const ErrorPage: FC<Params> = async ({
  searchParams: { error = "default" },
}) => {
  const errorType = Object.keys(errors).includes(error) ? error : "default";
  const errorView = errors[errorType as ErrorPageParam];
  console.warn(`[${errorView.status}] ${errorView.heading}`);
  return (
    <main className="relative mx-auto flex h-full flex-col items-center justify-center gap-16 pb-48">
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
    </main>
  );
};

export default ErrorPage;

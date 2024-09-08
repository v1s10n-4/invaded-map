import { ErrorPageParam, errors } from "@/app/auth-error/utils";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/Card";
import Icon from "@/components/Icon/Icon";
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
        <Icon icon="invadedMap" className="h-32 w-32" />
      </Link>
      <Card>
        <CardHeader>
          <CardTitle>{errorView.heading}</CardTitle>
          <CardDescription>{errorView.message}</CardDescription>
        </CardHeader>
      </Card>
    </main>
  );
};

export default ErrorPage;

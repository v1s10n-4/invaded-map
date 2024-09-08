import {
  AppProvider,
  Providers,
  signinErrors,
  SignInPageErrorParam,
} from "@/app/signin/utils";
import Icon, { IconProps } from "@/components/Icon/Icon";
import { REFERRAL_CODE_COOKIE_NAME } from "@/utils/data";
import { Button, Callout, Link as RLink, Text } from "@radix-ui/themes";
import { clsx } from "clsx";
import { cookies } from "next/headers";
import Link from "next/link";
import { notFound } from "next/navigation";
import React, { FC } from "react";

export const runtime = "edge";

const ProviderLoginButton: FC<
  Pick<AppProvider, "id" | "name" | "signinUrl">
> = ({ id, name, signinUrl }) => {
  return (
    <Button size="4" variant="surface" key={name} formAction={signinUrl}>
      <Icon
        icon={id as IconProps["icon"]}
        className="h-8 w-8 md:h-10 md:w-10 lg:h-12 lg:w-12"
      />
      <span className="hidden md:block">Continue with </span> {name}
    </Button>
  );
};

const getProviders = async () => {
  const providersResponse = await fetch(`${process.env.URL}/auth/providers`);
  if (providersResponse.status !== 200) {
    throw new Error(
      `error getting auth providers: [${providersResponse.status}] ${providersResponse.statusText}`
    );
  }
  return (await providersResponse.json()) as Providers;
};

type SigninPageType = FC<{
  searchParams: {
    error?: SignInPageErrorParam;
    callbackUrl?: string;
  };
}>;

const SigninPage: SigninPageType = async ({
  searchParams: { error, callbackUrl },
}) => {
  const providers = await getProviders().catch((err) => {
    console.error(err);
    notFound();
  });
  const c = cookies();
  const cookiePrefix =
    new URL(process.env.URL!).protocol === "https:" ? "__Host-" : "";
  const csrf = c.get(`${cookiePrefix}authjs.csrf-token`);
  const csrfToken = csrf?.value.split("|")[0];
  const errorText = error && (signinErrors[error] ?? signinErrors.default);
  const referralCode = c.get(REFERRAL_CODE_COOKIE_NAME)?.value;
  return (
    <main className="relative mx-auto flex h-full flex-col items-center justify-center gap-16">
      <Icon icon="invadedMap" className="mt-32 h-32 w-32 text-[--accent-9]" />
      <div
        className={clsx(
          "flex flex-col items-center gap-2",
          error && "mx-4 border border-[--accent-9] p-4"
        )}
      >
        <Callout.Root color={error ? "red" : "gray"}>
          <Callout.Text className="uppercase">
            {error ? "Error" : "Log in to your account"}
          </Callout.Text>
        </Callout.Root>
        {error && (
          <Text color="red" className="text-center">
            {errorText}
          </Text>
        )}
      </div>
      <form className="flex flex-col gap-4" method="POST">
        <input type="hidden" name="csrfToken" value={csrfToken} />
        {referralCode && (
          <input type="hidden" name="referral-code" value={referralCode} />
        )}
        {callbackUrl && (
          <input type="hidden" name="callbackUrl" value={callbackUrl} />
        )}
        {Object.values(providers).map((provider) => (
          <ProviderLoginButton key={provider.id} {...provider} />
        ))}
      </form>
      <Text size="1" align="center" className="fixed inset-x-0 bottom-8">
        By signing up, you agree to our{" "}
        <RLink asChild>
          <Link href={"/terms"} className="link">
            Terms of Service
          </Link>
        </RLink>
        .
      </Text>
    </main>
  );
};

export default SigninPage;

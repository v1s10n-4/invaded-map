import {
  AppProvider,
  Providers,
  signinErrors,
  SignInPageErrorParam,
} from "@/app/signin/utils";
import Icon, { IconProps } from "@/components/Icon/Icon";
import { clsx } from "clsx";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { FC } from "react";

export const runtime = "edge";

const ProviderLoginButton: FC<
  Pick<AppProvider, "id" | "name" | "signinUrl">
> = ({ id, name, signinUrl }) => {
  return (
    <button
      className="btn btn-primary btn-lg"
      key={name}
      formAction={signinUrl}
    >
      <Icon
        icon={id as IconProps["icon"]}
        className="h-8 w-8 md:h-10 md:w-10 lg:h-12 lg:w-12"
      />
      <span className="hidden md:block">Continue with </span> {name}
    </button>
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
  const csrf = c.get("authjs.csrf-token");
  const csrfToken = csrf?.value.split("|")[0];
  const errorText = error && (signinErrors[error] ?? signinErrors.default);
  return (
    <main className="relative mx-auto flex h-full flex-col items-center justify-center gap-16 pb-48">
      <Icon icon="invadedMap" className="h-32 w-32 text-primary" />
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
          {error ? "Error" : "Log in to your account"}
        </h1>
        {error && <h5 className="text-center">{errorText}</h5>}
      </div>
      <form className="flex flex-col gap-4" method="POST">
        <input type="hidden" name="csrfToken" value={csrfToken} />
        {callbackUrl && (
          <input type="hidden" name="callbackUrl" value={callbackUrl} />
        )}
        {Object.values(providers).map((provider) => (
          <ProviderLoginButton key={provider.id} {...provider} />
        ))}
      </form>
      <span className="absolute inset-x-0 bottom-8 text-center text-xs">
        By signing up, you agree to our{" "}
        <a href="/terms" className="link">
          Terms of Service
        </a>
        .
      </span>
    </main>
  );
};

export default SigninPage;

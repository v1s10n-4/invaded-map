import { signIn } from "@/auth";
import Icon, { IconProps } from "@/components/Icon/Icon";
import { AppProvider } from "@auth/core/src/providers";
import { SignInPageErrorParam } from "@auth/core/src/types";
import { clsx } from "clsx";
import { FC } from "react";

export const runtime = "edge";

type Providers = Record<string, AppProvider>;
const ProviderLoginButton: FC<Pick<AppProvider, "id" | "name">> = ({
  id,
  name,
}) => {
  const signinWith = async () => {
    "use server";
    await signIn(id);
  };
  return (
    <button
      className="btn btn-primary btn-lg"
      key={name}
      formAction={signinWith}
    >
      <Icon
        icon={id as IconProps["icon"]}
        className="h-8 w-8 md:h-10 md:w-10 lg:h-12 lg:w-12"
      />
      <span className="hidden md:block">Continue with </span> {name}
    </button>
  );
};
const SigninPage: FC<{
  searchParams: Record<"error", SignInPageErrorParam>;
}> = async ({ searchParams: { error } }) => {
  const res = await fetch(`${process.env.URL}/auth/providers`);
  const errorText = error && (signinErrors[error] ?? signinErrors.default);
  if (res.status !== 200)
    console.warn(
      `error getting auth providers: [${res.status}] ${res.statusText}`
    );
  const providers = (await res.json()) as Providers;
  return (
    <div className="relative mx-auto flex h-full flex-col items-center justify-center gap-16 pb-48">
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
      <form className="flex flex-col gap-4">
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
    </div>
  );
};

const signinErrors: Record<SignInPageErrorParam | "default", string> = {
  default: "Unable to sign in.",
  Signin: "Try signing in with a different account.",
  OAuthSignin: "Try signing in with a different account.",
  OAuthCallbackError: "Try signing in with a different account.",
  OAuthCreateAccount: "Try signing in with a different account.",
  EmailCreateAccount: "Try signing in with a different account.",
  Callback: "Try signing in with a different account.",
  OAuthAccountNotLinked:
    "To confirm your identity, sign in with the same account you used originally.",
  EmailSignin: "The e-mail could not be sent.",
  CredentialsSignin:
    "Sign in failed. Check the details you provided are correct.",
  SessionRequired: "Please sign in to access this page.",
};
export default SigninPage;

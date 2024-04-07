import { updateAvatar, updateUsername } from "@/app/account/actions";
import CardForm from "@/app/account/CardForm";
import { signOutAction } from "@/app/actions";
import { auth, signIn } from "@/auth";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/Card";
import { HitPlaceholder } from "@/components/Placeholder";
import SubmitButton from "@/components/SubmitButton";
import { User } from "@/db";
import { cn } from "@/lib/utils";
import Image from "next/image";
import placeholder from "@/components/placeholder.svg?url";
import LogOutIcon from "pixelarticons/svg/logout.svg";

import React, { FC } from "react";

export const runtime = "edge";

const DisplayUserName: FC<Pick<User, "name" | "role">> = ({ name, role }) => (
  <>
    {name}{" "}
    {role !== "user" && (
      <span
        className={cn(
          "text-sm",
          role === "superuser" ? "text-warning" : "text-info"
        )}
      >
        ({role === "superuser" ? "god" : role})
      </span>
    )}
  </>
);

const FessePage: FC = async () => {
  const session = await auth();
  if (!session?.user) return await signIn();
  const user = session.user;
  return (
    <main className="mt-20 flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10 lg:mt-24">
      <div className="divider divider-primary mx-auto w-full">
        <h1 className="text-xl font-semibold md:text-2xl lg:text-3xl">
          Account
        </h1>
      </div>
      <div className="mx-auto grid w-full max-w-2xl gap-8">
        <div className="flex w-full flex-col items-center gap-4 border border-primary p-6 md:flex-row md:gap-8">
          <Image
            src={session.user.image || placeholder}
            className="md:w-22 md:h-22 border-3 h-28 w-28 border-4 border-double border-primary p-1 lg:h-24 lg:w-24"
            alt="your profile picture"
            width={96}
            height={96}
            placeholder={HitPlaceholder(96, 96)}
          />
          <div className="flex h-full w-full flex-col items-center justify-between gap-2 md:flex-row md:items-end">
            <div className="flex flex-col items-center gap-2 text-xs md:my-auto md:items-start">
              <h2 className="mb-1 text-base text-primary md:text-lg">
                <DisplayUserName {...user} />
              </h2>
              <h2>{session.user.email}</h2>
              <h4>
                Created:{" "}
                {new Date(session.user.created_at).toLocaleDateString()}
              </h4>
            </div>
            <form action={signOutAction}>
              <SubmitButton className="btn-outline btn-primary btn-wide flex !p-1 md:btn-square">
                <span className="md:hidden">Sign out</span>
                <LogOutIcon className="aspect-square h-full w-8 md:w-full" />
              </SubmitButton>
            </form>
          </div>
        </div>
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Username</CardTitle>
              <CardDescription>
                Please enter a display name you are comfortable with.
              </CardDescription>
            </CardHeader>
            <CardForm action={updateUsername} name="name">
              <input
                name="name"
                defaultValue={user.name!}
                required
                minLength={3}
                maxLength={32}
                className="input input-primary w-full"
                placeholder="username"
              />
            </CardForm>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Avatar</CardTitle>
              <CardDescription>
                An avatar is optional but recommended.
              </CardDescription>
            </CardHeader>
            <CardForm action={updateAvatar} name="image">
              <input
                name="image"
                type="file"
                className="file-i file-input file-input-primary w-full max-w-md"
              />
            </CardForm>
          </Card>
        </div>
      </div>
    </main>
  );
};

export default FessePage;

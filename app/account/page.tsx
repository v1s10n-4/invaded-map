import {
  deleteAvatar,
  updateAvatar,
  updateUsername,
} from "@/app/account/actions";
import CardForm from "@/app/account/CardForm";
import ProfileHeader from "@/app/account/ProfileHeader";
import ReferralLink from "@/app/account/ReferralLink";
import ReviewsSection from "@/app/account/ReviewsSection";
import { auth, signIn } from "@/auth";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/Card";
import { FileInput } from "@/components/FileInput";
import { TextField } from "@radix-ui/themes";

import React, { FC, Suspense } from "react";

export const runtime = "edge";

const AccountPage: FC = async () => {
  const session = await auth();
  if (!session?.user) return await signIn();
  const user = session.user;

  return (
    <main className="mt-20 flex flex-1 flex-col gap-4 overflow-hidden p-4 md:gap-8 md:p-10 lg:mt-24">
      <div className="divider divider-primary mx-auto w-full">
        <h1 className="text-xl font-semibold md:text-2xl lg:text-3xl">
          Account
        </h1>
      </div>

      <div className="mx-auto flex w-full max-w-2xl flex-col gap-8">
        <ProfileHeader {...user} />
        <Suspense
          fallback={
            <div className="flex h-64 items-center justify-center border border-primary p-2">
              <span className="loading loading-bars h-8 w-8" />
            </div>
          }
        >
          <ReviewsSection user={user} />
        </Suspense>
        <div className="grid gap-6">
          <Card elevation>
            <CardHeader>
              <CardTitle>Invitation link</CardTitle>
              <CardDescription>
                Earn contribution points by inviting people.
              </CardDescription>
            </CardHeader>
            <Suspense
              fallback={
                <div className="px-6 pb-6">
                  <div className="flex items-center justify-center border border-primary p-2">
                    <span className="loading loading-bars h-8 w-8" />
                  </div>
                </div>
              }
            >
              <ReferralLink id={user.id} />
            </Suspense>
          </Card>
          <Card elevation>
            <CardHeader>
              <CardTitle>Username</CardTitle>
              <CardDescription>
                Please enter a display name you are comfortable with.
              </CardDescription>
            </CardHeader>
            <CardForm action={updateUsername} name="name">
              <TextField.Root
                size="3"
                name="name"
                defaultValue={user.name!}
                required
                minLength={3}
                maxLength={32}
                placeholder="username"
              />
            </CardForm>
          </Card>
          <Card elevation>
            <CardHeader>
              <CardTitle>Avatar</CardTitle>
              <CardDescription>
                An avatar is optional but recommended.
              </CardDescription>
            </CardHeader>
            <CardForm
              action={updateAvatar}
              name="image"
              deleteAction={user.image ? deleteAvatar : undefined}
            >
              <FileInput size="3" required />
            </CardForm>
          </Card>
        </div>
      </div>
    </main>
  );
};

export default AccountPage;

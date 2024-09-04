import {
  deleteAvatar,
  updateAvatar,
  updateUsername,
} from "@/app/account/actions";
import CardForm from "@/app/account/CardForm";
import ReferralLink from "@/app/account/ReferralLink";
import ReviewsSection from "@/app/account/ReviewsSection";
import { DisplayUserName } from "@/app/account/utils";
import { signOutAction } from "@/app/actions";
import { auth, signIn } from "@/auth";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/Card";
import { FileInput } from "@/components/FileInput";
import { HitPlaceholder } from "@/components/Placeholder";
import SubmitButton from "@/components/SubmitButton";
import { tooltipClass } from "@/utils";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  Slot,
  Text,
  TextField,
  Tooltip,
} from "@radix-ui/themes";
import { User } from "next-auth";
import Image from "next/image";
import LogOutIcon from "pixelarticons/svg/logout.svg";

import React, { FC, Suspense } from "react";

export const runtime = "edge";

const ProfilePicture: FC<User> = ({ name, image }) => {
  if (!image) {
    return (
      <Avatar
        fallback={name?.charAt(0) || "?"}
        size={{ initial: "7", md: "6" }}
      />
    );
  }

  return (
    <span className="rt-reset rt-AvatarRoot rt-r-size-7 md:rt-r-size-6 rt-variant-soft">
      <Image
        src={image}
        alt="your profile picture"
        className="rt-AvatarImage"
        width={96}
        height={96}
        placeholder={HitPlaceholder(96, 96)}
      />
    </span>
  );
};

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
        <Card>
          <Flex
            direction={{ initial: "column", sm: "row" }}
            align="center"
            gap={{ initial: "4", md: "8" }}
            p="3"
            width="100%"
            style={{ border: "1px solid var(--color-primary)" }}
          >
            <Card className="shrink-0">
              <ProfilePicture {...user} />
            </Card>

            <Flex
              direction={{ initial: "column", md: "row" }}
              align={{ initial: "center", md: "end" }}
              justify="between"
              gap="2"
              width="100%"
              height="100%"
            >
              <Flex
                direction="column"
                align={{ initial: "center", md: "start" }}
                gap="2"
                my={{ md: "auto" }}
              >
                <Heading as="h2" size={{ initial: "3", md: "4" }} mb="1">
                  <DisplayUserName {...user} />
                </Heading>
                <Text
                  size="1"
                  align={{ initial: "center", md: "left" }}
                  style={{ wordBreak: "break-all" }}
                >
                  {user.email}
                </Text>
                <Text size="1">
                  Created: {new Date(user.created_at).toLocaleDateString()}
                </Text>
              </Flex>

              <form action={signOutAction}>
                <Button variant="soft" size={{ initial: "3", md: "2" }}>
                  Sign out
                  <Slot>
                    <LogOutIcon className="h-6 w-6" />
                  </Slot>
                </Button>
              </form>
            </Flex>
          </Flex>
        </Card>
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

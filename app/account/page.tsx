import {
  deleteAvatar,
  updateAvatar,
  updateUsername,
} from "@/app/account/actions";
import CardForm from "@/app/account/CardForm";
import ProfileHeader from "@/app/account/ProfileHeader";
import ReferralLink from "@/app/account/ReferralLink";
import ReviewsSection from "@/app/account/ReviewsSection";
import {
  ReferralLinkSkeleton,
  ReviewSectionSkeleton,
} from "@/app/account/utils";
import { auth, signIn } from "@/auth";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/Card";
import { FileInput } from "@/components/FileInput";
import {
  Container,
  Flex,
  Heading,
  Section,
  Separator,
  TextField,
} from "@v1s10n_4/radix-ui-themes";

import React, { FC, Suspense } from "react";

export const runtime = "edge";

const AccountPage: FC = async () => {
  const session = await auth();
  if (!session?.user) return await signIn();
  const user = session.user;

  return (
    <Container px={{ initial: "1", sm: "2" }}>
      <Section>
        <Flex
          direction="column"
          gap={{ initial: "4", sm: "5", md: "6" }}
          className="mx-auto w-full max-w-2xl"
        >
          <Flex align="center" gap="3">
            <Separator size="4" />
            <Heading>Account</Heading>
            <Separator size="4" />
          </Flex>
          <ProfileHeader {...user} />
          <Suspense fallback={<ReviewSectionSkeleton />}>
            <ReviewsSection user={user} />
          </Suspense>
          <Card elevation>
            <CardHeader>
              <CardTitle>Invitation link</CardTitle>
              <CardDescription>
                Earn contribution points by inviting people.
              </CardDescription>
            </CardHeader>
            <Suspense fallback={<ReferralLinkSkeleton />}>
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
        </Flex>
      </Section>
    </Container>
  );
};

export default AccountPage;

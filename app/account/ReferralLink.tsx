import { createReferralLink } from "@/app/account/actions";
import CardForm from "@/app/account/CardForm";
import QRCodeDrawer from "@/app/account/QRCodeDrawer";
import CopyButton from "@/components/CopyButton";
import { db, User } from "@/db";
import { referralLinks } from "@/db/schema/referral_links";
import {
  Card,
  Flex,
  IconButton,
  Spinner,
  Text,
} from "@v1s10n_4/radix-ui-themes";
import { and, desc, eq } from "drizzle-orm";
import React, { FC, Suspense } from "react";

type ReferralLinkProps = Pick<User, "id">;

export const CopylLink: FC<{ host?: string; pathname: string }> = ({
  host = process.env.URL,
  pathname,
}) => (
  <Card className="select-all">
    <Flex px="1" gap="4" justify="between" align="center">
      <Text size="1" className="overflow-x-auto break-all">
        <Text as="span" className="text-[--gray-7]">
          {host}/invite
        </Text>
        /{pathname}
      </Text>
      <Flex align="center" gap="4">
        <CopyButton
          link={`${host}/invite/${pathname}`}
          icons="only"
          variant="ghost"
        />
        <Suspense
          fallback={
            <IconButton variant="ghost" disabled>
              <Spinner className="h-[--space-5] w-[--space-5]" />
            </IconButton>
          }
        >
          <QRCodeDrawer link={`${host}/invite/${pathname}`} />
        </Suspense>
      </Flex>
    </Flex>
  </Card>
);

const ReferralLink: FC<ReferralLinkProps> = async ({ id }) => {
  const res = await db.query.referralLinks.findFirst({
    where: and(
      eq(referralLinks.referrer_id, id),
      eq(referralLinks.type, "basic")
    ),
    orderBy: [desc(referralLinks.created_at)],
    columns: {
      code: true,
    },
  });
  return (
    <CardForm
      action={createReferralLink}
      name="refcode"
      submitText="Create"
      showSubmit={!res?.code}
    >
      {res?.code ? (
        <CopylLink pathname={res.code} />
      ) : (
        <Text size="1" className=" p-2">
          You don&apos;t have any invitation link yet, create one and share it!
        </Text>
      )}
    </CardForm>
  );
};

export default ReferralLink;

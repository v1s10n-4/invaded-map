import { createReferralLink } from "@/app/account/actions";
import { CardContent, CardFooter } from "@/components/Card";
import CopyButton from "@/components/CopyButton";
import SubmitButton from "@/components/SubmitButton";
import { db, User } from "@/db";
import { referralLinks } from "@/db/schema/referral_links";
import { and, desc, eq } from "drizzle-orm";
import React, { FC } from "react";

type ReferralLinkProps = Pick<User, "id">;

export const CopylLink: FC<{ host?: string; pathname: string }> = ({
  host = process.env.URL,
  pathname,
  ...props
}) => (
  <div
    className="flex select-all items-center justify-between gap-4 border border-primary p-2 pl-4"
    {...props}
  >
    <p className="w-full overflow-x-auto break-all text-xs selection:bg-primary selection:text-black">
      <span className="text-base-content/40">{host}</span>/{pathname}
    </p>
    <CopyButton
      link={host + pathname}
      icons="only"
      className="btn btn-ghost h-[2.3em] min-h-[2.3em] w-[2.3em] p-1"
    />
  </div>
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
    <form>
      <CardContent>
        {res?.code ? (
          <CopylLink pathname={res.code} />
        ) : (
          <p className="border border-primary p-2 text-xs">
            You don&apos;t have any invitation link yet, create one and share
            it!
          </p>
        )}
      </CardContent>
      {!res?.code && (
        <CardFooter className="border-t border-primary px-6 py-4">
          <SubmitButton
            formAction={createReferralLink}
            className="btn btn-primary"
          >
            Create
          </SubmitButton>
        </CardFooter>
      )}
    </form>
  );
};

export default ReferralLink;

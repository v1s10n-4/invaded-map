import { REFERRAL_CODE_COOKIE_NAME } from "@/app/invite/[code]/route";
import { auth, signIn } from "@/auth";
import { db } from "@/db";
import { referralLinks } from "@/db/schema/referral_links";
import { usersToRewards } from "@/db/schema/rewards";
import { users } from "@/db/schema/users";
import { getTags } from "@/utils/revalidation-tags";
import { eq } from "drizzle-orm";
import { NextApiRequest } from "next";
import { unstable_cache } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const GET = async (req: NextApiRequest) => {
  const session = await auth();
  if (!session) return signIn();

  const currentUser = session.user;
  const timeSinceUserCreation =
    new Date().getTime() - new Date(currentUser.created_at).getTime();
  const oneMinute = 1000 * 60;
  const isACheater = timeSinceUserCreation > oneMinute;
  if (currentUser.referrer_link_id || isACheater)
    return redirect(`${process.env.URL}/account`);

  const referralCode = cookies().get(REFERRAL_CODE_COOKIE_NAME)?.value;
  if (!referralCode) {
    return redirect(`${process.env.URL}/account`);
  }

  const revalidationTagForCode = getTags("referral code data", referralCode);
  const referralData = await unstable_cache(
    async () =>
      db.query.referralLinks.findFirst({
        where: eq(referralLinks.code, referralCode),
      }),
    revalidationTagForCode,
    {
      tags: revalidationTagForCode,
    }
  )();
  if (!referralData) {
    console.warn(`invalid referral code used: ${referralCode}`);
    redirect("/account");
  }

  const {
    id: referrer_link_id,
    referrer_id,
    used,
    reward_type_id,
  } = referralData;

  // set currentUser referrer
  await db
    .update(users)
    .set({ referrer_link_id })
    .where(eq(users.id, currentUser.id));

  // increment usage amount of referral link;
  await db
    .update(referralLinks)
    .set({ used: used + 1 })
    .where(eq(referralLinks.id, referrer_link_id));

  // if the invite link is rewarding, create the reward for the referrer and referee
  if (reward_type_id) {
    await db.insert(usersToRewards).values([
      { user_id: referrer_id, reward_id: reward_type_id },
      { user_id: currentUser.id, reward_id: reward_type_id },
    ]);
  }
  console.log(`${referralData.referrer_id} referred ${currentUser.id}!`);
  return redirect(`${process.env.URL}/account`);
};

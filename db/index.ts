import { sql as VercelDB } from "@/db/db";
import * as Contributions from "@/db/schema/contributions";
import * as Invaders from "@/db/schema/invaders";
import { invaders } from "@/db/schema/invaders";
import * as ReferralLinks from "@/db/schema/referral_links";
import * as ReviewTasks from "@/db/schema/reviewTasks";
import * as Rewards from "@/db/schema/rewards";
import * as Users from "@/db/schema/users";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { drizzle as VercelDrizzle } from "drizzle-orm/vercel-postgres";

// INVADER
type InvaderTable = typeof invaders;
export type NewInvader = InferInsertModel<InvaderTable>;
export type Invader = InferSelectModel<InvaderTable>;
export type InvaderState = Invader["state"];
export type InvaderWithLocation = {
  i: Invader["id"];
  n: Invader["name"];
  t: Invader["thumbnail"];
  l: NonNullable<Invader["location"]>;
};
// USER
type UserTable = typeof Users.users;
export type User = InferSelectModel<UserTable>;

// REVIEWTASK
type ReviewTaskTable = typeof ReviewTasks.reviewTasks;
export type ReviewTask = InferSelectModel<ReviewTaskTable>;

// CONTRIBUTION
type ContributionTable = typeof Contributions.contributions;
export type Contribution = InferSelectModel<ContributionTable>;

const db = VercelDrizzle(VercelDB, {
  schema: {
    ...Users,
    ...Invaders,
    ...ReferralLinks,
    ...Rewards,
    ...ReviewTasks,
    ...Contributions,
  },
});

export { db };

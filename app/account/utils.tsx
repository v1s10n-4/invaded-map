import { acceptContribution, deleteContribution } from "@/app/account/actions";
import { CardFooter } from "@/components/Card";
import SubmitButton from "@/components/SubmitButton";
import { db, Invader, ReviewTask, User } from "@/db";
import { reviewTasks } from "@/db/schema/reviewTasks";
import { cn } from "@/lib/utils";
import { getState } from "@/utils/data";
import { getTags } from "@/utils/revalidation-tags";
import { Text } from "@radix-ui/themes";
import { eq } from "drizzle-orm";
import { unstable_cache } from "next/cache";
import React, { FC } from "react";

export const DisplayRole: FC<Pick<User, "role"> & { className?: string }> = ({
  role,
  className,
}) =>
  role !== "user" ? (
    <Text
      as="span"
      size="1"
      color={role === "superuser" ? "pink" : "cyan"}
      className={className}
    >
      ({role === "superuser" ? "god" : role})
    </Text>
  ) : null;

export const DisplayUserName: FC<Pick<User, "name" | "role">> = ({
  name,
  role,
}) => (
  <>
    {name} <DisplayRole role={role} />
  </>
);

export const ReviewActions: FC<Pick<ReviewTask, "id">> = ({ id }) => {
  const reject = deleteContribution.bind(null, id);
  const accept = acceptContribution.bind(null, id);
  return (
    <form>
      <CardFooter className="justify-between">
        <SubmitButton formAction={reject} className="btn-outline btn-primary">
          Reject
        </SubmitButton>
        <SubmitButton formAction={accept} className="btn-primary">
          Accept
        </SubmitButton>
      </CardFooter>
    </form>
  );
};

export const ContributionActions: FC<Pick<ReviewTask, "id">> = ({ id }) => {
  const erase = deleteContribution.bind(null, id);
  return (
    <form>
      <CardFooter
        // className="justify-between"
        className="justify-start"
      >
        <SubmitButton formAction={erase} className="btn-outline btn-primary">
          Delete
        </SubmitButton>
        {/*<SubmitButton className="btn-primary">Edit</SubmitButton>*/}
      </CardFooter>
    </form>
  );
};

export const getAllReviews = unstable_cache(
  async () => {
    const res = await db.select().from(reviewTasks);
    return res;
  },
  getTags("all reviews"),
  { tags: getTags("all reviews") }
);

export const getReview = async (id: ReviewTask["id"]) =>
  unstable_cache(
    () => {
      return db.query.reviewTasks.findFirst({
        with: {
          entity: true,
          editor: true,
        },
        where: eq(reviewTasks.id, id),
      });
    },
    ["review", id.toString()],
    {
      tags: getTags("review", id.toString()),
    }
  );

export const getChangedValue = (change: ReviewTask["change"]) => {
  if (change.field === "state") {
    return getState(change.value);
  } else if (change.field === "create_date") {
    return new Date(change.value).toLocaleDateString();
  } else if (change.field === "points") {
    return change.value.toString();
  } else {
    return "Error";
  }
};

export const getInvaderValue = (
  invader: Invader,
  field: keyof Pick<Invader, "state" | "create_date" | "points">
) => {
  if (field === "state") {
    return getState(invader.state);
  } else if (field === "create_date") {
    return new Date(invader.create_date).toLocaleDateString();
  } else if (field === "points") {
    return invader.points.toString();
  } else {
    return "Error";
  }
};

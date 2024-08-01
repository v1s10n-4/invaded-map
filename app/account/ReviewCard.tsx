import { ContributionActions, ReviewActions } from "@/app/account/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/Card";
import { HitPlaceholder } from "@/components/Placeholder";
import { db, ReviewTask, User } from "@/db";
import { reviewTasks } from "@/db/schema/reviewTasks";
import { getState } from "@/utils/data";
import { eq } from "drizzle-orm";
import Image from "next/image";
import Link from "next/link";
import ArrowRight from "pixelarticons/svg/arrow-right.svg";
import React, { FC } from "react";

type ReviewCardProps = ReviewTask & {
  currentUserId: User["id"];
  currentUserRole: User["role"];
};

const ReviewCard: FC<ReviewCardProps> = async ({
  id,
  change,
  proof_image,
  created_at,
  currentUserRole,
  currentUserId,
}) => {
  const res = await db.query.reviewTasks.findFirst({
    with: {
      entity: true,
      editor: true,
    },
    where: eq(reviewTasks.id, id),
  });
  if (!res) {
    return (
      <div className="flex border border-primary p-6">
        Unexpected error: please contact me on discord (error code: 21)
      </div>
    );
  }

  const { entity: invader, editor, id: reviewId } = res;
  let oldValue: string | number = "Error";
  let newValue: string | number = "Error";
  if (change.field === "state") {
    oldValue = getState(invader.state);
    newValue = getState(change.value);
  } else if (change.field === "create_date") {
    oldValue = invader.create_date.toLocaleDateString();
    newValue = (change.value as Date).toLocaleDateString();
  } else if (change.field === "points") {
    oldValue = invader.points.toString();
    newValue = change.value.toString();
  }

  const isOwnContribution = currentUserId === editor.id;
  const canReviewOwnContribution =
    currentUserRole === "admin" || currentUserRole === "superuser";

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <Link
            className="decoration-primary hover:underline focus:underline"
            href={`/map/${invader.name}`}
          >
            <CardTitle>{invader.name}</CardTitle>
          </Link>
          <div className="flex items-center gap-2">
            <Image
              src={editor.image || HitPlaceholder(32, 32)}
              width={32}
              height={32}
              className="h-6 w-6 md:h-8 md:w-8"
              alt="editor's profile picture"
            />
            <span className="text-xs">{editor.name}</span>
          </div>
        </div>
        <CardDescription>
          {created_at.toLocaleString()}
          <br />
          what changed: <b>{change.field}</b>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 place-items-center gap-4 border border-dashed border-primary px-1">
          <p className="w-full text-center text-sm text-error">{oldValue}</p>
          <ArrowRight className="h-12 w-12 justify-self-center" />
          <p className="w-full text-center text-sm text-success">{newValue}</p>
        </div>
        <div className="grid grid-cols-2 justify-items-center">
          <Image
            src={invader.thumbnail}
            alt="image not found"
            placeholder={HitPlaceholder(192, 192)}
            width={192}
            height={192}
          />
          <Image
            src={proof_image}
            alt="image not found"
            placeholder={HitPlaceholder(192, 192)}
            width={192}
            height={192}
          />
        </div>
      </CardContent>
      {isOwnContribution && <ContributionActions id={reviewId} />}
      {(!isOwnContribution || canReviewOwnContribution) && <ReviewActions />}
    </Card>
  );
};

export default ReviewCard;

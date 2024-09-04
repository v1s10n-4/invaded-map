import {
  ContributionActions,
  getChangedValue,
  getInvaderValue,
  getReview,
  ReviewActions,
} from "@/app/account/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/Card";
import { HitPlaceholder } from "@/components/Placeholder";
import { ReviewTask, User } from "@/db";
import { canReviewOwnContribution } from "@/lib/utils";
import { Flex, Strong, Text } from "@radix-ui/themes";
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
  const getter = await getReview(id);
  const res = await getter();
  if (!res) {
    return (
      <div className="flex border border-primary p-6">
        Unexpected error: please contact me on discord (error code: 21)
      </div>
    );
  }

  const { entity: invader, editor, id: reviewId } = res;
  let oldValue = getInvaderValue(invader, change.field);
  let newValue = getChangedValue(change);

  const isOwnContribution = currentUserId === editor.id;

  return (
    <Card>
      <CardHeader>
        <Flex align="center" justify="between">
          <Link
            className="decoration-primary hover:underline focus:underline"
            href={`/map/${invader.name}`}
          >
            <CardTitle>{invader.name}</CardTitle>
          </Link>
          <Flex align="center" gap="2">
            <Image
              src={editor.image || HitPlaceholder(32, 32)}
              width={32}
              height={32}
              className="h-6 w-6 md:h-8 md:w-8"
              alt="editor's profile picture"
            />
            <Text size="1">{editor.name}</Text>
          </Flex>
        </Flex>
        <CardDescription size="1">
          {new Date(created_at).toLocaleDateString()} (
          {new Date(created_at).toLocaleTimeString()})
          <br />
          what changed: <Strong>{change.field}</Strong>
        </CardDescription>
      </CardHeader>
      <CardContent gap="4">
        <Card className="grid grid-cols-[1fr_auto_1fr] place-items-center px-1">
          <Text align="center" color="red">
            {oldValue}
          </Text>
          <ArrowRight className="h-12 w-12 justify-self-center" />
          <Text align="center" color="green">
            {newValue}
          </Text>
        </Card>
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
      {(!isOwnContribution || canReviewOwnContribution(currentUserRole)) && (
        <ReviewActions id={reviewId} />
      )}
    </Card>
  );
};

export default ReviewCard;

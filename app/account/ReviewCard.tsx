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
import { Callout, Flex, Link as RLink, Strong, Text } from "@radix-ui/themes";
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
      <Callout.Root color="red">
        <Callout.Text>
          Unexpected error: please contact me on discord (error code: 21)
        </Callout.Text>
      </Callout.Root>
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
          <RLink asChild>
            <Link href={`/map/${invader.name}`}>
              <CardTitle>{invader.name}</CardTitle>
            </Link>
          </RLink>
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
          <Text align="center" color="tomato">
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

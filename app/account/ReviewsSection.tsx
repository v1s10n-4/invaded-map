import { getAllReviews } from "@/app/account/actions";
import ReviewCard from "@/app/account/ReviewCard";
import ReviewsCarousel from "@/app/account/ReviewsCarousel";
import { DisplayRole } from "@/app/account/utils";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/Card";
import { CarouselItem } from "@/components/Carousel";
import { ReviewTask, User } from "@/db";
import {
  Badge,
  Flex,
  Inset,
  Separator,
  Skeleton,
  Tabs,
  Text,
} from "@v1s10n_4/radix-ui-themes";
import React, { FC, Suspense } from "react";

type ReviewsSectionProps = { user: User };

const ReviewsSection: FC<ReviewsSectionProps> = async ({ user }) => {
  const res = await getAllReviews();
  const [ownReviews, othersReviews] = res.reduce<[ReviewTask[], ReviewTask[]]>(
    ([own, others], review) => {
      if (review.editor_id === user.id) {
        return [[...own, review], others];
      } else {
        return [own, [...others, review]];
      }
    },
    [[], []]
  );
  return (
    <Card elevation>
      <CardHeader>
        <CardTitle>Contributions</CardTitle>
        <CardDescription>
          Review others contributions to earn points.
        </CardDescription>
      </CardHeader>
      <Inset side="x">
        <Separator size="4" mt="5" />
      </Inset>
      <Tabs.Root defaultValue="own" className="w-full">
        <Inset side="x">
          <Tabs.List className="grid h-auto grid-cols-2 text-current">
            <Tabs.Trigger value="own">
              Yours{" "}
              {Boolean(ownReviews.length) && (
                <Badge ml="2" variant="soft">
                  {ownReviews.length}
                </Badge>
              )}
            </Tabs.Trigger>
            <Tabs.Trigger value="others">
              Others{" "}
              {Boolean(othersReviews.length) && (
                <Badge ml="2" variant="solid">
                  {othersReviews.length}
                </Badge>
              )}
            </Tabs.Trigger>
          </Tabs.List>
        </Inset>
        <Tabs.Content value="own" className="relative pt-3">
          {ownReviews.length ? (
            <ReviewsCarousel>
              {ownReviews.map((review) => (
                <CarouselItem key={review.id} className="flex flex-col" pl="3">
                  <Suspense
                    fallback={
                      <Skeleton height={{ initial: "423px", sm: "476px" }} />
                    }
                  >
                    <ReviewCard
                      {...review}
                      currentUserId={user.id}
                      currentUserRole={user.role}
                    />
                  </Suspense>
                </CarouselItem>
              ))}
            </ReviewsCarousel>
          ) : (
            <Flex align="center" justify="center" p="5">
              <Text size="1">You have no pending contribution.</Text>
            </Flex>
          )}
        </Tabs.Content>
        <Tabs.Content value="others">
          {othersReviews.length ? (
            <ReviewsCarousel>
              {othersReviews.map((review) => (
                <CarouselItem key={review.id} className="flex flex-col" pl="3">
                  <Suspense
                    fallback={
                      <Skeleton height={{ initial: "423px", sm: "476px" }} />
                    }
                  >
                    <ReviewCard
                      {...review}
                      currentUserId={user.id}
                      currentUserRole={user.role}
                    />
                  </Suspense>
                </CarouselItem>
              ))}
            </ReviewsCarousel>
          ) : (
            <Flex
              direction="column"
              align="center"
              justify="center"
              gap="4"
              p="5"
            >
              {user.role === "user" || user.role === "poweruser" ? (
                <>
                  <Text size="1">
                    You must be at least a <DisplayRole role="moderator" /> to
                    review contributions from others.
                  </Text>
                  <Text size="1">
                    To get that role, start by earning contribution points.
                  </Text>
                  <Text size="1">
                    Get those by inviting people or submitting contributions for
                    review.
                  </Text>
                </>
              ) : (
                <Text size="1">
                  There&apos;s currently no contribution to review.
                </Text>
              )}
            </Flex>
          )}
        </Tabs.Content>
      </Tabs.Root>
    </Card>
  );
};

export default ReviewsSection;

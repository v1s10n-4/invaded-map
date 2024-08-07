import ReviewCard from "@/app/account/ReviewCard";
import ReviewsCarousel from "@/app/account/ReviewsCarousel";
import { DisplayRole, getAllReviews } from "@/app/account/utils";
import { CarouselItem } from "@/components/Carousel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/Tabs";
import { db, ReviewTask, User } from "@/db";
import { reviewTasks } from "@/db/schema/reviewTasks";
import { unstable_cache } from "next/cache";
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
    <Tabs defaultValue="own" className="w-full">
      <TabsList className="grid h-auto grid-cols-2 text-current">
        <TabsTrigger
          className="border-b-0 border-r-0 border-dashed data-[state=active]:border-r data-[state=active]:border-solid data-[state=active]:border-primary data-[state=active]:shadow-[1px_1px_0_0_black]"
          value="own"
        >
          Yours
        </TabsTrigger>
        <TabsTrigger
          className="border-b-0 border-dashed data-[state=inactive]:border-l-0 data-[state=active]:border-solid data-[state=active]:border-primary data-[state=active]:shadow-[-1px_1px_0_0_black]"
          value="others"
        >
          Others
        </TabsTrigger>
      </TabsList>
      <TabsContent value="own" className="mt-0">
        {ownReviews.length ? (
          <ReviewsCarousel>
            {ownReviews.map((review) => (
              <CarouselItem key={review.id} className="flex flex-col pl-2">
                <Suspense
                  fallback={
                    <div className="flex h-64 items-center justify-center border border-primary p-2">
                      <span className="loading loading-bars h-8 w-8" />
                    </div>
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
          <div className="flex items-center justify-center border border-primary p-6">
            You have no pending contribution..
          </div>
        )}
      </TabsContent>
      <TabsContent value="others" className="mt-0">
        {othersReviews.length ? (
          <ReviewsCarousel>
            {othersReviews.map((review) => (
              <CarouselItem key={review.id} className="flex flex-col pl-2">
                <Suspense
                  fallback={
                    <div className="flex h-64 items-center justify-center border border-primary p-2">
                      <span className="loading loading-bars h-8 w-8" />
                    </div>
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
          <div className="flex flex-col items-center justify-center gap-4 border border-primary p-6">
            {user.role === "user" || user.role === "poweruser" ? (
              <>
                <p className="text-xs">
                  You must be at least a <DisplayRole role="moderator" /> to
                  review contributions from others.
                </p>
                <p className="text-xs">
                  To get that role, start by earning contribution points.
                </p>
                <p className="text-xs">
                  Get those by inviting people or submitting contributions for
                  review.
                </p>
              </>
            ) : (
              "There's currently no contribution to review"
            )}
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
};

export default ReviewsSection;

import { acceptContribution, deleteContribution } from "@/app/account/actions";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/Card";
import SubmitButton from "@/components/SubmitButton";
import { Invader, ReviewTask, User } from "@/db";
import { getState } from "@/utils/data";
import {
  Flex,
  Inset,
  Separator,
  Skeleton,
  Text,
} from "@v1s10n_4/radix-ui-themes";
import React, { FC } from "react";

export const ReferralLinkSkeleton = () => (
  <Flex py="5" px="3">
    <Skeleton width="100%" height="56px" />
  </Flex>
);
export const ReviewSectionSkeleton = () => (
  <Card elevation className="h-[215px]">
    <CardHeader>
      <CardTitle>
        <Skeleton>Contributions</Skeleton>
      </CardTitle>
      <CardDescription>
        <Skeleton>Review others contributions to earn points.</Skeleton>
      </CardDescription>
    </CardHeader>
    <Inset side="x">
      <Separator size="4" mt="5" />
      <Flex align="center" py="2">
        <Text mx="auto">
          <Skeleton>Yours</Skeleton>
        </Text>
        <Text mx="auto">
          <Skeleton>Others</Skeleton>
        </Text>
      </Flex>
      <Separator size="4" mb="3" />
    </Inset>
    <Skeleton>
      <Card>Fesse</Card>
    </Skeleton>
  </Card>
);

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
        <SubmitButton formAction={reject} variant="outline">
          Reject
        </SubmitButton>
        <SubmitButton formAction={accept}>Accept</SubmitButton>
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
        <SubmitButton formAction={erase} variant="outline">
          Delete
        </SubmitButton>
        {/*<SubmitButton>Edit</SubmitButton>*/}
      </CardFooter>
    </form>
  );
};

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

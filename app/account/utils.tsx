import { deleteContribution } from "@/app/account/actions";
import { CardFooter } from "@/components/Card";
import SubmitButton from "@/components/SubmitButton";
import { ReviewTask, User } from "@/db";
import { cn } from "@/lib/utils";
import React, { FC } from "react";

export const DisplayRole: FC<Pick<User, "role"> & { className?: string }> = ({
  role,
  className,
}) =>
  role !== "user" ? (
    <span
      className={cn(
        "text-sm",
        role === "superuser" ? "text-warning" : "text-info",
        className
      )}
    >
      ({role === "superuser" ? "god" : role})
    </span>
  ) : null;

export const DisplayUserName: FC<Pick<User, "name" | "role">> = ({
  name,
  role,
}) => (
  <>
    {name} <DisplayRole role={role} />
  </>
);

export const ReviewActions = () => {
  return (
    <CardFooter className="justify-between">
      <SubmitButton className="btn-outline btn-primary">Reject</SubmitButton>
      <SubmitButton className="btn-primary">Accept</SubmitButton>
    </CardFooter>
  );
};

export const ContributionActions: FC<Pick<ReviewTask, "id">> = ({ id }) => {
  const erase = deleteContribution.bind(null, id);
  return (
    <form>
      <CardFooter className="justify-between">
        <SubmitButton formAction={erase} className="btn-outline btn-primary">
          Delete
        </SubmitButton>
        <SubmitButton className="btn-primary">Edit</SubmitButton>
      </CardFooter>
    </form>
  );
};

import { getChangedValue } from "@/app/account/utils";
import { db, Invader } from "@/db";
import { InvaderEditableField } from "@/db/schema/reviewTasks";
import { getTags } from "@/utils/revalidation-tags";
import { unstable_cache } from "next/cache";

export const InvaderEditableKeys: Array<{
  value: InvaderEditableField;
  label: string;
}> = [
  { value: "state", label: "current state" },
  { value: "create_date", label: "creation date" },
  { value: "points", label: "points earned" },
];

export const InvaderEditResponseState = {
  errors: [],
  success: false,
};

export type ContributionData<T extends "create" | "edit" | "delete"> =
  T extends "create"
    ? Partial<Invader>
    : T extends "edit"
      ? { [K in InvaderEditableField]: Invader[K] }
      : T extends "delete"
        ? {}
        : never;

export const getUpdateLabel = (data: ContributionData<"edit">) => {
  return Object.entries(data).reduce(
    (acc, [field, value]) =>
      field === "images"
        ? acc
        : acc +
          (acc.length ? ", " : "") +
          `${field} to ${getChangedValue({ field: field as InvaderEditableField, value })}`,
    ""
  );
};

export const getInvaderHistory = async (id: Invader["id"]) =>
  unstable_cache(
    () => {
      return db.query.contributions.findMany({
        with: {
          editor: true,
        },
        where: (contributions, { eq }) => eq(contributions.entity_id, id),
        orderBy: (contributions, { desc }) => [desc(contributions.created_at)],
      });
    },
    ["history", id.toString()],
    {
      tags: getTags("invader history", id.toString()),
    }
  );

"use server";

import { updateUserImageSchema } from "@/app/account/schema";
import {
  InvaderEditableKeys,
  invaderValidStates,
} from "@/app/map/[invaderName]/utils";
import { auth, signIn } from "@/auth";
import { db } from "@/db";
import { reviewTasks } from "@/db/schema/reviewTasks";
import { getInvader, uploadImage } from "@/utils/data";
import { getTag } from "@/utils/revalidation-tags";
import { and, eq, sql } from "drizzle-orm";
import { revalidateTag } from "next/cache";
import { z } from "zod";

export type SubmitContributionResponse = { errors: string[]; success: boolean };

const invaderCreatedDateSchema = z.string().date();
const invaderPointsSchema = z
  .number()
  .nonnegative()
  .multipleOf(10)
  .finite()
  .safe();

export const submitContribution = async (
  invaderName: string,
  state: SubmitContributionResponse,
  formData: FormData
) => {
  const session = await auth();
  if (!session) return signIn();

  if (!invaderName)
    return {
      success: false,
      errors: ["Error, please contact me on discord (error code: 11)"],
    };

  const invader = await getInvader(invaderName);
  if (!invader)
    return {
      success: false,
      errors: ["Error, please contact me on discord (error code: 12)"],
    };

  const formTypeField = formData.get("type");
  const type = InvaderEditableKeys.find(
    ({ value }) => value === formTypeField
  )?.value;
  if (!type)
    return {
      success: false,
      errors: ["Good job, hacker!"],
    };

  let newValue: FormDataEntryValue | Date | number | null = formData.get(type);
  if (!newValue)
    return {
      success: false,
      errors: ["Error, please contact me on discord (error code: 13)"],
    };
  if (newValue instanceof File) {
    return {
      success: false,
      errors: ["Good job, hacker!"],
    };
  }

  if (type === "state") {
    const newState = invaderValidStates.find(({ value }) => newValue === value);
    if (!newState || newState.value === invader.state) {
      return {
        success: false,
        errors: ["Good job, hacker!"],
      };
    }
  }

  if (type === "create_date") {
    const safeData = invaderCreatedDateSchema.safeParse(newValue);
    if (!safeData.success) {
      return {
        success: false,
        errors: safeData.error.format()._errors,
      };
    }
    newValue = new Date(newValue);
    if (
      newValue.toLocaleDateString() ===
      new Date(invader.create_date).toLocaleDateString()
    ) {
      return {
        success: false,
        errors: ["Date must differ from the saved date."],
      };
    }
  }

  if (type === "points") {
    newValue = Number(newValue);
    if (newValue === invader.points) {
      return {
        success: false,
        errors: ["Points value must differ from the saved value."],
      };
    }
    const safeData = invaderPointsSchema.safeParse(newValue);
    if (!safeData.success) {
      return {
        success: false,
        errors: safeData.error.format()._errors,
      };
    }
  }

  const proof = formData.get("proof");
  const safeData = updateUserImageSchema.safeParse(proof);
  if (!safeData.success) {
    return {
      success: false,
      errors: safeData.error.format()._errors,
    };
  }

  const res = await db
    .select()
    .from(reviewTasks)
    .where(
      and(
        eq(reviewTasks.entity_id, invader.id),
        sql`change->>'field' = ${type}`
      )
    );

  if (res.length > 0) {
    return {
      success: false,
      errors: ["A change for this field is already in review"],
    };
  }

  const vercelBlobResponse = await uploadImage(safeData.data, invader.name);
  if (!vercelBlobResponse || vercelBlobResponse.error) {
    return {
      success: false,
      errors: ["Error, please contact me on discord (error code: 14)"],
    };
  }

  const insertRes = await db.insert(reviewTasks).values({
    entity_id: invader.id,
    type: "edit",
    editor_id: session.user.id,
    change: { field: type, value: newValue },
    proof_image: vercelBlobResponse.data.url,
    reward_id: 4,
  });
  if (!insertRes || insertRes.rowCount === 0)
    return {
      success: false,
      errors: ["Error, please contact me on discord (error code: 15)"],
    };
  revalidateTag(getTag("all reviews"));
  return { success: true, errors: [] };
};

export type SubmitContributionFieldType = typeof submitContribution;

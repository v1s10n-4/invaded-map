"use server";

import { updateUserImageSchema } from "@/app/account/schema";
import { invaderValidStates } from "@/app/map/[invaderName]/StateForm";
import { InvaderEditableKeys } from "@/app/map/[invaderName]/utils";
import { auth, signIn } from "@/auth";
import { db } from "@/db";
import { reviewTasks } from "@/db/schema/reviewTasks";
import { getInvader } from "@/utils/data";
import { put } from "@vercel/blob";
import { z } from "zod";

export type UpdateInvaderResponse = { errors: string[]; success: boolean };

const invaderCreatedDateSchema = z.string().date();
const invaderPointsSchema = z
  .number()
  .nonnegative()
  .multipleOf(10)
  .finite()
  .safe();

export const UpdateInvaderField = async (
  invaderName: string,
  state: UpdateInvaderResponse,
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

  const newValue = formData.get(type);
  if (!newValue)
    return {
      success: false,
      errors: ["Error, please contact me on discord (error code: 13)"],
    };

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
  }

  if (type === "points") {
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

  const blobRes = await put(`reviews/${invaderName}`, safeData.data, {
    access: "public",
  });
  if (!blobRes) {
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
    proof_image: blobRes.url,
    reward_id: 4,
  });
  if (!insertRes || insertRes.rowCount === 0)
    return {
      success: false,
      errors: ["Error, please contact me on discord (error code: 15)"],
    };
  return { success: true, errors: [] };
};

export type UpdateInvaderFieldType = typeof UpdateInvaderField;

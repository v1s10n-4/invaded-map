import { User } from "@/db";
import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const canReviewOwnContribution = (role: User["role"]) =>
  role === "admin" || role === "superuser";

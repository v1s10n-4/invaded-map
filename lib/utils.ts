import { User } from "@/db";
import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const canReviewOwnContribution = (role: User["role"]) =>
  role === "admin" || role === "superuser";

export const canReviewOthersContribution = (role: User["role"]) =>
  role !== "user" && role !== "superuser";

export const formatTime = (timestamp: number | string | Date) => {
  const date = new Date(timestamp);
  const now = new Date().getTime();
  const diffInSeconds = Math.floor((now - date.getTime()) / 1000);

  // Time calculations
  const secondsInMinute = 60;
  const secondsInHour = secondsInMinute * 60;
  const secondsInDay = secondsInHour * 24;
  const secondsInWeek = secondsInDay * 7;
  const secondsInYear = secondsInDay * 365;

  if (diffInSeconds < secondsInMinute) {
    return `${diffInSeconds} seconds`;
  } else if (diffInSeconds < secondsInHour) {
    const minutes = Math.floor(diffInSeconds / secondsInMinute);

    return `${minutes} minutes`;
  } else if (diffInSeconds < secondsInDay) {
    const hours = Math.floor(diffInSeconds / secondsInHour);

    return `${hours} hours`;
  } else if (diffInSeconds < secondsInWeek) {
    const days = Math.floor(diffInSeconds / secondsInDay);

    return `${days} days`;
  } else if (diffInSeconds < secondsInYear) {
    const options: any = { month: "short", day: "numeric" };

    return date.toLocaleDateString(undefined, options); // e.g., "Feb 26"
  } else {
    return date.getFullYear().toString(); // e.g., "2022"
  }
};

export const timeAgo = (timestamp: number | string | Date) => {
  const date = timestamp instanceof Date ? timestamp : new Date(timestamp);
  const formatter = new Intl.RelativeTimeFormat("en");
  const ranges = [
    ["years", 3600 * 24 * 365],
    ["months", 3600 * 24 * 30],
    ["weeks", 3600 * 24 * 7],
    ["days", 3600 * 24],
    ["hours", 3600],
    ["minutes", 60],
    ["seconds", 1],
  ] as const;
  const secondsElapsed = (date.getTime() - Date.now()) / 1000;

  for (const [rangeType, rangeVal] of ranges) {
    if (rangeVal < Math.abs(secondsElapsed)) {
      const delta = secondsElapsed / rangeVal;
      return formatter.format(Math.round(delta), rangeType);
    }
  }
};

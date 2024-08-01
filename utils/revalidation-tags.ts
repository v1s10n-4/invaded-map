import { ValueOf } from "next/constants";

export type DataTags = typeof tags;
export type TagName = keyof DataTags;
export type TagNameWithoutEverything = Exclude<TagName, "EVERYTHING">;
export type Tag = ValueOf<DataTags>;
export type GetTag = (tagName: TagName, param?: string | null) => string;
export type GetTags = (
  neededTags: TagNameWithoutEverything | TagNameWithoutEverything[],
  specific?: Parameters<GetTag>[1]
) => ReturnType<GetTag>[];
export type GetRequestConfig = (
  neededTags: Parameters<GetTags>[0],
  specific?: Parameters<GetTags>[1],
  revalidate?: NextFetchRequestConfig["revalidate"]
) => NextFetchRequestConfig;

// REVALIDATION TAGS
export const tags = {
  "EVERYTHING": "*",
  "invader": (invaderName: string) => `invaders/${invaderName}`,
  "all map invaders": `map/invaders`,
  "all invaders": `invaders`,
  "invader OG": (url: string) => `get-thumbnail?url=${url}`,
  "highscores search": (searchValue: string) => `search:${searchValue}`,
  "referral code data": (code: string) => `refferal:${code}`,
  "all highscores searches": "highscores/search",
  "highscores": "highscores",
  "all highscores related": "highscores/*",
  "all reviews": "reviews/*",
  "review": (id: string) => `reviews/${id}`,
} as const;

// get one revalidation tag (computed with `specific` if needed)
export const getTag: GetTag = (tagName, specific) => {
  const found = tags[tagName];
  let newTag: string;
  if (typeof found === "function" && specific) {
    newTag = found(specific);
  } else if (typeof found === "string") {
    newTag = found;
  } else {
    throw new Error(
      specific
        ? `Invalid tag type for tag: ${tagName}`
        : `Missing param for tag: ${tagName}`
    );
  }
  return newTag;
};

// get all `neededTags` revalidation tags (computed with `specific` if needed)
export const getTags: GetTags = (neededTags, specific) => {
  let tagList: TagNameWithoutEverything[];
  if (Array.isArray(neededTags)) tagList = neededTags;
  else tagList = [neededTags];
  return tagList.reduce<string[]>(
    (acc, tag) => {
      const newTag = getTag(tag, specific);
      return [...acc, newTag];
    },
    [tags.EVERYTHING]
  );
};

// get `NextFetchRequestConfig` from same params as `getTags` with `revalidate` as third optional param
export const getRequestConfig: GetRequestConfig = (
  neededTags,
  specific,
  revalidate
) => {
  let tags;
  try {
    tags = getTags(neededTags, specific);
  } catch (e) {
    throw e;
  }
  return {
    revalidate,
    tags,
  };
};

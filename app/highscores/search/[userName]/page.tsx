import { FlashInvadersAPI } from "@/app/highscores/utils";
import HighscoreItem from "@/components/Highscores/HighscoreItem";
import { UserSearchResponse } from "@/types/FlashInvadersAPI";
import { BoxClasses } from "@/utils";
import { getRequestConfig } from "@/utils/revalidation-tags";
import { clsx } from "clsx";

type Params = { params: { userName: string } };
export const revalidate = 0;
const getUserSearch: (
  searchValue: string | null
) => Promise<UserSearchResponse> = async (searchValue) => {
  const { userSearch, fetchOptions } = FlashInvadersAPI;
  const next = getRequestConfig(
    ["highscores search", "all highscores searches", "all highscores related"],
    searchValue || "",
    60 * 5
  );
  const res = await fetch(userSearch(searchValue), { ...fetchOptions, next });
  return await res.json();
};

const HighScoreSearchPage = async ({ params: { userName } }: Params) => {
  const highscores = await getUserSearch(userName);
  return (
    <ul className="flex w-full flex-col gap-4 px-1">
      <li>
        <a
          className={clsx(
            "flex justify-center p-4 uppercase text-primary",
            BoxClasses
          )}
          href="/highscores"
        >
          reset
        </a>
      </li>
      {highscores.Players.map((entry) => (
        <HighscoreItem key={entry.name + entry.rank} {...entry} />
      ))}
    </ul>
  );
};

export default HighScoreSearchPage;

import { FlashInvadersAPI } from "@/app/highscores/utils";
import HighscoreItem from "@/components/Highscores/HighscoreItem";
import DiscordIcon from "@/public/icons/discord-logo.svg";
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
  try {
    return await res.json();
  } catch (err) {
    return {};
  }
};

const HighScoreSearchPage = async ({ params: { userName } }: Params) => {
  const highscores = await getUserSearch(userName);
  if (!highscores.Players) {
    return (
      <>
        <h1 className="text-center text-2xl uppercase md:mb-8 md:mt-12 md:text-3xl">
          V2 is <u>still</u> dead, and so are the highscores
        </h1>
        <p>
          Flash Invader high scores are no longer accessible. Migration to v3
          data could be possible, but it comes with privacy limitations. If you
          really need this page, even with v3 data, let&apos;s discuss it on
          Discord.
        </p>
        <a
          href={process.env.NEXT_PUBLIC_DISCORD_INVITE_LINK}
          className="flex items-center gap-2 border-2 border-dashed border-primary px-6 py-2 text-2xl outline-none"
        >
          <DiscordIcon className="h-16 w-16" /> Discord
        </a>
      </>
    );
  }

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

import { FlashInvadersAPI } from "@/app/highscores/utils";
import HighscoreItem from "@/components/Highscores/HighscoreItem";
import DiscordIcon from "@/public/icons/discord-logo.svg";
import { HighScoresResponse } from "@/types/FlashInvadersAPI";
import { getRequestConfig } from "@/utils/revalidation-tags";

const getHighScores: () => Promise<HighScoresResponse> = async () => {
  const { highscores, fetchOptions } = FlashInvadersAPI;
  const next = getRequestConfig(
    ["highscores", "all highscores related"],
    undefined,
    60 * 5
  );
  const res = await fetch(highscores, { ...fetchOptions, next });
  return await res.json();
};
const HighScorePage = async () => {
  const highscores = await getHighScores();
  if (!highscores.Players) {
    return (
      <>
        <h1 className="text-center text-2xl uppercase md:mb-8 md:mt-12 md:text-3xl">
          V2 is dead, and so are the highscores
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
      {highscores.Players.map((entry) => (
        <HighscoreItem key={entry.name + entry.rank} {...entry} />
      ))}
    </ul>
  );
};

export default HighScorePage;

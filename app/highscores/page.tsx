import { FlashInvadersAPI } from "@/app/highscores/utils";
import HighscoreItem from "@/components/Highscores/HighscoreItem";
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
  return (
    <ul className="flex w-full flex-col gap-4 px-1">
      {highscores.Players.map((entry) => (
        <HighscoreItem key={entry.name + entry.rank} {...entry} />
      ))}
    </ul>
  );
};

export default HighScorePage;

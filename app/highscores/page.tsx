import { HighScoresResponse } from "@/types/FlashInvadersAPI";
import { BoxClasses } from "@/utils";
import { clsx } from "clsx";

const requestInit: RequestInit = {
  headers: {
    "sec-ch-ua": '"Chromium";v="113", "Not-A.Brand";v="24"',
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": '"macOS"',
  },
  referrer: "https://www.invaded-map.com/",
  referrerPolicy: "strict-origin-when-cross-origin",
  body: null,
  method: "GET",
  mode: "cors",
  credentials: "omit",
  next: {
    tags: ["highscores"],
  },
};

export const revalidate = 0;

const FlashInvadersAPI = {
  highscores: {
    url: "https://space-invaders.com/api/highscore/?uid=false",
    fetchOptions: requestInit,
  },
};
const getHightScores: () => Promise<HighScoresResponse> = async () => {
  const { url, fetchOptions } = FlashInvadersAPI.highscores;
  const res = await fetch(url, fetchOptions);
  return await res.json();
};
const HightScorePage = async () => {
  const highscores = await getHightScores();
  return (
    <main className="flex justify-center bg-black pb-8 pt-32 text-white">
      <ul className="flex flex-col gap-4 px-2">
        {highscores.Players.map((entry) => (
          <li key={entry.rank} className={clsx("p-4", BoxClasses)}>
            <h4>
              #<span className="font-bold text-primary">{entry.rank}</span>:{" "}
              <span className="text-xl font-bold text-primary">
                {entry.name}
              </span>
            </h4>
            <p className="whitespace-nowrap">
              Score:{" "}
              <span className="font-bold text-primary">{entry.score}</span>,
            </p>
            <p>
              Invaders flashed:{" "}
              <span className="font-bold text-primary">
                {entry.invaders_count}
              </span>
            </p>
            <p>
              Shots:{" "}
              <span className="font-bold text-primary">{entry.nbShots}</span>,
            </p>
            <p>
              Cities discovered:{" "}
              <span className="font-bold text-primary">{entry.city_count}</span>
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default HightScorePage;

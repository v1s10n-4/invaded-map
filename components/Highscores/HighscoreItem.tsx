import { HighScore } from "@/types/FlashInvadersAPI";
import { BoxClasses } from "@/utils";
import { clsx } from "clsx";

export const HighscoreItem = ({
  rank,
  name,
  score,
  invaders_count,
  nbShots,
  city_count,
}: HighScore) => (
  <li key={rank} className={clsx("p-4", BoxClasses)}>
    <h4>
      #<span className="font-bold text-primary">{rank}</span>:{" "}
      <span className="text-xl font-bold text-primary">{name}</span>
    </h4>
    <p className="whitespace-nowrap">
      Score: <span className="font-bold text-primary">{score}</span>,
    </p>
    <p>
      Invaders flashed:{" "}
      <span className="font-bold text-primary">{invaders_count}</span>
    </p>
    <p>
      Shots: <span className="font-bold text-primary">{nbShots}</span>,
    </p>
    <p>
      Cities discovered:{" "}
      <span className="font-bold text-primary">{city_count}</span>
    </p>
  </li>
);

export default HighscoreItem;

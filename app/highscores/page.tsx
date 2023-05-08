import { HighScoresResponse } from '@/types/FlashInvadersAPI';

const requestInit: RequestInit = {
  "headers": {
    "sec-ch-ua": "\"Chromium\";v=\"113\", \"Not-A.Brand\";v=\"24\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"macOS\""
  },
  "referrer": "https://www.invaded-map.com/",
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": null,
  "method": "GET",
  "mode": "cors",
  "credentials": "omit"
}

const FlashInvadersAPI = {
  highscores: {
    url: "https://space-invaders.com/api/highscore/?uid=false",
    fetchOptions: requestInit,
  }
}

export const revalidate = 3600000; // one hour
const getHightScores: () => Promise<HighScoresResponse> = async () => {
  const {url, fetchOptions} = FlashInvadersAPI.highscores;
  const res = await fetch(url, fetchOptions);
  return await res.json();
}
const HightScorePage = async () => {
  const highscores = await getHightScores();
  return (
    <main className="bg-black text-white flex justify-center">
      <ul className="flex flex-col gap-1">
        {highscores.Players.map(entry => (
          <li key={entry.rank} className="border p-2">
            <h4>#{entry.rank}: {entry.name}</h4>
            <p>Score: <span>{entry.score}</span>, Invaders flashed: <span>{entry.invaders_count}</span><br/>Shots: <span>{entry.nbShots}</span>, Cities discovered: <span>{entry.city_count}</span></p>
          </li>
        ))}
      </ul>
    </main>
  )
}

export default HightScorePage;
import HighscoreItem from "@/app/highscores/HighscoreItem";
import { FlashInvadersAPI } from "@/app/highscores/utils";
import { HighScoresResponse } from "@/types/FlashInvadersAPI";
import { getRequestConfig } from "@/utils/revalidation-tags";
import { Table } from "@radix-ui/themes";

const getHighScores: () => Promise<HighScoresResponse> = async () => {
  const { highscores, fetchOptions } = FlashInvadersAPI;
  const next = getRequestConfig(
    ["highscores", "all highscores related"],
    undefined,
    60 * 5
  );
  const res = await fetch(highscores, { ...fetchOptions, next });
  if (res.status !== 200) {
    return {
      Players: [
        {
          rank: res.status,
          name: `Error ${res.statusText}`,
          score: 0,
          city_count: 0,
          invaders_count: 0,
        },
      ],
    };
  }
  return await res.json();
};
const HighScorePage = async () => {
  const highscores = await getHighScores();
  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>#</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Score</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Invaders</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Cities</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {highscores.Players.map((entry) => (
          <HighscoreItem key={entry.name + entry.rank} {...entry} />
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export default HighScorePage;

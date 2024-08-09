import { FlashInvadersAPI } from "@/app/highscores/utils";
import HighscoreItem from "@/components/Highscores/HighscoreItem";
import { UserSearchResponse } from "@/types/FlashInvadersAPI";
import { getRequestConfig } from "@/utils/revalidation-tags";
import { Table } from "@radix-ui/themes";

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
  if (res.status !== 200) {
    return {
      message: "Error",
      code: res.status,
      Players: [
        {
          rank: res.status,
          name: `Error ${res.statusText}`,
          score: 0,
          city_count: 0,
          invaders_count: 0,
          nbShots: 0,
          nbCity: 0,
          isMe: 0,
          isFollow: 0,
          isFriend: 0,
        },
      ],
    };
  }

  return await res.json();
};

const HighScoreSearchPage = async ({ params: { userName } }: Params) => {
  const highscores = await getUserSearch(userName);
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

export default HighScoreSearchPage;

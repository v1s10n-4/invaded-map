import { HighScore } from "@/types/FlashInvadersAPI";
import { Table } from "@v1s10n_4/radix-ui-themes";

export const HighscoreItem = ({
  rank,
  name,
  score,
  invaders_count,
  city_count,
}: HighScore) => (
  <Table.Row>
    <Table.RowHeaderCell>{rank}</Table.RowHeaderCell>
    <Table.Cell>{name}</Table.Cell>
    <Table.Cell>{score}</Table.Cell>
    <Table.Cell>{invaders_count}</Table.Cell>
    <Table.Cell>{city_count}</Table.Cell>
  </Table.Row>
);

export default HighscoreItem;

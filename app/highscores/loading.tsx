import { getRandomLengthString } from "@/app/highscores/utils";
import { Skeleton, Table } from "@v1s10n_4/radix-ui-themes";

const HighscoresLoading = () => (
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
      {Array(32)
        .fill(undefined)
        .map((_, i) => (
          <Table.Row key={i}>
            <Table.RowHeaderCell>
              <Skeleton>{i}</Skeleton>
            </Table.RowHeaderCell>
            <Table.Cell>
              <Skeleton>{getRandomLengthString(8, 32)}</Skeleton>
            </Table.Cell>
            <Table.Cell>
              <Skeleton>{getRandomLengthString(2, 5)}</Skeleton>
            </Table.Cell>
            <Table.Cell>
              <Skeleton>{getRandomLengthString(1, 3)}</Skeleton>
            </Table.Cell>
            <Table.Cell>
              <Skeleton>{getRandomLengthString(1, 2)}</Skeleton>
            </Table.Cell>
          </Table.Row>
        ))}
    </Table.Body>
  </Table.Root>
);
export default HighscoresLoading;

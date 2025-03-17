import { db } from "@/db";
import {
  RewardableActionType,
  rewardableActionTypes,
  rewardTypes,
} from "@/db/schema/rewards";
import {
  Badge,
  Grid,
  Heading,
  Select,
  Text,
  TextArea,
  TextField,
} from "@v1s10n_4/radix-ui-themes";
import { Card, CardContent, CardHeader } from "@/components/Card";
import SubmitButton from "@/components/SubmitButton";
import { revalidateTag, unstable_cache } from "next/cache";
import { getTag, getTags } from "@/utils/revalidation-tags";

const getAllRewards = unstable_cache(
  async () => {
    const res = await db.query.rewardTypes.findMany();
    return res;
  },
  getTags("all rewards"),
  { tags: getTags("all rewards") }
);

const rewardTypeToColor = (type: RewardableActionType) =>
  (
    ({
      POPULARITY: "iris", // "#00A2C7",
      CONTRIBUTION: "jade", // "#30A46C",
      ACHIEVEMENT: "amber", // "#FFC53D",
      TOXICITY: "red", // "#E5484D",
    }) as const
  )[type];

const Page = async () => {
  const rewards = await getAllRewards();
  return (
    <div className="mx-auto flex max-w-screen-sm flex-col gap-6">
      <Grid columns="3" gap="3" width="auto">
        {rewards.map((reward) => (
          <Card key={reward.id}>
            <CardHeader>
              <Heading as="h5" size="5">
                {reward.name}
              </Heading>
              <Badge
                color={rewardTypeToColor(reward.type)}
                className="capitalize"
                size="1"
              >
                {reward.type.toLowerCase()}
              </Badge>
              <Text size="2">{reward.points} pts</Text>
            </CardHeader>
            <CardContent>
              <Text size="1">{reward.description}</Text>
            </CardContent>
          </Card>
        ))}
      </Grid>
      <Card asChild className="flex flex-col gap-3">
        <form
          action={async (formData) => {
            "use server";
            console.log(formData);
            await db.insert(rewardTypes).values([
              {
                name: formData.get("name") as string,
                points: Number(formData.get("points")),
                description: (formData.get("description") as string) || null,
                type: formData.get("type") as RewardableActionType,
              },
            ]);
            revalidateTag(getTag("all rewards"));
          }}
        >
          <TextField.Root name="name" placeholder="Name" required size="3" />
          <Select.Root name="type" size="3" required>
            <Select.Trigger placeholder="Type" />
            <Select.Content>
              <Select.Group>
                <Select.Label>Reward type</Select.Label>
                {rewardableActionTypes.enumValues.map((type) => (
                  <Select.Item key={type} value={type}>
                    {type}
                  </Select.Item>
                ))}
              </Select.Group>
            </Select.Content>
          </Select.Root>
          <TextField.Root
            name="points"
            type="number"
            min={-1000}
            max={1000}
            placeholder="Points"
            required
            size="3"
          />
          <TextArea
            name="description"
            placeholder="Description"
            required
            size="3"
          />
          <SubmitButton size="4">Add</SubmitButton>
        </form>
      </Card>
    </div>
  );
};

export default Page;

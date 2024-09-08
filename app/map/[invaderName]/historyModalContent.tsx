import {
  ContributionData,
  getInvaderHistory,
  getUpdateLabel,
} from "@/app/map/[invaderName]/utils";
import { Invader, User } from "@/db";
import {
  Blockquote,
  Button,
  Card,
  Dialog,
  Flex,
  IconButton,
  Separator,
  Skeleton,
  Text,
  VisuallyHidden,
} from "@radix-ui/themes";
import CircleIcon from "pixelarticons/svg/circle.svg";
import CloseIcon from "pixelarticons/svg/close.svg";
import React, { ComponentProps, FC, ReactNode, Suspense } from "react";

export const InvaderContributionHistory: FC<Invader> = async ({
  id,
  images,
  create_date,
}) => {
  const getter = await getInvaderHistory(id);
  const res = await getter();
  if (res.length === 0 || res[res.length - 1].type !== "create") {
    res.push({
      id: -1,
      reviewer_id: "v1s10n_4",
      created_at: new Date("05-07-2023"),
      comment: `Photos credits: (${["Awazleon", ...new Set(images.slice(0, 1).map(({ author }) => author))].join(", ")})`,
      entity_id: -1,
      editor_id: "v1s10n_4",
      data: null,
      type: "create",
      editor: {
        name: "v1s10n_4",
      } as User,
    });
  }
  return (
    <Flex direction="column">
      <Flex gap="2">
        <Flex direction="column" align="center">
          <CircleIcon className="h-4 w-4 shrink-0 text-[--accent-9]" />
          <Separator orientation="vertical" size="4" />
        </Flex>
        <Text size="1" mt="2px" mb="4">
          Now
        </Text>
      </Flex>
      {res.map((contribution, i) => (
        <HistoryItem
          key={contribution.id}
          date={contribution.created_at}
          text={
            contribution.type === "edit" ? (
              <p>
                Updated{" "}
                {getUpdateLabel(contribution.data as ContributionData<"edit">)}{" "}
                ({contribution.editor.name})
              </p>
            ) : (
              <p>
                {contribution.type === "create"
                  ? "Added to Invaded Map"
                  : "deleted"}
              </p>
            )
          }
          comment={contribution.comment}
        />
      ))}
      <HistoryItem date={create_date} text="Invader has been installed" end />
    </Flex>
  );
};

type LoadableComponentProps<T extends ComponentProps<any>> =
  | ({ loading?: true } & Partial<Omit<T, "loading">>)
  | ({ loading?: false } & T);

const HistoryItem: FC<
  LoadableComponentProps<{
    date?: number | Date;
    text: ReactNode;
    comment?: string | null;
    end?: boolean;
  }>
> = ({ date, text, comment, end = false, loading = false }) => {
  return (
    <Flex gap="2">
      <Flex direction="column" align="center">
        <Skeleton loading={loading} className="rounded-full">
          <CircleIcon className="h-4 w-4 shrink-0 text-[--accent-9]" />
        </Skeleton>
        {!end && (
          <Skeleton loading={loading}>
            <Separator orientation="vertical" size="4" />
          </Skeleton>
        )}
      </Flex>
      {date ? (
        <Flex direction="column" gap="1" mt="2px">
          <Text size="1" asChild>
            <time>
              <Skeleton loading={loading}>
                {new Date(date).toLocaleDateString()}
              </Skeleton>
            </time>
          </Text>
          <Card mb="4" className={loading ? "pt-2" : "pt-3"}>
            <Text size="1">
              <Skeleton loading={loading}>{text}</Skeleton>
            </Text>
            {comment && (
              <Blockquote size="1">
                <Skeleton loading={loading}>{comment}</Skeleton>
              </Blockquote>
            )}
          </Card>
        </Flex>
      ) : (
        <Text size="1" mt="2px" mb="4" asChild>
          <time>
            <Skeleton loading={loading}>Now</Skeleton>
          </time>
        </Text>
      )}
    </Flex>
  );
};

const ContributionHistorySkeleton = () => (
  <Flex direction="column">
    <HistoryItem loading text="now" />
    <HistoryItem
      loading
      date={new Date()}
      text="Added to Invaded Map"
      comment="Photos credits: (Awazleon, fesse)"
    />
    <HistoryItem
      loading
      date={new Date()}
      text="Invader has been installed"
      end
    />
  </Flex>
);

const HistoryModalContent: FC<Invader> = ({ ...invader }) => {
  return (
    <Dialog.Content className="relative">
      <Dialog.Close>
        <IconButton
          size="2"
          color="gray"
          variant="ghost"
          type="button"
          className="absolute right-3 top-3"
        >
          <CloseIcon className="h-6 w-6" />
        </IconButton>
      </Dialog.Close>
      <Dialog.Title>Change history</Dialog.Title>
      <VisuallyHidden asChild>
        <Dialog.Description>
          All changes made to {invader.name} are listed here by date
        </Dialog.Description>
      </VisuallyHidden>
      <Suspense fallback={<ContributionHistorySkeleton />}>
        <InvaderContributionHistory {...invader} />
      </Suspense>
      <Flex mt="4" justify="end">
        <Dialog.Close>
          <Button type="button" size="3">
            Close
          </Button>
        </Dialog.Close>
      </Flex>
    </Dialog.Content>
  );
};

export default HistoryModalContent;

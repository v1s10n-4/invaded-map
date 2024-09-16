"use client";
import React, { useMemo } from "react";
import { useNotifications } from "@novu/react";
import {
  Button,
  Flex,
  ScrollArea,
  Skeleton,
  Text,
} from "@v1s10n_4/radix-ui-themes";
import { useNotificationFilterStatus } from "@/app/NotificationFilterStatus";
import NotificationItem from "@/app/NotificationItem";

export default function NotificationList() {
  const { status } = useNotificationFilterStatus();
  const filter = useMemo(() => {
    if (status === "unread") {
      return { read: false };
    } else if (status === "archived") {
      return { archived: true };
    }

    return { archived: false };
  }, [status]);
  const { notifications, isLoading, isFetching, hasMore, fetchMore, error } =
    useNotifications(filter);

  const handleLoadMore = async () => {
    if (hasMore && !isLoading) {
      await fetchMore();
    }
  };

  return (
    <ScrollArea style={{ flex: 1 }}>
      <Flex direction="column" gap="1">
        {isLoading &&
          Array(4)
            .fill()
            .map((_, i) => <Skeleton key={i} height="56px" />)}
        {notifications?.map((notification) => (
          <NotificationItem key={notification.id} notification={notification} />
        ))}
        {!notifications?.length && (
          <Text size="1" m="2" align="center">
            You’re all caught up! Check back soon for new alerts.
          </Text>
        )}
        {hasMore && (
          <Flex justify="center" p="4">
            <Button onClick={handleLoadMore} disabled={isLoading}>
              {isLoading ? "Loading..." : "Load More"}
            </Button>
          </Flex>
        )}
      </Flex>
    </ScrollArea>
  );
}

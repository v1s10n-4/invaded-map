"use client";
import { Avatar, Box, Card, IconButton, Text } from "@v1s10n_4/radix-ui-themes";
import type { Notification } from "@novu/react";
import MailDeleteIcon from "pixelarticons/svg/mail-delete.svg";
import MailCheckIcon from "pixelarticons/svg/mail-check.svg";
import React, { FC } from "react";
import { timeAgo } from "@/lib/utils";

const NotificationItem: FC<{ notification: Notification }> = ({
  notification,
}) => {
  return (
    <Card
      key={notification.id}
      className="flex gap-3"
      variant="classic"
      style={{
        backgroundColor: notification.isRead ? "" : "var(--color-panel-solid)",
      }}
    >
      {notification.avatar && (
        <Avatar
          size="3"
          src={notification.avatar}
          fallback={notification.body[0] || "N"}
        />
      )}
      <Box style={{ flex: 1 }}>
        <Text size="2" weight={notification.isRead ? "regular" : "bold"}>
          {notification.body}
        </Text>
        <Text size="1" color="gray" asChild>
          <time> ({timeAgo(notification.createdAt)})</time>
        </Text>
      </Box>
      {notification.isRead ? (
        <IconButton
          size="1"
          variant="outline"
          onClick={() => notification.unread()}
        >
          <MailDeleteIcon />
        </IconButton>
      ) : (
        <IconButton
          size="1"
          variant="outline"
          onClick={() => notification.read()}
        >
          <MailCheckIcon />
        </IconButton>
      )}
    </Card>
  );
};

export default NotificationItem;

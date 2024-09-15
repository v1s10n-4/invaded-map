"use client";
import React from "react";
import { Inbox } from "@novu/react";

export default function NotificationInbox() {
  // const { notifications, hasMore, fetchMore, isLoading } = useNotifications();
  // const { counts } = useCounts({ filters: [] });
  //
  // const handleLoadMore = async () => {
  //   if (hasMore && !isLoading) {
  //     await fetchMore();
  //   }
  // };

  return (
    <Inbox
      applicationIdentifier="Q3MtSymCOQDP"
      subscriberId="on-boarding-subscriber-id-123"
    />
  );
  // return (
  //   <Box
  //     style={{
  //       width: "400px",
  //       height: "600px",
  //       border: "1px solid var(--gray-6)",
  //     }}
  //   >
  //     <Flex direction="column" style={{ height: "100%" }}>
  //       <Box p="4" style={{ borderBottom: "1px solid var(--gray-6)" }}>
  //         <Flex justify="between" align="center">
  //           <Text size="5" weight="bold">
  //             Notifications
  //           </Text>
  //           <Badge size="2" color="blue">
  //             {counts?.length} Unread
  //           </Badge>
  //         </Flex>
  //       </Box>
  //       <ScrollArea style={{ flex: 1 }}>
  //         {notifications?.map((notification) => (
  //           <Flex
  //             key={notification.id}
  //             p="4"
  //             gap="3"
  //             align="start"
  //             style={{
  //               borderBottom: "1px solid var(--gray-6)",
  //               backgroundColor: notification.isRead
  //                 ? "transparent"
  //                 : "var(--gray-2)",
  //             }}
  //           >
  //             <Avatar
  //               size="3"
  //               src={notification.avatar}
  //               fallback={notification.body[0] || "N"}
  //             />
  //             <Box style={{ flex: 1 }}>
  //               <Text
  //                 size="2"
  //                 weight={notification.isRead ? "regular" : "bold"}
  //               >
  //                 {notification.body}
  //               </Text>
  //               <Text size="1" color="gray">
  //                 {new Date(notification.createdAt).toLocaleString()}
  //               </Text>
  //             </Box>
  //             {!notification.read && (
  //               <Button size="1" variant="outline" onClick={notification.read}>
  //                 Mark as Read
  //               </Button>
  //             )}
  //           </Flex>
  //         ))}
  //         {hasMore && (
  //           <Flex justify="center" p="4">
  //             <Button onClick={handleLoadMore} disabled={isLoading}>
  //               {isLoading ? "Loading..." : "Load More"}
  //             </Button>
  //           </Flex>
  //         )}
  //       </ScrollArea>
  //     </Flex>
  //   </Box>
  // );
}

import React from "react";
import { auth } from "@/auth";
import { ClientProviders, NotificationCenter } from "@/app/NotificationLoaders";

const Notifications = async () => {
  const session = await auth();
  return (
    <ClientProviders
      applicationIdentifier={process.env.NEXT_PUBLIC_NOVU_APP_ID!}
      subscriberId={session?.user?.id || "publicSubscriberId"}
    >
      <NotificationCenter />
    </ClientProviders>
  );
};

export default Notifications;

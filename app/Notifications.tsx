import React from "react";
import { auth } from "@/auth";
import dynamic from "next/dynamic";
import { Spinner } from "@v1s10n_4/radix-ui-themes";

const ClientProviders = dynamic(() => import("@/app/ClientProviders"), {
  ssr: false,
  loading: () => <Spinner className="h-8 w-8" />,
});

const NotificationCenter = dynamic(() => import("@/app/NotificationCenter"), {
  ssr: false,
  loading: () => <Spinner className="h-8 w-8" />,
});

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

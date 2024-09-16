"use client";

import { NovuProvider } from "@novu/react";
import React, { ComponentProps, FC, PropsWithChildren } from "react";
import NotificationFilterStatusProvider from "@/app/NotificationFilterStatus";

const ClientProviders: FC<
  PropsWithChildren<
    Pick<
      ComponentProps<typeof NovuProvider>,
      "applicationIdentifier" | "subscriberId"
    >
  >
> = ({ applicationIdentifier, subscriberId, children }) => {
  return (
    <NovuProvider
      applicationIdentifier={applicationIdentifier}
      subscriberId={subscriberId}
    >
      <NotificationFilterStatusProvider>
        {children}
      </NotificationFilterStatusProvider>
    </NovuProvider>
  );
};

export default ClientProviders;

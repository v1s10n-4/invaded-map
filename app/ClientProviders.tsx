"use client";

import { NovuProvider } from "@novu/react";
import React, { FC, PropsWithChildren } from "react";
import NotificationFilterStatusProvider from "@/app/NotificationFilterStatus";

const ClientProviders: FC<PropsWithChildren> = ({ children }) => {
  return (
    <NovuProvider
      applicationIdentifier="Q3MtSymCOQDP"
      subscriberId="on-boarding-subscriber-id-123"
    >
      <NotificationFilterStatusProvider>
        {children}
      </NotificationFilterStatusProvider>
    </NovuProvider>
  );
};

export default ClientProviders;

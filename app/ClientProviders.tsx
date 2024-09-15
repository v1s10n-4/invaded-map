"use client";

import { NovuProvider } from "@novu/react";
import { FC, PropsWithChildren } from "react";

const ClientProviders: FC<PropsWithChildren> = ({ children }) => {
  return (
    <NovuProvider
      applicationIdentifier="Q3MtSymCOQDP"
      subscriberId="on-boarding-subscriber-id-123"
    >
      {children}
    </NovuProvider>
  );
};

export default ClientProviders;

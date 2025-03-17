"use client";

import dynamic from "next/dynamic";
import { Spinner } from "@v1s10n_4/radix-ui-themes";
import React from "react";

export const ClientProviders = dynamic(() => import("@/app/ClientProviders"), {
  ssr: false,
  loading: () => <Spinner className="h-8 w-8" />,
});

export const NotificationCenter = dynamic(
  () => import("@/app/NotificationCenter"),
  {
    ssr: false,
    loading: () => <Spinner className="h-8 w-8" />,
  }
);

import { lazy } from "react";

const icons = {
  google: lazy(async () => import("@/public/icons/google-logo.svg")),
  discord: lazy(async () => import("@/public/icons/discord-logo.svg")),
  invadedMap: lazy(async () => import("@/public/icons/logo.svg")),
};
export default icons;

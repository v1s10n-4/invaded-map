import { lazy } from "react";

const icons = {
  google: lazy(() => import("@/public/icons/google-logo.svg")),
  discord: lazy(() => import("@/public/icons/discord-logo.svg")),
  invadedMap: lazy(() => import("@/public/icons/logo.svg")),
};
export default icons;

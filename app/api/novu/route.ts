import { contributionReviewed } from "@/novu/workflows";
// @ts-ignore
import { serve } from "@novu/framework/next";
// import { serve } from "@novu/framework/dist/servers/next";

export const runtime = "nodejs";
// the workflows collection can hold as many workflow definitions as you need
export const { GET, POST, OPTIONS } = serve({
  workflows: [contributionReviewed],
});

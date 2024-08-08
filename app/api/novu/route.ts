import { contributionReviewed } from "@/novu/workflows";
import { serve } from "@novu/framework/next";

export const runtime = "nodejs";
// the workflows collection can hold as many workflow definitions as you need
export const { GET, POST, OPTIONS } = serve({
  workflows: [contributionReviewed],
});

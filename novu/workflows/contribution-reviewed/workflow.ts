import { workflow } from "@novu/framework";
import { z } from "zod";

export const contributionReviewed = workflow(
  "contribution-reviewed",
  async ({ step, payload }) => {
    await step.inApp("contribution review", async () => {
      return {
        subject: `Contribution reviewed!`,
        body: `Your contribution to ${payload.entity_name} has been ${payload.approved ? "approved!" : "rejected. If you think this is a mistake, let's talk on discord, we'll look into it."}`,
      };
    });
  },
  {
    payloadSchema: z.object({
      approved: z.boolean(),
      entity_name: z.string(),
    }),
  }
);

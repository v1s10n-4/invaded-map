import { workflow } from "@novu/framework";
// import { emailControlSchema, payloadSchema } from "./schemas";

export const contributionReviewed = workflow(
  "contribution-reviewed",
  async ({ step, payload }) => {
    await step.inApp(
      "send-email",
      async (controls) => {
        return {
          subject: controls.subject,
          body: "your contribution has been reviewed",
        };
      },
      {
        // controlSchema: emailControlSchema,
      }
    );
  },
  {
    // payloadSchema,
  }
);

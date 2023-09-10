import { redirect } from "next/navigation";
import { clsx } from "clsx";
import DiscordIcon from "@/app/help/discord.svg";

export const runtime = "edge";

const DISCORD_INVITE_LINK = process.env.NEXT_PUBLIC_DISCORD_INVITE_LINK!;
const FeedbackPage = () => {
  const submitFeedback = async (formData: FormData) => {
    "use server";
    const { content } = Object.fromEntries(formData.entries());
    if (!content) return;
    const res = await fetch(process.env.DISCORD_WEBHOOK!, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        content,
      }),
    });
    if (res.status !== 204) {
      console.log(new Error("feedback form submit failed"));
    }
    redirect("/help/thanks");
  };
  return (
    <main className="mx-auto flex h-full flex-col items-center gap-8 bg-black px-4 pb-8 pt-32 text-primary md:max-w-screen-md md:px-12">
      <h4 className="text-center text-2xl uppercase md:mb-8 md:mt-12 md:text-3xl">
        Help & support
      </h4>
      <a
        href={DISCORD_INVITE_LINK}
        className="flex items-center gap-2 border-2 border-dashed border-primary px-6 py-2 text-2xl outline-none"
      >
        <DiscordIcon className="h-16 w-16" /> Discord
      </a>
      <div
        className={clsx(
          "flex w-full items-center border-none text-center",
          "before:mr-2 before:flex-1 before:border before:border-primary",
          "after:ml-2 after:flex-1 after:border after:border-primary"
        )}
      >
        Or
      </div>
      <p className="md:text-md text-sm">
        Ask questions, report problems, or just leave some feedback.
      </p>
      <form
        action={submitFeedback}
        className="flex h-full w-full flex-col gap-4 md:h-fit"
      >
        <textarea
          required
          name="content"
          className="input relative h-full w-full border border-primary p-4 placeholder-primary/40 !outline-primary scrollbar scrollbar-thumb-current scrollbar-track-black md:h-60"
          placeholder="Share your thoughts..."
        />
        <button
          className={clsx(
            "px-4 py-2 text-2xl",
            "border border-primary outline-none",
            "ring-2 ring-transparent ring-offset-2 ring-offset-black focus-within:ring-primary"
          )}
        >
          Submit
        </button>
      </form>
    </main>
  );
};

export default FeedbackPage;

import SubmitButton from "@/components/SubmitButton";
import {
  Button,
  Flex,
  Separator,
  Slot,
  Spinner,
  Text,
  TextArea,
} from "@radix-ui/themes";
import { redirect } from "next/navigation";
import { clsx } from "clsx";
import DiscordIcon from "@/public/icons/discord-logo.svg";
import { Metadata } from "next";

export const runtime = "edge";

const DISCORD_INVITE_LINK = process.env.NEXT_PUBLIC_DISCORD_INVITE_LINK!;

export const metadata: Metadata = {
  title: "Invaded Map | Help",
  description: "Ask questions, report problems, or just leave some feedback.",
};
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
      <h1 className="text-center text-2xl uppercase md:mb-8 md:mt-12 md:text-3xl">
        Help & support
      </h1>
      <Flex p={"4"} gap={"4"} justify="center" align="center">
        <Spinner size="1" />
        <Spinner size="2" />
        <Spinner size="3" />
        <Button loading>
          <Slot>asdf</Slot>
          Fesse
        </Button>
      </Flex>
      <a
        href={DISCORD_INVITE_LINK}
        className="flex items-center gap-2 border-2 border-dashed border-primary px-6 py-2 text-2xl outline-none"
      >
        <DiscordIcon className="h-16 w-16" /> Discord
      </a>
      <Separator
      // className={clsx(
      //   "flex w-full items-center border-none text-center",
      //   "before:mr-2 before:flex-1 before:border before:border-primary",
      //   "after:ml-2 after:flex-1 after:border after:border-primary"
      // )}
      >
        Or
      </Separator>
      <Text>Ask questions, report problems, or just leave some feedback.</Text>
      <form
        action={submitFeedback}
        className="flex h-full w-full flex-col gap-4 md:h-fit"
      >
        <TextArea
          required
          name="content"
          placeholder="Share your thoughts..."
        />
        <SubmitButton>Submit</SubmitButton>
      </form>
    </main>
  );
};

export default FeedbackPage;

import SubmitButton from "@/components/SubmitButton";
import DiscordIcon from "@/public/icons/discord-logo.svg";
import {
  Button,
  Container,
  Flex,
  Heading,
  Section,
  Separator,
  Text,
  TextArea,
} from "@radix-ui/themes";
import { Metadata } from "next";
import { redirect } from "next/navigation";

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
    <Container size="1" asChild>
      <main>
        <Section size="4" px={{ initial: "2", sm: "0" }}>
          <Flex direction="column" gap="8" align="center">
            <Heading align="center">Help & support</Heading>
            <Button asChild size="4" variant="outline">
              <a href={DISCORD_INVITE_LINK}>
                <DiscordIcon className="h-8 w-8" /> Discord
              </a>
            </Button>
            <Separator size="4" />
            <Text>
              Ask questions, report problems, or just leave some feedback.
            </Text>
            <Flex asChild direction="column" gap="2">
              <form action={submitFeedback}>
                <TextArea
                  required
                  name="content"
                  placeholder="Share your thoughts..."
                  size="3"
                />
                <SubmitButton size="4">Submit</SubmitButton>
              </form>
            </Flex>
          </Flex>
        </Section>
      </main>
    </Container>
  );
};

export default FeedbackPage;

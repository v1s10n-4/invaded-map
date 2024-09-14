import DiscordIcon from "@/public/icons/discord-logo.svg";
import {
  Button,
  Container,
  Flex,
  Heading,
  Section,
  Text,
} from "@v1s10n_4/radix-ui-themes";

export const runtime = "edge";

const DISCORD_INVITE_LINK = process.env.NEXT_PUBLIC_DISCORD_INVITE_LINK!;
const FeedbackPage = () => (
  <Container size="1" asChild>
    <main>
      <Section size="4" px={{ initial: "2", sm: "0" }}>
        <Flex direction="column">
          <Heading mb="4" align="center">
            Thanks for your message!
          </Heading>
          <Text size="2" mb="4" align="center">
            Your feedback matters and helps us grow. Join our Discord to
            contribute to our street art community website&apos;s growth!
          </Text>
          <Text size="1" mb="8" align="center">
            Your input, ideas, and passion are what fuel our progress.
            Let&apos;s collaborate to create the ultimate hub for street art
            enthusiasts. Together, we&apos;ll shape the future of this website!
          </Text>
          <Button asChild size="4" variant="outline" mx="auto">
            <a href={DISCORD_INVITE_LINK}>
              <DiscordIcon className="h-8 w-8" /> Discord
            </a>
          </Button>
        </Flex>
      </Section>
    </main>
  </Container>
);

export default FeedbackPage;

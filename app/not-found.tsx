import { Card } from "@/components/Card";
import { Container, Heading, Section, Text } from "@radix-ui/themes";

export const runtime = "edge";

export function ErrorPage() {
  const textShadow = {
    textShadow: `var(--accent-8) 0px 0px 0.2em`,
  };
  return (
    <Container px="4" asChild>
      <main>
        <Section className="flex justify-center">
          <Card
            elevation
            className="flex flex-col items-center justify-center gap-4 border-2 border-[--accent-9] p-4 lg:gap-6 lg:p-6 lg:pt-8"
          >
            <Heading style={textShadow}>404</Heading>
            <Text size="4" className="text-3xl lg:text-5xl" style={textShadow}>
              INVADER
            </Text>
            <Text size="3" className="text-2xl lg:text-4xl" style={textShadow}>
              NOT FOUND
            </Text>
          </Card>
        </Section>
      </main>
    </Container>
  );
}

export default ErrorPage;

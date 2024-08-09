import SubmitButton from "@/components/SubmitButton";
import { Container, Flex, Heading, Section, TextField } from "@radix-ui/themes";
import { redirect } from "next/navigation";
import Search from "pixelarticons/svg/search.svg";
import { FC, PropsWithChildren } from "react";

const search = async (data: FormData) => {
  "use server";
  const value = data.get("search");
  if (value) redirect(`/highscores/search/${value}`);
  else redirect("/highscores");
};

const HighScoreLayout: FC<PropsWithChildren> = async ({ children }) => {
  return (
    <Container px={{ initial: "1", sm: "2" }}>
      <Section>
        <Heading weight={{ lg: "light" }} mb="6" align="center">
          Flash Invaders highscores
        </Heading>
        <Flex direction="column" justify="center" gap="4" asChild>
          <main>
            <Flex asChild gap="4">
              <form action={search}>
                <TextField.Root
                  name="search"
                  type="search"
                  placeholder="username"
                  size="3"
                  required
                  className="w-full"
                >
                  <TextField.Slot>
                    <Search width={16} height={16} />
                  </TextField.Slot>
                </TextField.Root>
                <SubmitButton size="3">Search</SubmitButton>
              </form>
            </Flex>
            {children}
          </main>
        </Flex>
      </Section>
    </Container>
  );
};

export default HighScoreLayout;

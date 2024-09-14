import { Button, Flex } from "@v1s10n_4/radix-ui-themes";
import Link from "next/link";
import { FC, PropsWithChildren } from "react";

const HighScoreSearchLayout: FC<PropsWithChildren> = async ({ children }) => {
  return (
    <Flex direction="column" gap="4">
      {children}
      <Button variant="outline" size="4">
        <Link href={"/highscores"}>RESET</Link>
      </Button>
    </Flex>
  );
};

export default HighScoreSearchLayout;

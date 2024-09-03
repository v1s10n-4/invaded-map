import { Flex, Spinner } from "@radix-ui/themes";
import React from "react";

export const runtime = "edge";
const RootLoading = () => (
  <Flex
    id="root-loader"
    position="fixed"
    inset="0"
    align="center"
    justify="center"
  >
    <Spinner size="3" />
  </Flex>
);
export default RootLoading;

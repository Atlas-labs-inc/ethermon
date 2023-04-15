import React from "react";
import useStore from "../store";
import { SillyLittleButton } from "./SillyLittleButton";
import { Flex, Text } from "@chakra-ui/react";

export const Treasury: React.FC = () => {
  const treasuryAmount = useStore((state) => state.treasuryAmount);

  return (
    <Flex w="300px" h="40px" bgColor="yellow" align="center" justify="center">
      <Text>Treasury: {treasuryAmount} ETH</Text>
    </Flex>
  );
};

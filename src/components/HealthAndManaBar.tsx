import React from "react";
import { Box, Flex, Circle, Progress, Spacer, Text } from "@chakra-ui/react";

export const HealthAndManaBar = ({ health, mana }) => {
  const maxHealth = 100;
  const maxMana = 10;

  const manaCircles = new Array(maxMana)
    .fill(0)
    .map((_, index) => (
      <Circle
        key={index}
        size="20px"
        bg={index < mana ? "blue.500" : "gray.300"}
        mx={1}
      />
    ));

  return (
    <Flex direction="column" alignItems="flex-start">
      <Text fontWeight="bold" mb={1}>
        Health:
      </Text>
      <Box w="100%" mb={4}>
        <Progress
          value={health}
          max={maxHealth}
          borderRadius="md"
          colorScheme="red"
          size="lg"
        />
      </Box>
      <Text fontWeight="bold" mb={1}>
        Mana:
      </Text>
      <Flex>
        {manaCircles}
        <Spacer />
      </Flex>
    </Flex>
  );
};

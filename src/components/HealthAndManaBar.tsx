import React from "react";
import { Box, Flex, Text, Icon } from "@chakra-ui/react";
import { FaHeart, FaBolt } from "react-icons/fa";

export const HealthAndManaBar = ({ health, mana }) => {
  const maxHealth = 200;
  const maxMana = 10;
  const healthChunkWidth = 1;
  const manaChunkWidth = 40;

  const healthChunks = new Array(maxHealth / healthChunkWidth)
    .fill(0)
    .map((_, index) => (
      <Box
        border={"none"}
        key={index}
        w={`100px`}
        h="20px"
        borderRadius="md"
        mx={0}
        bgGradient={
          index * healthChunkWidth < health
            ? "linear(to-r, red.500, red.500)"
            : "linear(to-r, gray.500, gray.500)"
        }
        transform="skewX(-20deg)"
        _before={{
          content: '""',
          display: "block",
          paddingTop: "20%",
        }}
      />
    ));

  const manaChunks = new Array(maxMana).fill(0).map((_, index) => (
    <Box
      key={index}
      w={`${manaChunkWidth}px`}
      h="20px"
      borderRadius="4px"
      mx={1}
      bgGradient={
        index < mana
          ? "linear(to-r, yellow.500, orange.500)"
          : "linear(to-r, gray.500, gray.500)"
      }
      transform="skewX(-20deg)"
      _before={{
        content: '""',
        display: "block",
        paddingTop: "20%",
      }}
    />
  ));

  return (
    <Flex
      bg="rgba(0,0,0,0.5)"
      position="absolute"
      ml="-100px"
      mt="-50px"
      border={"4px"}
      borderColor="#555"
      direction="column"
      borderRadius={"14px"}
      align={"left"}
      textAlign="left"
      py="10px"
      px="20px"
      alignItems="center"
      width="550px"
      h="170px"
    >
      <Text fontWeight="bold" fontSize={"20px"} color="white" mb={1}>
        Health ({health}/{maxHealth})
      </Text>
      <Flex w="100%" mb={4} alignItems="center">
        <Icon as={FaHeart} boxSize={6} color="red.500" mr={2} />
        {healthChunks}
      </Flex>
      <Text fontWeight="bold" fontSize={"20px"} color="white" mb={1}>
        Mana ({mana}/{maxMana})
      </Text>
      <Flex w="100%" alignItems="center">
        <Icon as={FaBolt} boxSize={6} color="yellow.500" mr={2} />
        {manaChunks}
      </Flex>
    </Flex>
  );
};

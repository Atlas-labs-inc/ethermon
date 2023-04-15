import React from "react";
import useStore from "../store";
import { Box, Flex, Text, Image } from "@chakra-ui/react";

export const Treasury: React.FC = () => {
  const treasuryAmount = useStore((state) => state.treasuryAmount);

  return (
    <Box
      mt="10px"
      mb="-20px"
      w="280px"
      h="80px"
      fontSize="23px"
      cursor="pointer"
      transition="all 0.2s"
      // _hover={{ width: "290px", fontSize: "24px" }}
      onDragStart={(event) => event.preventDefault()}
    >
      <Image
        src="https://d6hckkykh246u.cloudfront.net/Connected.png"
        w="100%"
        h="100%"
      />
      <Text
        position="relative"
        top="-6.5vh"
        align={"center"}
        textAlign="center"
        fontStyle="italic"
        color="white"
        fontWeight={"900"}
        textShadow="2px 2px 4px rgba(0, 0, 0, 0.4)" // Add this line for drop shadow
      >
        TREASURY Ξ {treasuryAmount.toFixed(2)}
      </Text>
    </Box>
  );
};

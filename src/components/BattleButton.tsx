import React from "react";
import { useRouter } from "next/router";
import { Box, Button, Image } from "@chakra-ui/react";

export const BattleButton: React.FC = () => {
  const router = useRouter();

  const handleNavigation = (route: string) => {
    router.push(route);
  };
  const bgColor = "linear-gradient(0deg, #74C720 0%, #40a367 100%)";
  return (
    <Box
      mt="10px"
      mb="-20px"
      w="308px"
      h="130px"
      onClick={() => handleNavigation("/battle")}
      cursor="pointer"
      _hover={{ width: "330px", transition: "all 0.3s" }}
      onDragStart={(event) => event.preventDefault()}
    >
      <Image src="https://i.ibb.co/LvWqz8h/Button.png" w="100%" h="100%" />
    </Box>
  );
};

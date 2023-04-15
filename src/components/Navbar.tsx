import React from "react";
import { VStack, Box, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { SillyLittleButton } from "./SillyLittleButton";

export const Navbar: React.FC = () => {
  const router = useRouter();

  const handleNavigation = (route: string) => {
    router.push(route);
  };

  return (
    <Flex>
      <VStack spacing={4} align="left">
        <SillyLittleButton
          selected={router.pathname === "/"}
          onClick={() => handleNavigation("/")}
        >
          Home
        </SillyLittleButton>
        <SillyLittleButton
          selected={router.pathname === "/collection"}
          onClick={() => handleNavigation("/collection")}
        >
          My Collection
        </SillyLittleButton>
        <SillyLittleButton
          selected={router.pathname === "/drop"}
          onClick={() => handleNavigation("/drop")}
        >
          Latest Drop
        </SillyLittleButton>
      </VStack>
    </Flex>
  );
};

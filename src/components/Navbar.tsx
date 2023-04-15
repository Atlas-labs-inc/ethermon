import React from "react";
import { VStack, Box, Flex, Image } from "@chakra-ui/react";
import { useRouter } from "next/router";

export const Navbar: React.FC = () => {
  const router = useRouter();

  const handleNavigation = (route: string) => {
    router.push(route);
  };

  return (
    <Flex alignSelf={"flex-start"}>
      <VStack spacing={0.1} align="left">
        <Box
          w="160px"
          h="80px"
          onClick={() => handleNavigation("/")}
          cursor="pointer"
          _hover={{ width: "170px", transition: "all 0.3s" }}
          onDragStart={(event) => event.preventDefault()}
        >
          <Image
            src={
              router.pathname === "/"
                ? "https://i.ibb.co/HYgWhkR/home.png"
                : "https://i.ibb.co/5K9TTx8/home-green.png"
            }
            w="100%"
            h="100%"
          />
        </Box>
        <Box
          w="280px"
          h="80px"
          onClick={() => handleNavigation("/collection")}
          cursor="pointer"
          _hover={{ width: "290px", transition: "all 0.3s" }}
          onDragStart={(event) => event.preventDefault()}
        >
          <Image
            src={
              router.pathname === "/collection"
                ? "https://i.ibb.co/42sF6Hw/collection.png"
                : "https://i.ibb.co/cy7btsK/collection-green.png"
            }
            w="100%"
            h="100%"
          />
        </Box>
        <Box
          w="150px"
          h="80px"
          onClick={() => handleNavigation("/drop")}
          cursor="pointer"
          _hover={{ width: "160px", transition: "all 0.3s" }}
          onDragStart={(event) => event.preventDefault()}
        >
          <Image
            src={
              router.pathname === "/drop"
                ? "https://i.ibb.co/xX2nN80/shop.png"
                : "https://i.ibb.co/56DqXD3/shop-green.png"
            }
            w="100%"
            h="100%"
          />
        </Box>
      </VStack>
    </Flex>
  );
};

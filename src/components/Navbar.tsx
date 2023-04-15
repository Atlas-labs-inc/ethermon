import React from "react";
import { VStack, Box, Flex, Image } from "@chakra-ui/react";
import { useRouter } from "next/router";

export const Navbar: React.FC = () => {
  const router = useRouter();

  const handleNavigation = (route: string) => {
    router.push(route);
  };
  const onClickSoundURL = "https://d6hckkykh246u.cloudfront.net/selec.mp3";
  const onHoverSoundURL = "https://d6hckkykh246u.cloudfront.net/chime.mp3";
  const onAttackSoundURL = "https://d6hckkykh246u.cloudfront.net/attack.mp3";

  const playOnClickSound = () => {
    const audio = new Audio(onClickSoundURL);
    audio.play();
  };

  const playOnHoverSound = () => {
    const audio = new Audio(onHoverSoundURL);
    audio.play();
  };

  return (
    <Flex alignSelf={"flex-start"}>
      <VStack spacing={0.1} align="left">
        <Box
          w="160px"
          h="80px"
          onClick={() => handleNavigation("/")}
          cursor="pointer"
          transition="all 0.2s"
          onMouseEnter={() => {
            playOnHoverSound();
          }}
          onDragStart={(event) => event.preventDefault()}
          _hover={{ width: "168px" }}
        >
          <Image
            src={
              router.pathname === "/"
                ? "https://d6hckkykh246u.cloudfront.net/home.png"
                : "https://d6hckkykh246u.cloudfront.net/home_green.png"
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
          onMouseEnter={() => {
            playOnHoverSound();
          }}
          transition="all 0.2s"
          _hover={{ width: "288px" }}
          onDragStart={(event) => event.preventDefault()}
        >
          <Image
            src={
              router.pathname === "/collection"
                ? "https://d6hckkykh246u.cloudfront.net/collection.png"
                : "https://d6hckkykh246u.cloudfront.net/collection_green.png"
            }
            w="100%"
            h="100%"
          />
        </Box>
        {/* <Box
          w="150px"
          h="80px"
          onClick={() => handleNavigation("/drop")}
          cursor="pointer"
          transition="all 0.2s"
          _hover={{ width: "158px" }}
          onDragStart={(event) => event.preventDefault()}
        >
          <Image
            src={
              router.pathname === "/drop"
                ? "https://d6hckkykh246u.cloudfront.net/shop.png"
                : "https://d6hckkykh246u.cloudfront.net/shop_green.png"
            }
            w="100%"
            h="100%"
          />
        </Box> */}
      </VStack>
    </Flex>
  );
};

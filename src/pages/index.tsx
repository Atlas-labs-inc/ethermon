import { Flex, Spacer, Text, Image, Box } from "@chakra-ui/react";
import { CheckCircleIcon, LinkIcon } from "@chakra-ui/icons";
import { Container } from "../components/Container";
import { Navbar } from "../components/Navbar";
import { ConnectWallet } from "../components/ConnectWallet";
import { Treasury } from "../components/Treasury";
import { Creature } from "../components/Creature";
import useStore from "../store";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Index = () => {
  const router = useRouter();
  const selectedCreature = useStore((state) => state.selectedCreature);
  const setSelectedCreature = useStore((state) => state.setSelectedCreature);
  const onClickSoundURL = "https://d6hckkykh246u.cloudfront.net/selec.mp3";
  const onHoverSoundURL = "https://d6hckkykh246u.cloudfront.net/chime.mp3";
  const onAttackSoundURL = "https://d6hckkykh246u.cloudfront.net/attack.mp3";
  const [src, setSrc] = useState("");

  useEffect(() => {
    console.log("selectedCreature", selectedCreature);
    if (selectedCreature) {
      setSrc(selectedCreature.image);
    }
  }, [selectedCreature]);

  const playOnClickSound = () => {
    const audio = new Audio(onClickSoundURL);
    audio.play();
  };

  const playOnHoverSound = () => {
    const audio = new Audio(onHoverSoundURL);
    audio.play();
  };
  const handleNavigation = (route: string) => {
    router.push(route);
  };
  return (
    <Container height="100vh">
      <Flex h="100%" p="2rem" w="100%">
        <Flex w="280px">
          <Navbar />
        </Flex>
        <Spacer />
        <Flex direction="column" align="center" h="100%" w="80%">
          <Treasury />

          <Spacer />
          <Creature height={650} imageURL={src} />
          {/* <Image mb='-130px' src={selectedCreature.image} objectFit="contain" height={'100%'} /> */}
          <Flex w="600px" borderRadius={"10px"} align="center" justify="center">
            <Box
              mt="10px"
              mb="-20px"
              w="340px"
              h="125px"
              onClick={() => handleNavigation("/collection")}
              onMouseEnter={() => {
                playOnHoverSound();
              }}
              cursor="pointer"
              transition="all 0.2s"
              _hover={{ width: "348px" }}
              onDragStart={(event) => event.preventDefault()}
            >
              <Image
                src="https://d6hckkykh246u.cloudfront.net/swap.png"
                w="100%"
                h="100%"
              />
            </Box>
            <Spacer />
            <Box
              mt="10px"
              mb="-20px"
              w="350px"
              h="125px"
              onClick={() => handleNavigation("/battle")}
              onMouseEnter={() => {
                playOnHoverSound();
              }}
              cursor="pointer"
              transition="all 0.2s"
              _hover={{ width: "358px" }}
              onDragStart={(event) => event.preventDefault()}
            >
              <Image
                src="https://d6hckkykh246u.cloudfront.net/BattleButton.png"
                w="100%"
                h="100%"
              />
            </Box>
          </Flex>
        </Flex>
        <Flex w="280px" align="flex-start" justify={"flex-end"}>
          <ConnectWallet />
        </Flex>
      </Flex>
    </Container>
  );
};

export default Index;

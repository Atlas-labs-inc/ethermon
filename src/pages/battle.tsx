import {
  Flex,
  Spacer,
  Text,
  Button,
  Image,
  Modal,
  Box,
  ModalOverlay,
  ModalContent,
  useDisclosure,
} from "@chakra-ui/react";
import { CheckCircleIcon, LinkIcon } from "@chakra-ui/icons";
import { Container } from "../components/Container";
import { Navbar } from "../components/Navbar";
import { Creature } from "../components/Creature";
import { use, useEffect, useState } from "react";
import useStore from "../store";
import Typist from "react-typist";
import { HealthAndManaBar } from "../components/HealthAndManaBar";
import { BattleDialog } from "../components/BattleDialog";
import { useRouter } from "next/router";

const Battle = () => {
  const isBattleOver = useStore((state) => state.isBattleOver);
  const setIsBattleOver = useStore((state) => state.setIsBattleOver);
  const didUserWin = useStore((state) => state.didUserWin);
  const currentBattle = useStore((state) => state.currentBattle);
  const selectedCreature = useStore((state) => state.selectedCreature);
  const setCurrentBattle = useStore((state) => state.setCurrentBattle);
  const [isPlayerAttacking, setIsPlayerAttacking] = useState(false);
  const [battleMsg, setBattleMsg] = useState("The battle is about to begin!");

  const router = useRouter();

  const handleNavigation = (route: string) => {
    router.push(route);
  };
  const WinModal = ({ isOpen, onClose }) => {
    return (
      <>
        {isOpen && (
          <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay
              bg="rgba(0, 0, 0, 0.8)"
              style={{ backdropFilter: "blur(10px)" }}
            />
            <ModalContent
              bg="transparent"
              boxShadow="none"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Flex
                direction="column"
                w="100%"
                borderRadius="14px"
                p="20px"
                alignItems="center"
              >
                <Image
                  w="800px"
                  src={
                    didUserWin
                      ? "https://d6hckkykh246u.cloudfront.net/win.png"
                      : "https://d6hckkykh246u.cloudfront.net/lose.png"
                  }
                />
                <Box
                  w="160px"
                  h="80px"
                  onClick={() => handleNavigation("/")}
                  cursor="pointer"
                  transition="all 0.2s"
                  _hover={{ width: "168px" }}
                  onDragStart={(event) => event.preventDefault()}
                >
                  <Image
                    src={"https://d6hckkykh246u.cloudfront.net/home_green.png"}
                    w="100%"
                    h="100%"
                  />
                </Box>
              </Flex>
            </ModalContent>
          </Modal>
        )}
      </>
    );
  };

  return (
    <Container height="100vh">
      <WinModal isOpen={isBattleOver} onClose={() => setIsBattleOver(false)} />
      <Flex
        h="100%"
        p="2rem"
        w="100%"
        direction="column"
        justify={"flex-end"}
        align="center"
      >
        <Spacer />

        <Flex w="60%" align={"flex-end"} justify="flex-end" py="1rem">
          <Flex direction="column">
            <HealthAndManaBar
              health={currentBattle.player.hp}
              mana={currentBattle.player.mana}
            />
            <Flex mt="0px">
              <Creature
                width={350}
                height={550}
                imageURL={selectedCreature.image}
              />
            </Flex>
          </Flex>
          <Spacer />
          <Flex direction="column">
            <HealthAndManaBar
              health={currentBattle.npc.hp}
              mana={currentBattle.npc.mana}
            />
            <Creature width={300} height={500} flipX />
          </Flex>
        </Flex>

        <BattleDialog />
      </Flex>
    </Container>
  );
};

export default Battle;

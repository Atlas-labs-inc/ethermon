import {
  Flex,
  Spacer,
  Text,
  Button,
  Modal,
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

const Battle = () => {
  const [isBattleOver, setIsBattleOver] = useState(false);
  const currentBattle = useStore((state) => state.currentBattle);
  const setCurrentBattle = useStore((state) => state.setCurrentBattle);
  const [isPlayerAttacking, setIsPlayerAttacking] = useState(false);
  const [battleMsg, setBattleMsg] = useState("The battle is about to begin!");
  const [showGameOverModal, setShowGameOverModal] = useState(false);

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
                bg="white"
                borderRadius="14px"
                p="20px"
                alignItems="center"
              >
                <Text fontSize="2xl" fontWeight="bold" mb="10px">
                  YOU WIN
                </Text>
                <Button onClick={onClose} colorScheme="blue">
                  Return Home
                </Button>
              </Flex>
            </ModalContent>
          </Modal>
        )}
      </>
    );
  };

  return (
    <Container height="100vh">
      <WinModal
        isOpen={showGameOverModal}
        onClose={() => setShowGameOverModal(false)}
      />
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
            <HealthAndManaBar health={200} mana={10} />
            <Flex mt="0px">
              <Creature width={350} height={550} />
            </Flex>
          </Flex>
          <Spacer />
          <Flex direction="column">
            <HealthAndManaBar health={200} mana={10} />
            <Creature width={300} height={500} flipX />
          </Flex>
        </Flex>

        <BattleDialog />
      </Flex>
    </Container>
  );
};

export default Battle;

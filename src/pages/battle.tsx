import { Flex, Spacer, Text } from "@chakra-ui/react";
import { CheckCircleIcon, LinkIcon } from "@chakra-ui/icons";
import { Container } from "../components/Container";
import { Navbar } from "../components/Navbar";
import { Creature } from "../components/Creature";
import { useState } from "react";
import useStore from "../store";
import Typist from "react-typist";
import { HealthAndManaBar } from "../components/HealthAndManaBar";

const Battle = () => {
  const [isBattleOver, setIsBattleOver] = useState(false);
  const currentMonster = useStore((state) => state.currentMonster);
  const currentBattle = useStore((state) => state.currentBattle);
  const setCurrentBattle = useStore((state) => state.setCurrentBattle);
  const [isPlayerAttacking, setIsPlayerAttacking] = useState(false);
  const [battleMsg, setBattleMsg] = useState("The battle is about to begin!");

  return (
    <Container height="100vh">
      <Flex h="100%" p="2rem" w="100%" direction="column" align="center">
        <Spacer />

        <Flex w="60%" py="1rem">
          <Flex direction="column">
            <HealthAndManaBar health={100} mana={10} />
            <Creature />
          </Flex>

          <Spacer />

          <Flex direction="column">
            <HealthAndManaBar health={100} mana={10} />
            <Creature width={300} height={500} flipX />
          </Flex>
        </Flex>

        <Flex
          bg="#fff"
          w="80%"
          border={"4px blue solid"}
          borderRadius="10px"
          py="16px"
          px="16px"
        >
          <Typist avgTypingDelay={20}>
            <Text fontSize="1.8rem">{battleMsg}</Text>
          </Typist>
        </Flex>
      </Flex>
    </Container>
  );
};

export default Battle;

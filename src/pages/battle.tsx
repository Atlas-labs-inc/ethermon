import { Flex, Spacer, Text } from "@chakra-ui/react";
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

  return (
    <Container height="100vh">
      <Flex h="100%" p="2rem" w="100%" direction="column" justify={'flex-end'} align="center">
        <Spacer />

        <Flex w="60%" align={'flex-end'} justify='flex-end' py="1rem">
          <Flex direction="column">
            <HealthAndManaBar health={200} mana={10} />
            <Flex mt="00px">
              <Creature width={350} height={550}  />
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

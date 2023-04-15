import { Flex } from "@chakra-ui/react";
import { CheckCircleIcon, LinkIcon } from "@chakra-ui/icons";
import { Container } from "../components/Container";
import { Navbar } from "../components/Navbar";
import { Creature } from "../components/Creature";
import { useState } from "react";
import useStore from "../store";

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
        <Flex>
          <Creature />
          <Creature width={300} height={500} flipX />
        </Flex>
      </Flex>
      <Flex
        bg="#fff"
        w="80%"
        border={"4px blue solid"}
        borderRadius="10px"
        py="16px"
      >
        {battleMsg}
      </Flex>
    </Container>
  );
};

export default Battle;

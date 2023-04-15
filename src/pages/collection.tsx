import { Flex, Spacer } from "@chakra-ui/react";
import { CheckCircleIcon, LinkIcon } from "@chakra-ui/icons";
import { Container } from "../components/Container";
import { Navbar } from "../components/Navbar";
import { ConnectWallet } from "../components/ConnectWallet";
import { Treasury } from "../components/Treasury";
import { Creature } from "../components/Creature";
import { BattleButton } from "../components/BattleButton";

const Collection = () => (
  <Container height="100vh">
    <Flex h="100%" p="2rem" w="100%">
      <Flex position="absolute">
        <Navbar />
      </Flex>
      <Spacer />
      <Flex direction="column" align="center" h="100%" w="80%">
        <Treasury />
        <Spacer />
        <Creature />
        <BattleButton />
      </Flex>
      <Flex h="100%" align="flex-start">
        <ConnectWallet />
      </Flex>
    </Flex>
  </Container>
);

export default Collection;

import { Flex, Spacer, Image, Text, Box } from "@chakra-ui/react";
import { CheckCircleIcon, LinkIcon } from "@chakra-ui/icons";
import { Container } from "../components/Container";
import { Navbar } from "../components/Navbar";
import { ConnectWallet } from "../components/ConnectWallet";
import { Treasury } from "../components/Treasury";
import { Creature } from "../components/Creature";

const Drop = () => (
  <Container height="100vh">
    <Flex h="100%" p="2rem" w="100%">
      <Flex w="280px">
        <Navbar />
      </Flex>
      <Spacer />
      <Flex direction="column" align="center" h="100%" w="80%">
          <Image
            w="700px"
            mt="-10px"
            objectFit="contain"
            src="https://d6hckkykh246u.cloudfront.net/DAILY.png"
          />        <Spacer />
        <Creature />
    <Box
      mt="10px"
      mb="-20px"
      w="340px"
      h="140px"
      // onClick={() => handleNavigation("/battle")}
      cursor="pointer"
      transition="all 0.2s"
      _hover={{ width: "348px" }}
      onDragStart={(event) => event.preventDefault()}
    >
      <Image src="https://d6hckkykh246u.cloudfront.net/BattleButton.png" w="100%" h="100%" />
    </Box>      
    </Flex>
      <Flex w="280px" align="flex-start" justify={"flex-start"}>
        <ConnectWallet />
      </Flex>
    </Flex>
  </Container>
);

export default Drop;

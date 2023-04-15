import { Flex } from "@chakra-ui/react";
import { CheckCircleIcon, LinkIcon } from "@chakra-ui/icons";
import { Container } from "../components/Container";
import { Navbar } from "../components/Navbar";

const Drop = () => (
  <Container height="100vh">
    <Flex>
      <Navbar />
    </Flex>
  </Container>
);

export default Drop;

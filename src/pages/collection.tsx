import { Flex, Spacer, Image, Box, Grid, GridItem } from "@chakra-ui/react";
import { CheckCircleIcon, LinkIcon } from "@chakra-ui/icons";
import { Container } from "../components/Container";
import { Navbar } from "../components/Navbar";
import { ConnectWallet } from "../components/ConnectWallet";
import { Treasury } from "../components/Treasury";
import { Creature } from "../components/Creature";
import { BattleButton } from "../components/BattleButton";
import useStore from "../store";

const Collection = () => {
  const collection = useStore((state) => state.collection);
  const monsterCurrentlyViewing = useStore(
    (state) => state.monsterCurrentlyViewing
  );
  const setMonsterCurrentlyViewing = useStore(
    (state) => state.setMonsterCurrentlyViewing
  );

  // You should get the average color using a library or a custom function
  // Here's a placeholder function
  const getAverageColor = (imageSrc) => {
    // Implement your logic to get the average color of an image
    return "#888";
  };

  return (
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
            src="https://i.ibb.co/3Yt2K1h/MY-COLLECTION.png"
          />
          {monsterCurrentlyViewing ? (
            <Grid mt="15px" templateColumns="repeat(3, 1fr)" gap={4}>
              {collection.map((item) => (
                <GridItem
                  bg="#eff"
                  key={item.id}
                  borderWidth={10}
                  borderColor={getAverageColor(item.image)}
                  boxShadow="0px 20px 40px rgba(0, 0, 0, 1)"
                >
                  <Image src={item.image} objectFit="contain" boxSize="240px" />
                </GridItem>
              ))}
            </Grid>
          ) : null}
        </Flex>
        <Flex w="280px" align="flex-start" justify={"flex-end"}>
          <ConnectWallet />
        </Flex>
      </Flex>
    </Container>
  );
};

export default Collection;

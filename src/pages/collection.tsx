import {
  Flex,
  Spacer,
  Image,
  Box,
  Grid,
  Text,
  GridItem,
  useStyleConfig,
} from "@chakra-ui/react";
import { CheckCircleIcon, LinkIcon } from "@chakra-ui/icons";
import { Container } from "../components/Container";
import { Navbar } from "../components/Navbar";
import { ConnectWallet } from "../components/ConnectWallet";
import { Treasury } from "../components/Treasury";
import { Creature } from "../components/Creature";
import { BattleButton } from "../components/BattleButton";
import useStore from "../store";
import { useEffect } from "react";
import { useRouter } from "next/router";

const Collection = () => {
  useEffect(() => {
    setMonsterCurrentlyViewing(null);
  }, []);
  const router = useRouter();

  const handleNavigation = (route: string) => {
    router.push(route);
  };
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
          {!monsterCurrentlyViewing ? (
            <Grid mt="15px" templateColumns="repeat(3, 1fr)" gap={4}>
              {collection.map((item) => (
                <GridItem
                  onDragStart={(event) => event.preventDefault()}
                  transition={"all 0.2s ease-in-out"}
                  _hover={{
                    transform: "scale(1.05)",
                    zIndex: 1,
                  }}
                  onClick={() => setMonsterCurrentlyViewing(item)}
                  bg="#eee"
                  key={item.id}
                  borderWidth={10}
                  borderColor={getAverageColor(item.image)}
                  boxShadow="0px 0px 30px rgba(0, 0, 0, 1)"
                >
                  <Image src={item.image} objectFit="contain" boxSize="240px" />
                </GridItem>
              ))}
            </Grid>
          ) : (
            <Flex direction="column" align={"center"} mt="10px">
              <Flex mt="10px">
                <Flex
                  borderWidth={20}
                  borderColor={getAverageColor(monsterCurrentlyViewing.image)}
                  bg="#eee"
                  boxShadow="0px 30px 30px rgba(0, 0, 0, 1)"
                >
                  <Image
                    src={monsterCurrentlyViewing.image}
                    w="400px"
                    h="400px"
                    onDragStart={(event) => event.preventDefault()}
                    transition={"all 0.2s ease-in-out"}
                  />
                </Flex>
                <Flex direction="column"  w="400px">
                  <Flex w='100%' justify={'center'}>
                  <Box
                w="120px"
                h="40px"
                onClick={() => setMonsterCurrentlyViewing(null)}
                cursor="pointer"
                transition="all 0.2s"
                _hover={{ width: "160px" }}
                onDragStart={(event) => event.preventDefault()}
              >
                <Image
                  src="https://i.ibb.co/0VsjwVp/NAME.png"
                  w="100%"
                  h="100%"
                />
              </Box>
                  <Text textColor={"white"} fontSize={"20px"} align="center">
                    {monsterCurrentlyViewing.name}
                  </Text>
                  </Flex>
                </Flex>
              </Flex>
              <Box
                mt="60px"
                mb="-20px"
                w="150px"
                h="80px"
                onClick={() => setMonsterCurrentlyViewing(null)}
                cursor="pointer"
                transition="all 0.2s"
                _hover={{ width: "160px" }}
                onDragStart={(event) => event.preventDefault()}
              >
                <Image
                  src="https://i.ibb.co/r4wdk64/Back.png"
                  w="100%"
                  h="100%"
                />
              </Box>
            </Flex>
          )}
        </Flex>
        <Flex w="280px" align="flex-start" justify={"flex-end"}>
          <ConnectWallet />
        </Flex>
      </Flex>
    </Container>
  );
};

export default Collection;

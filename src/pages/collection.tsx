import {
  Flex,
  Spacer,
  Image,
  Box,
  Grid,
  Text,
  useColorModeValue,
  GridItem,
  useStyleConfig,
} from "@chakra-ui/react";
import { CheckCircleIcon, LinkIcon } from "@chakra-ui/icons";
import { Container } from "../components/Container";
import { Navbar } from "../components/Navbar";
import { ConnectWallet } from "../components/ConnectWallet";
import { Treasury } from "../components/Treasury";
import { Creature } from "../components/Creature";
import useStore from "../store";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { updateSvgSize } from "../util/randomUtils";

const Collection = () => {
  const setSelectedCreature = useStore((state) => state.setSelectedCreature);

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
  // Here's a placeholder function
  const getAverageColor = (imageSrc) => {
    // Implement your logic to get the average color of an image
    return "#cca92c";
  };

  const getBorderColorByType = (type) => {
    switch (type) {
      case "Fire":
        return useColorModeValue("red.500", "red.400");
      case "Water":
        return useColorModeValue("blue.500", "blue.400");
      case "Grass":
        return useColorModeValue("green.500", "green.400");
      default:
        return "gray.500";
    }
  };

  return (
    <Container height="100vh">
      <Flex h="100%" p="2rem" w="100%">
        <Flex w="280px">
          <Navbar />
        </Flex>
        <Spacer />
        <Flex
          direction="column"
          align="center"
          overflow={"scroll"}
          sx={{
            scrollbarWidth: "none", // For Firefox
            msOverflowStyle: "none", // For Internet Explorer and Edge
            "&::-webkit-scrollbar": {
              display: "none", // For Chrome, Safari, and Opera
            },
          }}
          h="100%"
          w="80%"
        >
          <Image
            w="700px"
            mt="-10px"
            objectFit="contain"
            src="https://d6hckkykh246u.cloudfront.net/COLLECTION.png"
          />
          {!monsterCurrentlyViewing ? (
            <Grid mt="15px" gap={4}>
              {collection.map((item) => (
                <div
                  onClick={() => setMonsterCurrentlyViewing(item)}
                  dangerouslySetInnerHTML={{
                    __html: updateSvgSize(item.image, 250, 250),
                  }}
                />
                // <GridItem
                //   onDragStart={(event) => event.preventDefault()}
                //   transition={"all 0.2s ease-in-out"}
                //   _hover={{
                //     transform: "scale(1.05)",
                //     zIndex: 1,
                //   }}
                //   onClick={() => setMonsterCurrentlyViewing(item)}
                //   bg="rgba(0, 0, 0, 0.8)"
                //   key={item.id}
                //   borderWidth={10}
                //   borderColor={getBorderColorByType(item.type)}
                //   boxShadow="0px 0px 30px rgba(0, 0, 0, 1)"
                // >
                //   <Box
                //     overflow="hidden" // To contain overflowing content
                //     display="flex" // To center the SVG content
                //     alignItems="center" // To center the SVG content vertically
                //     justifyContent="center" // To center the SVG content horizontally
                //     dangerouslySetInnerHTML={{
                //       __html: updateSvgSize(item.image, 20, 20),
                //     }}
                //   />
                // </GridItem>
              ))}
            </Grid>
          ) : (
            <Flex direction="column" align={"center"} mt="10px">
              <Flex mt="10px" boxShadow="0px 30px 30px rgba(0, 0, 0, 0.8)">
                <Flex
                  borderWidth={20}
                  borderColor={getBorderColorByType(
                    monsterCurrentlyViewing.type
                  )}
                  bg="rgba(0, 0, 0, 0.8)"
                >
                  {
                    <div
                      dangerouslySetInnerHTML={{
                        __html: updateSvgSize(
                          monsterCurrentlyViewing.image,
                          450,
                          450
                        ),
                      }}
                    />
                  }
                </Flex>
                <Flex
                  direction="column"
                  justify="center"
                  bg="rgba(0, 0, 0, 0.5)"
                  w="400px"
                >
                  <Flex
                    w="100%"
                    align={"center"}
                    direction="column"
                    justify={"center"}
                  >
                    <Box
                      w="120px"
                      h="40px"
                      cursor="pointer"
                      transition="all 0.2s"
                      _hover={{ width: "130px" }}
                      onDragStart={(event) => event.preventDefault()}
                    >
                      <Image
                        src="https://d6hckkykh246u.cloudfront.net/NAME.png"
                        w="100%"
                        h="100%"
                      />
                    </Box>
                    <Text
                      textColor={"white"}
                      fontWeight="bold"
                      fontSize={"30px"}
                      align="center"
                    >
                      {monsterCurrentlyViewing.name}
                    </Text>
                    <Box
                      mt="10px"
                      w="120px"
                      h="40px"
                      cursor="pointer"
                      transition="all 0.2s"
                      _hover={{ width: "130px" }}
                      onDragStart={(event) => event.preventDefault()}
                    >
                      <Image
                        src="https://d6hckkykh246u.cloudfront.net/TYPER.png"
                        w="100%"
                        h="100%"
                      />
                    </Box>
                    <Text
                      textColor={"white"}
                      fontWeight="bold"
                      fontSize={"30px"}
                      align="center"
                    >
                      {monsterCurrentlyViewing.type}
                    </Text>
                    <Box
                      mt="10px"
                      w="180px"
                      h="40px"
                      cursor="pointer"
                      transition="all 0.2s"
                      _hover={{ width: "190px" }}
                      onDragStart={(event) => event.preventDefault()}
                    >
                      <Image
                        src="https://d6hckkykh246u.cloudfront.net/ABILITIES.png"
                        w="100%"
                        h="100%"
                      />
                    </Box>
                    <Text
                      textColor={"white"}
                      fontWeight="bold"
                      fontSize={"30px"}
                      align="center"
                    >
                      {monsterCurrentlyViewing.moveList.map((move) => (
                        <Text>{move.name.toUpperCase()}</Text>
                      ))}
                    </Text>
                  </Flex>
                </Flex>
              </Flex>
              <Flex w="300px">
                <Box
                  mt="60px"
                  mb="-20px"
                  w="150px"
                  h="80px"
                  onClick={() => setMonsterCurrentlyViewing(null)}
                  cursor="pointer"
                  transition="all 0.2s"
                  _hover={{ width: "158px" }}
                  onDragStart={(event) => event.preventDefault()}
                >
                  <Image
                    src="https://d6hckkykh246u.cloudfront.net/Back.png"
                    w="100%"
                    h="100%"
                  />
                </Box>
                <Box
                  mt="60px"
                  mb="-20px"
                  w="180px"
                  h="80px"
                  onClick={() => {
                    setSelectedCreature(monsterCurrentlyViewing),
                      handleNavigation("/");
                  }}
                  cursor="pointer"
                  transition="all 0.2s"
                  _hover={{ width: "188px" }}
                  onDragStart={(event) => event.preventDefault()}
                >
                  <Image
                    src="https://d6hckkykh246u.cloudfront.net/Select.png"
                    w="100%"
                    h="100%"
                  />
                </Box>
              </Flex>
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

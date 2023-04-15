import { Flex, FlexProps } from "@chakra-ui/react";
import useStore from "../store";

export const Container = (props: FlexProps) => {

  const currentBattle = useStore((state) => state.currentBattle);
  const bgImage = currentBattle ? "https://d6hckkykh246u.cloudfront.net/battle.png" : "https://d6hckkykh246u.cloudfront.net/background.png";

  return (
  <Flex
    direction="column"
    alignItems="center"
    justifyContent="flex-start"
    w="100vw" // Set the width to cover the entire page
    h="100vh" // Set the height to cover the entire page
    bgImage={
      "https://atlaslabs.s3.us-west-1.amazonaws.com/ethermon/Rectangle+1.png"
    } // Set the background image using the passed url
    bgSize="cover" // Set the background size to cover the entire component
    bgPosition="center" // Center the background image
    color="black"
    transition="all 0.15s ease-out"
    {...props}
  />
  );


};

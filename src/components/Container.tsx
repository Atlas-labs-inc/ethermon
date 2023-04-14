import { Flex, FlexProps } from "@chakra-ui/react";

export const Container = (props: FlexProps) => (
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

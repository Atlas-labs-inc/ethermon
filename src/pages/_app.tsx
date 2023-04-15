import { ChakraProvider } from "@chakra-ui/react";
import Head from "next/head";
import theme from "../theme";
import { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Head>
        <link
          rel="preload"
          as="image"
          href="https://i.ibb.co/LvWqz8h/Button.png"
        />
        <link
          rel="preload"
          as="image"
          href="https://i.ibb.co/g9LsHBH/Connected.png"
        />
        <link
          rel="preload"
          as="image"
          href="https://i.ibb.co/C081Q3N/Connect.png"
        />
        <link
          rel="preload"
          as="image"
          href="https://i.ibb.co/HYgWhkR/home.png"
        />
        <link
          rel="preload"
          as="image"
          href="https://i.ibb.co/5K9TTx8/home-green.png"
        />
        <link
          rel="preload"
          as="image"
          href="https://i.ibb.co/42sF6Hw/collection.png"
        />
        <link
          rel="preload"
          as="image"
          href="https://i.ibb.co/cy7btsK/collection-green.png"
        />

        <link
          rel="preload"
          as="image"
          href="https://i.ibb.co/xX2nN80/shop.png"
        />

        <link
          rel="preload"
          as="image"
          href="https://i.ibb.co/56DqXD3/shop-green.png"
        />
      </Head>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;

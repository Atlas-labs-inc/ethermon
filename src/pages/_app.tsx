import { ChakraProvider } from "@chakra-ui/react";
import Head from "next/head";
import theme from "../theme";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";

const AudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;

        // Set audio source based on the current route
        switch (url) {
          case "/":
            audioRef.current.src =
              "https://d6hckkykh246u.cloudfront.net/tuna.mp3";
            break;
          case "/page2":
            audioRef.current.src =
              "https://d6hckkykh246u.cloudfront.net/smash.mp3";
            break;
          default:
            audioRef.current.src =
              "https://d6hckkykh246u.cloudfront.net/tuna.mp3";
            break;
        }

        audioRef.current.play();
      }
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <audio ref={audioRef} loop>
      <source src="/path/to/default-music.mp3" type="audio/mpeg" />
    </audio>
  );
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Head>
        <title>EthMonsters</title>
      </Head>
      <AudioPlayer />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;

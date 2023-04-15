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
        const currentAudioSource = audioRef.current.src;
        let newAudioSource = currentAudioSource;

        // Set audio source based on the current route
        switch (url) {
          case "/battle":
            newAudioSource = "https://d6hckkykh246u.cloudfront.net/fight.mp3";
            break;
          default:
            newAudioSource = "https://d6hckkykh246u.cloudfront.net/smash.mp3";
            break;
        }

        // Only change and restart the audio if the source is different
        if (newAudioSource !== currentAudioSource) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
          audioRef.current.src = newAudioSource;
          audioRef.current.load(); // Add this line
        }
      }
    };

    handleRouteChange(router.pathname);

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events, router.pathname]);

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  return (
    <audio ref={audioRef} loop onLoadedMetadata={handleLoadedMetadata}>
      <source
        src="https://d6hckkykh246u.cloudfront.net/smash.mp3"
        type="audio/mpeg"
      />
    </audio>
  );
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <AudioPlayer />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;

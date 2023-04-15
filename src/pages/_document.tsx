import NextDocument, { Html, Head, Main, NextScript } from "next/document";
import { ColorModeScript } from "@chakra-ui/react";

export default class Document extends NextDocument {
  render() {
    return (
      <Html>
        <Head>
          <title>EthMonsters</title>
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="https://d6hckkykh246u.cloudfront.net/favicon.ico"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="https://d6hckkykh246u.cloudfront.net/favicon.ico"
          />
          <link rel="manifest" href="/site.webmanifest" />
        </Head>
        <body>
          {/* Make Color mode to persists when you refresh the page. */}
          <ColorModeScript />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

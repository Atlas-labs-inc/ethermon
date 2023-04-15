// all the chains we support
interface NetworkMapType {
  [networkId: number]: {
    name: string;
  };
}

export const NetworkMap: NetworkMapType = {
  1: {
    name: "Ethereum Mainnet",
  },
  5: {
    name: "Ethereum Goerli Testnet",
  },
  137: {
    name: "Polygon Mainnet",
  },
  80001: {
    name: "Polygon Mumbai Testnet",
  },
  42220: {
    name: "Celo Mainnet",
  },
  44787: {
    name: "Celo Alfajores Testnet",
  },
  100: {
    name: "Gnosis Mainnet",
  },
  1101: {
    name: "Polygon zkEVM",
  },
  1442: {
    name: "Polygon zkEVM Testnet",
  },
  534353: {
    name: "Scroll Testnet",
  },
};

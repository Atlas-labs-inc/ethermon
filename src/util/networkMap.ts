// all the chains we support
interface NetworkMapType {
  [networkId: number]: {
    name: string;
    contractAddress?: string;
    rpc?: string;
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
    contractAddress: "0xBF70ffff8D0F6491eA7602877F90adAc4958F0AE",
    rpc: "https://prettiest-dawn-frog.matic-testnet.discover.quiknode.pro/0aad3e13d4ba11791f9e4cc5d57416ae051ea3ae/",
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

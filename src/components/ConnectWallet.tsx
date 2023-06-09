import { useEffect, useState, useRef } from "react";
import useStore from "../store";
import {
  Flex,
  Text,
  Button,
  Menu,
  MenuItem,
  MenuButton,
  Box,
  Image,
  MenuList,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { ethers } from "ethers";
import {
  decimalToHexString,
  formatHash,
  base64Decode,
} from "../util/randomUtils";
import detectEthereumProvider from "@metamask/detect-provider";
import { ChevronDownIcon } from "@chakra-ui/icons";
import colors from "../util/colors";
import { NetworkMap } from "../util/networkMap";
import { useToast } from "@chakra-ui/react";
import { SiweMessage } from "siwe";
import cookies from "../util/cookies";
import { abi } from "../abi";

export const ConnectWallet = () => {
  const [connected, setConnected] = useState(false);
  const setMetamaskProvider = useStore((state) => state.setMetamaskProvider);
  const metamaskProvider = useStore((state) => state.metamaskProvider);
  const [metamaskInstalled, setMetamaskInstalled] = useState(false);
  const [balance, setBalance] = useState("0");
  const [chainId, setChainId] = useState(0);
  const [account, setAccount] = useState("");
  const accountRef = useRef("");
  const [showModal, setShowModal] = useState(false);
  const toast = useToast();
  const setCollection = useStore((state) => state.setCollection);
  const setSelectedCreature = useStore((state) => state.setSelectedCreature);

  useEffect(() => {
    const providerExists = detectEthereumProvider();
    if (providerExists && window.ethereum) {
      updateProvider();
      setMetamaskInstalled(true);
    } else {
      console.log("Please install MetaMask!");
    }
  }, []);

  useEffect(() => {
    const getAllData = async () => {
      console.log("chainId: ", chainId);
      console.log("account: ", account);
      const contract = new ethers.Contract(
        NetworkMap[chainId]?.contractAddress,
        abi,
        metamaskProvider
      );
      let owned = [];
      const numTokens = await contract.nextTokenId();
      for (let i = 1; i < numTokens; i++) {
        const owner = await contract.ownerOf(i);
        console.log("owner of", i, "is", owner);
        if (
          ethers.utils.getAddress(owner) === ethers.utils.getAddress(account)
        ) {
          owned.push(i);
        }
      }
      console.log("owned:", owned);

      const collectionPromises = owned.map(async (id) => {
        console.log("id:", id);
        const data = await contract.tokenURI(id);
        const decoded = JSON.parse(base64Decode(data));
        // console.log("decoded attribs", decoded.name);
        const moveList = decoded.attributes.map((move) => {
          return {
            name: move.value,
            type: move.trait_type,
            damage: move.damage,
            manaCost: move.manaCost,
            buffType: move.buffType,
            buffAmount: move.buffAmount,
            debuffType: move.debuffType,
            debuffAmount: move.debuffAmount,
            heal: move.heal,
          };
        });
        const obj = {
          id,
          name: decoded.name,
          type: decoded.monster_type,
          moveList,
          image: base64Decode(decoded.image, true),
        };
        return obj;
      });
      const collection = await Promise.all(collectionPromises);
      console.log("collection:", collection);
      setCollection(collection);
      console.log("collection[0]", collection[0]);
      setSelectedCreature(collection[0]);
    };

    if (chainId !== 0 && account !== "") {
      getAllData();
    }
  }, [chainId, account]);

  const updateProvider = () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    setMetamaskProvider(provider);
  };

  useEffect(() => {
    const load = async () => {
      if (metamaskProvider && (window.ethereum as any).selectedAddress) {
        await connectAccount((window.ethereum as any).selectedAddress);
      }
    };
    load();
  }, [metamaskProvider]);

  const createSiweMessage = (address, nonce) => {
    const domain = window.location.host;
    const origin = window.location.origin;
    const message = new SiweMessage({
      domain,
      address,
      statement: "Sign in to EthMonsters!",
      uri: origin,
      version: "1",
      chainId: 1,
      nonce,
    });
    return message.prepareMessage();
  };

  const signInWithEthereum = async () => {
    const signer = metamaskProvider.getSigner();
    const address = await signer.getAddress();
    const response = await fetch(
      "https://ethermon-backend-production.up.railway.app/sign-in?address=" +
        address
    );
    const message = createSiweMessage(
      address,
      JSON.parse(await response.text()).nonce
    );
    const signature = await signer.signMessage(message);
    console.log("sign in with ethereum signature", signature);
    const res = await fetch(
      `https://ethermon-backend-production.up.railway.app/sign-in`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message, signature, address }),
      }
    );
    // Prove this works
    const cookie = JSON.parse(await res.text());
    console.log("cookie shit", cookie);
    cookies.set("access_token", "Bearer " + cookie.access_token, { path: "/" });
  };

  const attemptConnect = async () => {
    if (!metamaskInstalled) {
      // add toast here
      console.log("Please install MetaMask!");
      return;
    }

    try {
      const accounts = await metamaskProvider.send("eth_requestAccounts", []);
      await connectAccount(accounts[0]);
      await signInWithEthereum();
    } catch (error) {
      console.log("Failed to connect:", error);
    }
  };

  const updateAccount = async (account: string) => {
    setAccount(account);
    accountRef.current = account;
    await updateBalance(account);
  };

  const updateBalance = async (account: string) => {
    const accountBalance = await metamaskProvider.getBalance(account);
    setBalance(ethers.utils.formatEther(accountBalance));
  };

  const connectAccount = async (account: string) => {
    await updateAccount(account);
    const id = await metamaskProvider.send("eth_chainId", []);
    console.log("chain id from connectAccount: ", id);
    setChainId(parseInt(id, 16));

    setConnected(true);

    (window.ethereum as any).on("accountsChanged", handleAccountChange);
    (window.ethereum as any).on("chainChanged", handleChainChange);
  };

  const handleAccountChange = async (accounts: any) => {
    if (accounts.length === 0) {
      setConnected(false);
    } else {
      const selectedAccount = accounts[0];
      await updateAccount(selectedAccount);
    }
  };

  const handleDisconnect = async () => {
    setConnected(false);
    setBalance("0");
    (window.ethereum as any).removeListener(
      "accountsChanged",
      handleAccountChange
    );
    (window.ethereum as any).removeListener("chainChanged", handleChainChange);
  };

  const handleChainChange = async (newChainId: any) => {
    console.log("newChainId: ", newChainId);
    const chainId = parseInt(newChainId, 16);
    setChainId(chainId);
    console.log("account: ", accountRef.current);
    // Update the provider with the new chainId
    // metamaskProvider.setChainId(chainId);
    // await updateProvider();
    // await updateBalance(accountRef.current);
  };

  const switchChain = async (chainId) => {
    try {
      console.log("switching");
      await metamaskProvider.send("wallet_switchEthereumChain", [{ chainId }]);
      console.log("switched");
    } catch (error) {
      console.error("Error switching chains:", error);
      if (error.code === 4902) {
        toast({
          title: "Error switching chains",
          description: "Please add the chain to MetaMask first.",
          status: "error",
          duration: 5000,
        });
      } else {
        toast({
          title: "Error switching chains",
          description: "Send us a message on discord.",
          status: "error",
          duration: 5000,
        });
      }
    }
  };

  if (connected) {
    return (
      <Flex align="center">
        <Box
          mt="10px"
          mb="-20px"
          w="280px"
          h="80px"
          onClick={() => setShowModal(true)}
          cursor="pointer"
          transition="all 0.2s"
          _hover={{ width: "288px" }}
          onDragStart={(event) => event.preventDefault()}
        >
          <Image
            src="https://d6hckkykh246u.cloudfront.net/Connected.png"
            w="100%"
            h="100%"
          />
          <Text
            position="relative"
            top="-6.75vh"
            align={"center"}
            textAlign="center"
            fontStyle="italic"
            fontSize="26px"
            color="white"
            fontWeight={"900"}
            textShadow="2px 2px 4px rgba(0, 0, 0, 0.4)" // Add this line for drop shadow
          >
            {formatHash(account)}
          </Text>
        </Box>
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Connected Wallet</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text mb="1rem">Address: {account}</Text>
              {/* <Text mb="1rem">Balance: {balance} ETH</Text> */}
              <Menu>
                <MenuButton
                  as={Button}
                  w="100%"
                  rightIcon={<ChevronDownIcon />}
                >
                  Network: {NetworkMap[chainId]?.name || `ChainId ${chainId}`}
                </MenuButton>
                <MenuList>
                  {Object.keys(NetworkMap).map((key) => {
                    const network = NetworkMap[key];
                    return (
                      <MenuItem
                        key={key}
                        onClick={() => switchChain(decimalToHexString(key))}
                      >
                        {network.name}
                      </MenuItem>
                    );
                  })}
                </MenuList>
              </Menu>
            </ModalBody>
            <ModalFooter>
              <Flex w="100%" justify="center">
                <Button w="100%" bg={"red"} onClick={handleDisconnect}>
                  Disconnect
                </Button>
              </Flex>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Flex>
    );
  } else {
    return (
      <Flex align="center" mr="1.5rem">
        <Box
          mt="10px"
          mb="-20px"
          w="300px"
          h="80px"
          onClick={attemptConnect}
          cursor="pointer"
          transition="all 0.2s"
          _hover={{ width: "308px" }}
          onDragStart={(event) => event.preventDefault()}
        >
          <Image
            src="https://d6hckkykh246u.cloudfront.net/Connect.png"
            w="100%"
            h="100%"
          />
        </Box>
      </Flex>
    );
  }
};

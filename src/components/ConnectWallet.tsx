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
import { decimalToHexString, formatHash } from "../util/randomUtils";
import detectEthereumProvider from "@metamask/detect-provider";
import { ChevronDownIcon } from "@chakra-ui/icons";
import colors from "../util/colors";
import { NetworkMap } from "../util/networkMap";
import { useToast } from "@chakra-ui/react";

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

  useEffect(() => {
    const providerExists = detectEthereumProvider();
    if (providerExists && window.ethereum) {
      updateProvider();
      setMetamaskInstalled(true);
    } else {
      console.log("Please install MetaMask!");
    }
  }, []);

  const updateProvider = () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    setMetamaskProvider(provider);
  };

  useEffect(() => {
    if (metamaskProvider && (window.ethereum as any).selectedAddress) {
      connectAccount((window.ethereum as any).selectedAddress);
    }
  }, [metamaskProvider]);

  const attemptConnect = async () => {
    if (!metamaskInstalled) {
      // add toast here
      console.log("Please install MetaMask!");
      return;
    }

    try {
      const accounts = await metamaskProvider.send("eth_requestAccounts", []);
      await connectAccount(accounts[0]);
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
      <Flex align="center" mr="1.5rem">
        <Box
          mt="10px"
          mb="-20px"
          w="280px"
          h="80px"
          onClick={() => setShowModal(true)}
          cursor="pointer"
          _hover={{ width: "290px", transition: "all 0.3s" }}
          onDragStart={(event) => event.preventDefault()}
        >
          <Image
            src="https://i.ibb.co/g9LsHBH/Connected.png"
            w="100%"
            h="100%"
          />
          <Text
            position="absolute"
            top="5.2vh"
            right="5.4vw"
            align={"center"}
            textAlign="center"
            fontFamily={"Inter"}
            fontStyle="italic"
            fontSize="28px"
            color="white"
            fontWeight={"900"}
            textShadow="2px 2px 4px rgba(0, 0, 0, 0.5)" // Add this line for drop shadow
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
          w="280px"
          h="80px"
          onClick={attemptConnect}
          cursor="pointer"
          _hover={{ width: "290px", transition: "all 0.3s" }}
          onDragStart={(event) => event.preventDefault()}
        >
          <Image src="https://i.ibb.co/C081Q3N/Connect.png" w="100%" h="100%" />
        </Box>
      </Flex>
    );
  }
};

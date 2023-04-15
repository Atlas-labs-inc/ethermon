import React, { useState, useEffect } from "react";
import { Box, Flex, Text, Image, Grid } from "@chakra-ui/react";
import Typist from "react-typist";
import useStore from "../store";
import cookies from "../util/cookies";

export const BattleDialog: React.FC = () => {
  const [isBattleOver, setIsBattleOver] = useState(false);
  const currentBattle = useStore((state) => state.currentBattle);
  const setCurrentBattle = useStore((state) => state.setCurrentBattle);
  const [showChooseMove, setShowChooseMove] = useState(false);
  const [battleMsg, setBattleMsg] = useState("The battle is about to begin...");
  const selectedCreature = useStore((state) => state.selectedCreature);

  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const ws = new WebSocket("ws://127.0.0.1:8000/play");
    // const ws = new WebSocket(
    //   "wss://ethermon-backend-production.up.railway.app/play"
    // );

    let firstMsg = false;
    ws.onopen = () => {
      console.log("WebSocket connection opened");
      const accessToken = cookies.get("access_token");
      const tokenId = "y69lmao";

      const message = {
        access_token: accessToken,
        token_id: tokenId,
      };

      ws.send(JSON.stringify(message));
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("WebSocket message received:", data);
      console.log("WebSocket message mana:", data?.player?.mana);
      if (data?.state === 0) {
        if (data?.player?.mana < 5) {
          console.log("Skipping...");
          ws.send(JSON.stringify({ move: "skip" }));
        } else if (!firstMsg) {
          firstMsg = true;
          console.log("fball...");
          ws.send(JSON.stringify({ move: "fireball" }));
        } else {
          console.log("headhutt...");
          ws.send(JSON.stringify({ move: "headbutt" }));
        }
      } else if (data?.state === 2) {
        console.log("Battle over!");
        ws.close();
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
    };

    setSocket(ws);

    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setBattleMsg("Choose your attack!");
    }, 2000);
  }, []);

  useEffect(() => {
    if (battleMsg === "Choose your attack!") {
      setTimeout(() => {
        setShowChooseMove(true);
      }, 2000);
    }
  }, [battleMsg]);

  const getMoveEffect = (move: string) => {
    return "It's super effective!";
  };

  const turnScript = (
    playerMove: string,
    monsterMove: string,
    isPlayerFirst: boolean
  ) => {
    const firstPlayer = isPlayerFirst ? "Player" : "Opponent";
    const secondPlayer = isPlayerFirst ? "Opponent" : "Player";
    const firstMove = isPlayerFirst ? playerMove : monsterMove;
    const secondMove = isPlayerFirst ? monsterMove : playerMove;
    const firstMoveEffect = getMoveEffect(firstMove);
    const secondMoveEffect = getMoveEffect(secondMove);
    const script = [
      `${firstPlayer} is attacking first.`,
      `${firstPlayer} used ${firstMove}!`,
    ];
    if (firstMoveEffect) {
      script.push(firstMoveEffect);
    }
    // if move kills, end battle
    // setIsBattleOver(true)

    script.push(`${secondPlayer} used ${secondMove}!`);
    if (secondMoveEffect) {
      script.push(secondMoveEffect);
    }
    return script;
  };

  return (
    <Flex
      borderRadius="10px"
      py="10px"
      px="10px"
      align={"center"}
      justify={"center"}
    >

      <Grid templateColumns="repeat(2, 1fr)">
        <Flex
          w="440px"
          h="200px"
          cursor="pointer"
          transition="all 0.2s"
          onDragStart={(event) => event.preventDefault()}
          alignItems="center"
          justifyContent="center"
          position="relative"
          overflow="hidden"
          m={0}
          p={0}
        >
                <Typist
        avgTypingDelay={20}
        align="center"
        position="absolute"
        zIndex="1"
        key={battleMsg}
      >
        <Text
                        right='60px'
      left='130px'
          position="absolute"
          color="white"
          fontSize="24px"
          fontWeight="bold"
          zIndex={1}
        >
          {battleMsg}
        </Text>
      </Typist>
          <Image
            src="https://d6hckkykh246u.cloudfront.net/chat.png"
            w="100%"
            h="100%"
            position="absolute"
            top={0}
            left={0}
          />
        </Flex>
        <Grid
          templateColumns="repeat(2, 1fr)"
          templateRows="repeat(2, 1fr)"
          gap={0}
        >
          {selectedCreature.moveList.map((move) => (
            <Flex
              w="220px"
              h="100px"
              cursor="pointer"
              transition="all 0.2s"
              onDragStart={(event) => event.preventDefault()}
              alignItems="center"
              justifyContent="center"
              position="relative"
              overflow="hidden"
              m={0}
              p={0}
            >
              <Text
                mb="18px"
                color="white"
                fontSize="24px"
                fontWeight="bold"
                zIndex={1}
              >
                {move}
              </Text>
              <Image
                src="https://d6hckkykh246u.cloudfront.net/GreenBlank.png"
                w="100%"
                h="100%"
                position="absolute"
                top={0}
                left={0}
              />
            </Flex>
          ))}
        </Grid>
      </Grid>
    </Flex>
  );
};

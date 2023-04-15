import React, { useState, useEffect } from "react";
import { Flex, Text } from "@chakra-ui/react";
import Typist from "react-typist";
import useStore from "../store";
import cookies from "../util/cookies";

export const BattleDialog: React.FC = () => {
  const [isBattleOver, setIsBattleOver] = useState(false);
  const currentBattle = useStore((state) => state.currentBattle);
  const setCurrentBattle = useStore((state) => state.setCurrentBattle);
  const [showChooseMove, setShowChooseMove] = useState(false);
  const [battleMsg, setBattleMsg] = useState("The battle is about to begin...");

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
      if (!firstMsg) {
        firstMsg = true;
        ws.send(JSON.stringify({ move: "fireball" }));
      } else {
        ws.send(JSON.stringify({ move: "headbutt" }));
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
      bg="rgba(0,0,0,0.5)"
      w="70%"
      // border={"4px blue solid"}
      borderRadius="10px"
      py="16px"
      px="16px"
    >
      <Typist avgTypingDelay={20} key={battleMsg}>
        <Text fontSize="1.8rem">{battleMsg}</Text>
      </Typist>
    </Flex>
  );
};

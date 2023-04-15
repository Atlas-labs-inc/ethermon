import React, { useState, useEffect } from "react";
import { Flex, Text } from "@chakra-ui/react";
import Typist from "react-typist";
import useStore from "../store";

export const BattleDialog: React.FC = () => {
  const [isBattleOver, setIsBattleOver] = useState(false);
  const currentMonster = useStore((state) => state.currentMonster);
  const currentBattle = useStore((state) => state.currentBattle);
  const setCurrentBattle = useStore((state) => state.setCurrentBattle);
  const [showChooseMove, setShowChooseMove] = useState(false);
  const [battleMsg, setBattleMsg] = useState("The battle is about to begin...");

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
      bg="#fff"
      w="80%"
      border={"4px blue solid"}
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

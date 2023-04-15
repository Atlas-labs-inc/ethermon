import React, { useState, useEffect } from "react";
import { Box, Flex, Text, Image, Grid } from "@chakra-ui/react";
import Typist from "react-typist";
import useStore from "../store";
import cookies from "../util/cookies";

export const BattleDialog: React.FC = () => {
  const isBattleOver = useStore((state) => state.isBattleOver);
  const setIsBattleOver = useStore((state) => state.setIsBattleOver);
  const setDidUserWin = useStore((state) => state.setDidUserWin);
  const currentBattle = useStore((state) => state.currentBattle);
  const setCurrentBattle = useStore((state) => state.setCurrentBattle);
  const [choosingMove, setChoosingMove] = useState(false);
  const [battleMsg, setBattleMsg] = useState("The battle is about to begin...");
  const [prevBattleMsg, setPrevBattleMsg] = useState("");
  const selectedCreature = useStore((state) => state.selectedCreature);
  const [currentRound, setCurrentRound] = useState(0);
  const [socket, setSocket] = useState(null);
  const [currentlyHovered, setCurrentlyHovered] = useState(null);
  const [roundUpdated, setRoundUpdated] = useState(false);
  const [receivedData, setReceivedData] = useState(null);

  useEffect(() => {
    // const ws = new WebSocket("ws://127.0.0.1:8000/play");
    const ws = new WebSocket(
      "wss://ethermon-backend-production.up.railway.app/play"
    );

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
      setReceivedData(data);

      if (data?.state === 0) {
        setRoundUpdated(true);
        if (data.state_transitions.length === 0) {
          console.log("no state transitions, running first time setup");
          setTimeout(() => {
            setBattleMsg("Select your attack!");
            setChoosingMove(true);
            setCurrentRound((prevRound) => prevRound + 1);
          }, 1000);
        }
      } else if (data?.state === 2) {
        if (data.winner === "npc") {
          setBattleMsg("You Lost!");
          setDidUserWin(false);
        } else {
          setBattleMsg("You Won!");
          setDidUserWin(true);
        }
        setIsBattleOver(true);
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
    const processRound = async () => {
      if (roundUpdated && receivedData.state_transitions.length >= 2) {
        console.log("received data", receivedData.state_transitions);
        console.log("current round", currentRound);
        const isPlayerFirst =
          receivedData.state_transitions[currentRound - 1].player === "player";
        const playerMove = isPlayerFirst
          ? receivedData.state_transitions[currentRound - 1].move
          : receivedData.state_transitions[currentRound].move;
        const monsterMove = isPlayerFirst
          ? receivedData.state_transitions[currentRound].move
          : receivedData.state_transitions[currentRound - 1].move;
        await turnScript(playerMove, monsterMove, isPlayerFirst);
        setChoosingMove(true);
        setBattleMsg("Select your attack!");
        setCurrentRound((prevRound) => prevRound + 1);
        setCurrentBattle({
          npc: {
            hp: Math.floor(receivedData.npc.hp),
            mana: receivedData.npc.mana,
            attack: receivedData.npc.attack,
            defense: receivedData.npc.defense,
          },
          player: {
            hp: Math.floor(receivedData.player.hp),
            mana: receivedData.player.mana,
            attack: receivedData.player.attack,
            defense: receivedData.player.defense,
          },
        });
      }
      setRoundUpdated(false);
    };

    processRound();
  }, [roundUpdated]);

  const getMoveEffect = (move: string) => {
    return "It's super effective!";
  };

  const turnScript = async (
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
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const processScript = async () => {
      for (const message of script) {
        // console.log("setting");
        setBattleMsg(message);
        await delay(2000);
      }
    };

    return new Promise(async (resolve) => {
      await processScript();
      resolve(script);
    });
  };

  const selectMove = (move: string) => {
    console.log(move);
    socket.send(JSON.stringify({ move }));
  };

  return (
    <Flex
      borderRadius="24px"
      bg="rgba(0,0,0,0.4)"
      border="4px"
      borderColor={"#555"}
      p="12px"
      align={"center"}
      justify={"center"}
    >
      <Grid templateColumns="repeat(2, 1fr)">
        <Flex
          w="540px"
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
            ml="200px"
            align="center"
            position="absolute"
            zIndex="1"
            key={battleMsg}
          >
            <Text
              top="25px"
              left="37px"
              fontStyle={"italic"}
              position="absolute"
              color="white"
              fontSize="28px"
              fontWeight="bold"
              zIndex={1}
            >
              {battleMsg}
            </Text>
          </Typist>
          <Image
            src="https://d6hckkykh246u.cloudfront.net/Black.png"
            opacity={0.7}
            w="100%"
            h="100%"
            position="absolute"
            top={0}
            left={0}
          />
        </Flex>
        <Grid
          templateColumns="repeat(2, 0fr)"
          templateRows="repeat(2, 0fr)"
          gap={0}
        >
          {selectedCreature.moveList.map((move) => {
            const [isHovered, setIsHovered] = useState(false);

            return (
              <Flex
                key={move.name}
                w="270px"
                h="100px"
                cursor="pointer"
                transition="all 0.2s"
                onDragStart={(event) => event.preventDefault()}
                onClick={() => {
                  if (choosingMove) {
                    selectMove(move.name);
                    setChoosingMove(false);
                  }
                }}
                onMouseEnter={() => {
                  if (choosingMove) {
                    setIsHovered(true);
                    setPrevBattleMsg(battleMsg);
                    setBattleMsg(move.name);
                  }
                }}
                onMouseLeave={() => {
                  if (choosingMove) {
                    setIsHovered(false);
                    setBattleMsg(prevBattleMsg);
                  }
                }}
                alignItems="center"
                justifyContent="center"
                position="relative"
                overflow="hidden"
                m={0}
                p={0}
              >
                <Text
                  mb="15px"
                  color="#eee"
                  fontSize="28px"
                  fontWeight="800"
                  userSelect={"none"}
                  zIndex={1}
                >
                  {move.name}
                </Text>
                <Image
                  opacity={choosingMove ? 1 : 0.5}
                  src={"https://d6hckkykh246u.cloudfront.net/GreenButton.png"}
                  w="100%"
                  h="100%"
                  position="absolute"
                  top={0}
                  left={0}
                />
                <Image
                  src={"https://d6hckkykh246u.cloudfront.net/Gold.png"}
                  opacity={isHovered ? 100 : 0}
                  w="100%"
                  h="100%"
                  position="absolute"
                  top={0}
                  left={0}
                />
              </Flex>
            );
          })}
        </Grid>
      </Grid>
    </Flex>
  );
};

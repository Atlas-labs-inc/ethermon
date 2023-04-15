import React from "react";
import { SillyLittleButton } from "./SillyLittleButton";
import { useRouter } from "next/router";

export const BattleButton: React.FC = () => {
  const router = useRouter();

  const handleNavigation = (route: string) => {
    router.push(route);
  };

  return (
    <SillyLittleButton
      w="300px"
      h="70px"
      onClick={() => handleNavigation("/battle")}
    >
      BATTLE
    </SillyLittleButton>
  );
};

import React from "react";
import { Button, ButtonProps } from "@chakra-ui/react";

interface SillyLittleButtonProps extends ButtonProps {
  selected?: boolean;
}

export const SillyLittleButton: React.FC<SillyLittleButtonProps> = ({
  selected,
  children,
  ...rest
}) => {
  const bgColor = selected ? "yellow" : "green";
  const hoverBgColor = "yellow";

  return (
    <Button bg={bgColor} color="white" _hover={{ bg: hoverBgColor }} {...rest}>
      {children}
    </Button>
  );
};

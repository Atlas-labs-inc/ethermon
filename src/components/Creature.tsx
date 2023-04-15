import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { ReactSVG } from "react-svg";
// import { ReactComponent as GrizzlarkSvg } from "../util/grizzlark.svg";
import dynamic from "next/dynamic";
import styles from "./Creature.module.css";
import { updateSvgSize } from "../util/randomUtils";

interface CreatureProps {
  id?: number;
  imageURL?: string;
  image?: string;
  contractAddress?: string;
  abi?: any;
  width?: number;
  height?: number;
  flipX?: boolean;
}

// const GrizzlarkSvg = dynamic(() => import("../components/Grizzlark"), {
//   ssr: false,
// });

export const Creature: React.FC<CreatureProps> = ({
  id,
  imageURL,
  contractAddress,
  abi,
  width,
  height,
  flipX,
}) => {
  // const [svg, setSvg] = useState<string>("");
  console.log("flipX:", flipX);
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: updateSvgSize(imageURL, width, height, flipX),
      }}
    />
  );
};

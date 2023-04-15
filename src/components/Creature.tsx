import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { ReactSVG } from "react-svg";
// import { ReactComponent as GrizzlarkSvg } from "../util/grizzlark.svg";
import dynamic from "next/dynamic";
import styles from "./Creature.module.css";

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
  const [svg, setSvg] = useState<string>("");
  console.log("flipX:", flipX);
  // useEffect(() => {
  //   const fetchSVG = async () => {
  //     if (!contractAddress || !abi) {
  //       return;
  //     }

  //     try {
  //       const provider = new ethers.providers.Web3Provider(window.ethereum);
  //       const contract = new ethers.Contract(contractAddress, abi, provider);
  //       const svgData = await contract.getSVG(id);
  //       setSvg(svgData);
  //     } catch (error) {
  //       console.error('Error fetching SVG:', error);
  //     }
  //   };

  //   fetchSVG();
  // }, [id, contractAddress, abi]);

  return (
    <ReactSVG wrapper="div" src={imageURL}         style={{
          width: width ? width : 467,
          height: height ? height : 600,
        }} />
  );
  // return (
  //   <GrizzlarkSvg
  //     width={width ? width : 467}
  //     height={height ? height : 600}
  //     className={flipX ? styles.flip : ""}
  //   />
  // );
};

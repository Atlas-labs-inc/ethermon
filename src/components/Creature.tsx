import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { ReactSVG } from "react-svg";
// import { ReactComponent as GrizzlarkSvg } from "../util/grizzlark.svg";
import dynamic from "next/dynamic";

interface CreatureProps {
  id?: number;
  contractAddress?: string;
  abi?: any;
  width?: number;
  height?: number;
  flipX?: boolean;
}

const GrizzlarkSvg = dynamic(() => import("../components/Grizzlark"), {
  ssr: false,
});

export const Creature: React.FC<CreatureProps> = ({
  id,
  contractAddress,
  abi,
  width,
  height,
  flipX,
}) => {
  const [svg, setSvg] = useState<string>("");

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

  // return (
  //   <ReactSVG wrapper="div" src={`data:image/svg+xml,${encodeURIComponent(svg)}`} />
  // );
  return (
    <GrizzlarkSvg
      width={width ? width : 467}
      height={height ? height : 600}
      className={flipX ? "flip-x-axis" : ""}
    />
  );
};

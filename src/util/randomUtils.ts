export const formatHash = (hash: string) => {
  return `${hash.substring(0, 6)}...${hash.substring(hash.length - 4)}`;
};

export const decimalToHexString = (decimal) => {
  const num = parseInt(decimal);
  if (typeof num !== "number" || isNaN(num)) {
    throw new Error("Input must be a valid number");
  }

  let hexString = num.toString(16);
  return "0x" + hexString;
};

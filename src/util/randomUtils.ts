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

export const base64Decode = (encodedString, isSvg = false) => {
  let base64Data = encodedString;
  if (isSvg) {
    base64Data = encodedString.split("data:image/svg+xml;base64,")[1];
  } else {
    base64Data = encodedString.split("data:application/json;base64,")[1];
  }

  // Check if running in a browser environment
  if (typeof window !== "undefined" && "atob" in window) {
    return atob(base64Data);
  }

  throw new Error("Unable to decode base64 string: environment not supported");
};

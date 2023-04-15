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

// export const updateSvgSize = (svgString, newWidth, newHeight) => {
//   const widthRegex = /width="(\d+)"/;
//   const heightRegex = /height="(\d+)"/;

//   const updatedWidth = svgString.replace(widthRegex, `width="${newWidth}"`);
//   const updatedHeight = updatedWidth.replace(
//     heightRegex,
//     `height="${newHeight}"`
//   );

//   return updatedHeight;
// };
export const updateSvgSize = (svgString, width, height, flipX = false) => {
  const viewBoxRegex = /(<svg[^>]+)(width="(\d+)")(.*?)(height="(\d+)")(.*?)>/;
  const match = svgString.match(viewBoxRegex);

  if (match) {
    const originalWidth = match[3];
    const originalHeight = match[6];
    const viewBox = `viewBox="0 0 ${originalWidth} ${originalHeight}"`;
    const newWidth = `width="${width}"`;
    const newHeight = `height="${height}"`;

    let updatedSvg = svgString.replace(
      viewBoxRegex,
      `$1 ${viewBox} ${newWidth} $4 ${newHeight} $7>`
    );

    if (flipX) {
      const flipTransform = `<g transform="scale(-1, 1) translate(-${originalWidth}, 0)">`;
      const closingTag = "</g>";
      updatedSvg = updatedSvg
        .replace(/(<svg[^>]*>)/, `$1${flipTransform}`)
        .replace(/(<\/svg>)/, `${closingTag}$1`);
    }

    return updatedSvg;
  } else {
    console.error("Invalid SVG string");
    return null;
  }
};

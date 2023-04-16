import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useImageSize } from "react-image-size";

export const Image = ({ uri, width, deviceHeight }) => {
  const [height, setHeight] = useState(50);
  const [dimensions, { loading, error }] = useImageSize(uri);
  const imageLoaded = !loading && !error;
  let imageWidth = 0;
  let imageHeight = 0;

  if (imageLoaded) {
    imageHeight = dimensions?.height;
    imageWidth = dimensions?.width;
  }

  useEffect(() => {
    const heightFormula =
      (imageHeight / imageWidth) * width + deviceHeight * 0.2;
    const newHeight =
      imageHeight < (imageHeight / imageWidth) * width ? height : heightFormula;
    setHeight(newHeight);
  }, [uri, width, deviceHeight, height]);

  return (
    <>
      {loading && <Typography>Loading image</Typography>}
      {error && <Typography>Sorry, something went wrong</Typography>}
      {imageLoaded && <img alt="archive" style={{ height, width }} src={uri} />}
    </>
  );
};

export default Image;

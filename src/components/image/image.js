import { Typography, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useImageSize } from "react-image-size";
import { Loading } from "../loading/loading";

export const Image = ({
  uri,
  width,
  deviceHeight,
  setObserverTarget,
  middle,
}) => {
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));
  const [height, setHeight] = useState(50);
  const [dimensions, { loading, error }] = useImageSize(uri);
  const imageLoaded = !loading && !error && dimensions;
  let imageWidth = 1;
  let imageHeight = 1;
  const tooWide = imageLoaded ? dimensions.width > width : false;
  const renderedImageHeight = dimensions ? height : window.innerHeight;
  const renderedImageWidth =
    mdUp && dimensions && !tooWide ? dimensions.width : "100%";

  if (imageLoaded) {
    imageHeight = dimensions?.height;
    imageWidth = dimensions?.width;
  }

  useEffect(() => {
    if (imageLoaded) {
      const heightFormula =
        (imageHeight / imageWidth) * width + deviceHeight * 0.2;
      const newHeight =
        imageHeight < (imageHeight / imageWidth) * width
          ? imageHeight
          : heightFormula;
      setHeight(newHeight);
    }
  }, [height, dimensions]);

  return (
    <>
      {loading && <Loading />}
      {error && <Typography>Sorry, something went wrong</Typography>}
      {imageLoaded && (
        <img
          alt={uri}
          loading="lazy"
          height={renderedImageHeight}
          width={renderedImageWidth}
          placeholder="Something"
          src={uri}
          ref={middle ? setObserverTarget : null}
          style={{ objectFit: "fill" }}
        />
      )}
    </>
  );
};

export default Image;

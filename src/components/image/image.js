import { Typography, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useImageSize } from "react-image-size";
import { Loading } from "../loading/loading";

export const Image = ({
  uri,
  deviceWidth,
  deviceHeight,
  setObserverTarget,
  middle,
}) => {
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));
  const [height, setHeight] = useState(50);
  const [loaded, setLoaded] = useState(false);
  const [dimensions, { loading, error }] = useImageSize(uri);
  const onLoad = () => setLoaded(true);
  const imageLoaded = !loading && !error && dimensions;
  let imageWidth = 1;
  let imageHeight = 1;
  const tooWide = imageLoaded ? dimensions.width > deviceWidth : false;
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
        (imageHeight / imageWidth) * deviceWidth + deviceHeight * 0.1;
      const newHeight =
        imageHeight < (imageHeight / imageWidth) * deviceWidth
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
          style={{ objectFit: "fill", display: loaded ? "" : "none" }}
          onLoad={onLoad}
        />
      )}
    </>
  );
};

export default Image;

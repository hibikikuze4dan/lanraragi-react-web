import { Typography, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useImageSize } from "react-image-size";
import { Loading } from "../loading/loading";
import {
  getDisplayMethodForWideArchive
} from "../../storage/archives";

export const Image = ({
  uri,
  deviceWidth,
  deviceHeight,
  setObserverTarget,
  middle,
  onImageClick,
}) => {
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));
  const [height, setHeight] = useState(50);
  const [dimensions, { loading, error }] = useImageSize(uri);
  const imageLoaded = !loading && !error && dimensions;
  let imageWidth = 1;
  let imageHeight = 1;
  const tooWide = imageLoaded ? dimensions.width > deviceWidth : false;
  const displayMethod = getDisplayMethodForWideArchive();
  let renderedImageHeight;
  let renderedImageWidth;
  if (displayMethod === "contain") {
    renderedImageHeight = "100%";
    renderedImageWidth = "100%";
  } else if (displayMethod === "cover") {
    renderedImageHeight = dimensions ? dimensions.height : "100%";;
    renderedImageWidth = dimensions ? dimensions.width : "100%";
  } else if (displayMethod === "fill") {
    renderedImageHeight = dimensions ? height : window.innerHeight;
    renderedImageWidth = mdUp && dimensions && !tooWide ? dimensions.width : "100%";
  } else {
    renderedImageHeight = dimensions ? dimensions.height : "100%";
    renderedImageWidth = dimensions ? dimensions.width : "100%";
  }

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
    <Loading loading={!imageLoaded}>
      {error && <Typography>Sorry, something went wrong</Typography>}
      {imageLoaded && (
        <button
          type="button"
          onClick={onImageClick}
          style={{ backgroundColor: "transparent", border: "none" }}
        >
          <img
            alt={uri}
            loading="lazy"
            height={renderedImageHeight}
            width={renderedImageWidth}
            placeholder="Something"
            src={uri}
            ref={middle ? setObserverTarget : null}
            style={{ objectFit: displayMethod }}
          />
        </button>
      )}
    </Loading>
  );
};

export default Image;

import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useImageSize } from "react-image-size";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Loading } from "../loading/loading";

export const Image = ({ uri, width, deviceHeight, last, morePages }) => {
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
        <LazyLoadImage
          alt="archive"
          afterLoad={last ? morePages : () => null}
          height={height}
          width={width}
          src={uri}
          effect="opacity"
          threshold={200}
        />
      )}
    </>
  );
};

export default Image;

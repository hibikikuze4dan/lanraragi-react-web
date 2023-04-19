import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useImageSize } from "react-image-size";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Loading } from "../loading/loading";

export const Image = ({ uri, width, deviceHeight, last, morePages }) => {
  const [height, setHeight] = useState(50);
  const [dimensions, { loading, error }] = useImageSize(uri);
  if (last) console.log(loading);
  const imageLoaded = !loading && !error;
  let imageWidth = 1;
  let imageHeight = 1;
  const renderedImageHeight = imageLoaded ? height : window.innerHeight;
  // const renderedImageWidth = imageLoaded ? width : window.innerWidth;
  const renderedImageWidth = "100%";
  const afterLoad = () => {
    if (last) morePages();
  };

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
      afterLoad();
    }
  }, [height, dimensions]);

  return (
    <>
      {loading && <Loading />}
      {error && <Typography>Sorry, something went wrong</Typography>}
      {imageLoaded && (
        <LazyLoadImage
          alt="archive"
          height={renderedImageHeight}
          width={renderedImageWidth}
          src={uri}
          effect="opacity"
          threshold={200}
          style={{ marginBottom: "4px" }}
        />
      )}
    </>
  );
};

export default Image;

import { useImageSize } from "react-image-size";
import { useWindowSize } from "usehooks-ts";
import { getImagesDisplayMethod } from "../../storage/images";

export const useImageStyles = ({ src }) => {
  const windowSize = useWindowSize();
  const displayMethod = getImagesDisplayMethod();
  const [imageDimensions, { loading: isImageLoading, error: errorMessage }] =
    useImageSize(src);

  const imageHeight = imageDimensions?.height;
  const imageWidth = imageDimensions?.width;
  const aspectRationMultiplierForHeight = imageDimensions
    ? imageHeight / imageWidth
    : null;
  const isImageWiderThanTheScreenSize = imageDimensions
    ? imageWidth > windowSize.width
    : false;
  let calculatedFillHeight = "100%";
  if (imageDimensions) {
    const heightFormula =
      aspectRationMultiplierForHeight * windowSize.width +
      windowSize.height * 0.1;
    const newHeight =
      imageHeight < aspectRationMultiplierForHeight * windowSize.width
        ? imageHeight
        : heightFormula;

    calculatedFillHeight = newHeight;
  }

  const width = !isImageWiderThanTheScreenSize ? imageWidth : "100%";
  const height = {
    contain: undefined,
    cover: imageDimensions ? imageDimensions.height : undefined,
    fill: calculatedFillHeight,
  };
  return {
    styles: { objectFit: displayMethod },
    width,
    height: height[displayMethod],
    loading: isImageLoading,
    errorMessage,
  };
};

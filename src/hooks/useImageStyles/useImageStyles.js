import { useImageSize } from "react-image-size";
import { useWindowSize } from "usehooks-ts";

export const useImageStyles = ({ src }) => {
  const windowSize = useWindowSize();
  const [imageDimensions, { loading: isImageLoading, error: errorMessage }] =
    useImageSize(src ?? "");
  return {
    loading: isImageLoading,
    errorMessage,
    windowSize,
    imageDimensions,
  };
};

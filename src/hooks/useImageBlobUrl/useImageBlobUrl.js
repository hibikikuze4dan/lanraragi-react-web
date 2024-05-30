import { useCallback, useEffect, useState } from "react";
import { getArchiveImage } from "../../requests/files";

export const useImageBlobUrl = (imgSrc) => {
  const [imageBlob, setImageBlob] = useState(null);
  const revokeImageUrl = useCallback(
    () => URL.revokeObjectURL(imageBlob),
    [imageBlob]
  );
  useEffect(() => {
    if (!imageBlob)
      getArchiveImage(imgSrc).then((res) => {
        if (res) setImageBlob(URL.createObjectURL(res));
      });
  }, [imgSrc, setImageBlob]);

  return { url: imageBlob, revokeImageUrl };
};

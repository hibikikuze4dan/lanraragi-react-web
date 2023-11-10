import React, { useCallback, useState } from "react";
import { Loading } from "../loading/loading";
import { useImageStyles } from "../../hooks/useImageStyles/useImageStyles";
import { useImageBlobUrl } from "../../hooks/useImageBlobUrl/useImageBlobUrl";

export const BlobImage = ({ uri, setObserverTarget, middle, onImageClick }) => {
  const { url, revokeImageUrl } = useImageBlobUrl(uri);
  const { styles, width, height } = useImageStyles({
    src: uri,
  });
  const [loaded, setLoaded] = useState(false);
  const onLoad = useCallback(() => {
    setLoaded(true);
    setTimeout(() => revokeImageUrl(), 1000);
  }, [setLoaded, revokeImageUrl]);

  return (
    <Loading loading={!url}>
      {url && (
        <button
          type="button"
          onClick={onImageClick}
          style={{ backgroundColor: "transparent", border: "none" }}
        >
          <img
            alt={uri}
            loading="lazy"
            src={url}
            onLoad={onLoad}
            height={height}
            width={width}
            placeholder="Archive Image"
            ref={middle ? setObserverTarget : null}
            style={{ ...styles, display: loaded ? "unset" : "hidden" }}
          />
        </button>
      )}
    </Loading>
  );
};

export default BlobImage;

import React from "react";
import { Loading } from "../loading/loading";
import { useImageStyles } from "../../hooks/useImageStyles/useImageStyles";
import { useImageBlobUrl } from "../../hooks/useImageBlobUrl/useImageBlobUrl";

export const BlobImage = ({ uri, setObserverTarget, middle, onImageClick }) => {
  const { url, revokeImageUrl } = useImageBlobUrl(uri);
  const { styles, width, height } = useImageStyles({
    src: uri,
  });

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
            onLoad={revokeImageUrl}
            height={height}
            width={width}
            placeholder="Archive Image"
            ref={middle ? setObserverTarget : null}
            style={{ ...styles }}
          />
        </button>
      )}
    </Loading>
  );
};

export default BlobImage;

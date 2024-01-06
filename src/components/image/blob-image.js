import React, { useCallback } from "react";
import { Loading } from "../loading/loading";
import { useImageBlobUrl } from "../../hooks/useImageBlobUrl/useImageBlobUrl";

export const BlobImage = ({ uri, setObserverTarget, middle, onImageClick }) => {
  const { url, revokeImageUrl } = useImageBlobUrl(uri);
  const onLoad = useCallback(() => {
    setTimeout(() => revokeImageUrl(), 1000);
  }, [revokeImageUrl]);

  return (
    <Loading loading={!url}>
      {url && (
        <div className="w-full flex justify-center">
          <button
            className="w-fit no-border bg-transparent"
            type="button"
            onClick={onImageClick}
          >
            <img
              alt={uri}
              className="w-max max-w-full h-auto"
              loading="lazy"
              src={url}
              onLoad={onLoad}
              placeholder="Archive Image"
              ref={middle ? setObserverTarget : null}
            />
          </button>
        </div>
      )}
    </Loading>
  );
};

export default BlobImage;

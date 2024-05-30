import { Typography } from "@mui/material";
import React from "react";
import { Loading } from "../loading/loading";
import { useImageStyles } from "../../hooks/useImageStyles/useImageStyles";

export const Image = ({ uri, setObserverTarget, middle, onImageClick }) => {
  const { loading, errorMessage } = useImageStyles({
    src: uri,
  });

  return (
    <Loading
      fullHeight={false}
      outerGridClassName="pb-20 mb-20 svh-ninety"
      loading={loading}
    >
      {errorMessage && <Typography>Sorry, something went wrong</Typography>}
      {!loading && (
        <div className="w-full flex justify-center">
          <button
            className="w-fit no-border bg-transparent"
            type="button"
            onClick={onImageClick}
          >
            <img
              className="w-max max-w-full h-auto"
              alt={uri}
              loading="lazy"
              placeholder="Archive Image"
              src={uri}
              ref={middle ? setObserverTarget : null}
            />
          </button>
        </div>
      )}
    </Loading>
  );
};

export default Image;

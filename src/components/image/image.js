import { Typography } from "@mui/material";
import React from "react";
import { Loading } from "../loading/loading";
import { useImageStyles } from "../../hooks/useImageStyles/useImageStyles";

export const Image = ({ uri, setObserverTarget, middle, onImageClick }) => {
  const { styles, width, height, loading, errorMessage } = useImageStyles({
    src: uri,
  });
  return (
    <Loading loading={loading}>
      {errorMessage && <Typography>Sorry, something went wrong</Typography>}
      {!loading && (
        <button
          type="button"
          onClick={onImageClick}
          style={{ backgroundColor: "transparent", border: "none" }}
        >
          <img
            alt={uri}
            loading="lazy"
            height={height}
            width={width}
            placeholder="Archive Image"
            src={uri}
            ref={middle ? setObserverTarget : null}
            style={{ ...styles }}
          />
        </button>
      )}
    </Loading>
  );
};

export default Image;

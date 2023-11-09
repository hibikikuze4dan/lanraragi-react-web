import React from "react";
import { Button, Grid } from "@mui/material";
import { firstLetterToUppercase, httpOrHttps } from "../../utils";
import { Loading } from "../loading/loading";
import { Rating } from "../rating/rating";
import { useImageListLogic } from "./useImageListLogic";
import { BlobImage } from "../image/blob-image";
import Image from "../image/image";

export const ImageList = () => {
  const {
    archiveOpenedFrom,
    arcId,
    baseUrl,
    gettingImagesFromLRR,
    observerRoot,
    onBackClick,
    onImageClick,
    pagesToRender,
    pageUrls,
    setFinalTarget,
    setObserverTarget,
    useBlobImages,
  } = useImageListLogic();

  const ImageToUse = useBlobImages ? BlobImage : Image;

  return (
    <Grid
      ref={observerRoot}
      container
      className="overflow"
      justifyContent="center"
      id={`images-list-${arcId}`}
      sx={{ backgroundColor: "rgba(24, 24, 26, 1)" }}
    >
      <Loading label="Getting images" loading={gettingImagesFromLRR}>
        {[...pageUrls.slice(0, pagesToRender)].map((page, index) => {
          const src = `${httpOrHttps()}${baseUrl}${page}`;
          const middle = (index + 1) % (pagesToRender - 5) === 0;
          return (
            <Grid key={src} item xs={12}>
              <ImageToUse
                uri={src}
                middle={middle}
                setObserverTarget={setObserverTarget}
                onImageClick={onImageClick}
              />
            </Grid>
          );
        })}
        <Grid item xs={12} sx={{ p: "1rem 0 1rem 0" }}>
          <Rating arcId={arcId} />
        </Grid>
      </Loading>
      <Grid item xs={12}>
        <Grid container justifyContent="center">
          <Grid item xs={8}>
            <Button
              onClick={onBackClick}
              fullWidth
              sx={{ textTransform: "none", mt: "2rem" }}
            >
              Back to {firstLetterToUppercase(archiveOpenedFrom)}
            </Button>
          </Grid>
        </Grid>
        <div ref={setFinalTarget} style={{ width: "100%", height: "10svh" }} />
        <div style={{ width: "100%", height: "65svh" }} />
      </Grid>
    </Grid>
  );
};

export default ImageList;

import React from "react";
import { Box, Button, Grid } from "@mui/material";
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
    imageSpacingLevel,
    isMobile,
    observerRoot,
    onBackClick,
    onImageClick,
    pagesError,
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
    >
      {pagesError ? (
        <Grid item xs={12}>
          Sorry, something went wrong while trying to get the archive pages.
        </Grid>
      ) : (
        <Loading label="Getting images" loading={gettingImagesFromLRR}>
          {[...pageUrls.slice(0, pagesToRender)].map((page, index) => {
            const src = `${httpOrHttps()}${baseUrl}${page}`;
            const middle = (index + 1) % (pagesToRender - 5) === 0;
            return (
              <Grid key={src} item xs={12}>
                <Box mb={imageSpacingLevel} width="100%">
                  <ImageToUse
                    uri={src}
                    middle={middle}
                    setObserverTarget={setObserverTarget}
                    onImageClick={onImageClick}
                  />
                </Box>
              </Grid>
            );
          })}
          <Grid className="py-4" item xs={12}>
            <Rating arcId={arcId} useSelect={isMobile} />
          </Grid>
        </Loading>
      )}

      <Grid item xs={12}>
        <Grid container justifyContent="center">
          <Grid item xs={8}>
            <Button
              className="normal-case mt-8"
              onClick={onBackClick}
              fullWidth
            >
              Back to {firstLetterToUppercase(archiveOpenedFrom)}
            </Button>
          </Grid>
        </Grid>
        <div className="w-full h-1/6" ref={setFinalTarget} />
        <div className="w-full h-96" />
      </Grid>
    </Grid>
  );
};

export default ImageList;

import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getArchiveFiles } from "../../requests/files";
import { Image } from "../image/image";
import { getBaseUrl } from "../../storage/requests";
import {
  setAllSectionVisibilityFalse,
  updateDisplayNavbar,
  updateLoading,
  updatePages,
  updateSectionVisibility,
} from "../../app/slice";
import {
  getArchiveOpenedFrom,
  getCurrentArchiveId,
  getCurrentPages,
  getDisplayNavbar,
  getLoading,
} from "../../app/selectors";
import { getMinionStatus } from "../../requests/minion";
import { firstLetterToUppercase, httpOrHttps } from "../../utils";
import { Loading } from "../loading/loading";

export const ImageList = () => {
  const dispatch = useDispatch();
  const arcId = useSelector(getCurrentArchiveId);
  const pageUrls = useSelector(getCurrentPages);
  const displayNavbar = useSelector(getDisplayNavbar);
  const archiveOpenedFrom = useSelector(getArchiveOpenedFrom);
  const { images: gettingImagesFromLRR } = useSelector(getLoading);
  const [pagesToRender, updatePagesToRender] = useState(10);
  const width = window.innerWidth;
  const height = window.innerHeight;
  const baseUrl = getBaseUrl();
  const [observerTarget, setObserverTarget] = useState();
  const [finalTarget, setFinalTarget] = useState();
  const observerRoot = useRef(null);

  useEffect(() => {
    const getPages = async () => {
      let jobStatus;
      dispatch(updateLoading({ images: true }));
      const newPagesData = await getArchiveFiles(arcId);
      const job = newPagesData?.job;
      if (job) {
        jobStatus = await getMinionStatus(newPagesData?.job);
      }
      if (jobStatus?.state === "finished") {
        dispatch(updatePages(newPagesData.pages));
        dispatch(updateLoading({ images: false }));
        return;
      }
      setTimeout(() => dispatch(updatePages(newPagesData.pages)), 1000);
      dispatch(updateLoading({ images: false }));
    };
    if (arcId) getPages();
  }, [arcId]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          updatePagesToRender((ptr) => ptr + 10);
        }
      },
      { threshold: 0.5, root: observerRoot.current }
    );

    if (observerTarget) observer.observe(observerTarget);
    if (finalTarget) observer.observe(finalTarget);

    return () => {
      if (observerTarget) observer.unobserve(observerTarget);
      if (finalTarget) observer.unobserve(finalTarget);
    };
  }, [observerTarget, finalTarget, observerRoot]);

  const onImageClick = useCallback(() => {
    dispatch(updateDisplayNavbar(!displayNavbar));
  }, [displayNavbar]);
  const onBackClick = useCallback(() => {
    dispatch(setAllSectionVisibilityFalse());
    dispatch(updateDisplayNavbar(true));
    dispatch(updateSectionVisibility({ [archiveOpenedFrom]: true }));
  }, [archiveOpenedFrom]);

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
              <Image
                deviceWidth={width}
                deviceHeight={height}
                uri={src}
                middle={middle}
                setObserverTarget={setObserverTarget}
                onImageClick={onImageClick}
              />
            </Grid>
          );
        })}
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

import React, { useEffect, useRef, useState } from "react";
import { Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getArchiveFiles } from "../../requests/files";
import { Image } from "../image/image";
import { getBaseUrl } from "../../storage/requests";
import { updatePages } from "../../app/slice";
import { getCurrentArchiveId, getCurrentPages } from "../../app/selectors";

export const ImageList = () => {
  const dispatch = useDispatch();
  const arcId = useSelector(getCurrentArchiveId);
  const pageUrls = useSelector(getCurrentPages);
  const [pagesToRender, updatePagesToRender] = useState(10);
  const width = window.innerWidth;
  const height = window.innerHeight;
  const baseUrl = getBaseUrl();
  const [observerTarget, setObserverTarget] = useState();
  const [finalTarget, setFinalTarget] = useState();
  const observerRoot = useRef(null);

  useEffect(() => {
    const getPages = async () => {
      const newPages = await getArchiveFiles(arcId);
      dispatch(updatePages(newPages));
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

  return (
    <Grid
      ref={observerRoot}
      container
      className="overflow"
      justifyContent="center"
      id={`images-list-${arcId}`}
      sx={{ backgroundColor: "rgba(24, 24, 26, 1)" }}
    >
      {[...pageUrls.slice(0, pagesToRender)].map((page, index) => {
        const src = `http://${baseUrl}${page}`;
        const middle = (index + 1) % (pagesToRender - 5) === 0;
        return (
          <Grid key={src} item xs={12}>
            <Image
              deviceWidth={width}
              deviceHeight={height}
              uri={src}
              middle={middle}
              setObserverTarget={setObserverTarget}
            />
          </Grid>
        );
      })}
      <div ref={setFinalTarget} style={{ width: "100%", height: "10svh" }} />
    </Grid>
  );
};

export default ImageList;

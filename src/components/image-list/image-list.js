import React, { useEffect, useRef, useState } from "react";
import { drop, take } from "lodash";
import { Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getArchiveFiles } from "../../requests/files";
import { Image } from "../image/image";
import { getBaseUrl } from "../../storage/requests";
import { updatePages } from "../../app/slice";
import { getCurrentArchiveId, getCurrentPages } from "../../app/selectors";

export const ImageList = ({ scrollPosition }) => {
  const dispatch = useDispatch();
  const arcId = useSelector(getCurrentArchiveId);
  const pages = useSelector(getCurrentPages);
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
        console.log(entries);
        if (entries[0].isIntersecting) {
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
  }, [observerTarget]);

  return (
    <Grid
      ref={observerRoot}
      container
      className="overflow"
      justifyContent="center"
      id={`images-list-${arcId}`}
      sx={{ backgroundColor: "rgba(24, 24, 26, 1)" }}
      scrollPosition={scrollPosition}
    >
      {[...take(pages, pagesToRender)].map((page, index) => {
        const src = `http://${baseUrl}${drop(page.split(""), 1).join("")}`;
        const middle = (index + 1) % (pagesToRender - 5) === 0;
        return (
          <Image
            key={src}
            width={width}
            deviceHeight={height}
            uri={src}
            middle={middle}
            setObserverTarget={setObserverTarget}
          />
        );
      })}
      <div ref={setFinalTarget} style={{ width: "100%", height: "10svh" }} />
    </Grid>
  );
};

export default ImageList;

import React, { useEffect } from "react";
import { drop, take } from "lodash";
import { Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getArchiveFiles } from "../../requests/files";
import { Image } from "../image/image";
import { getBaseUrl } from "../../storage/requests";
import { updatePages, updateRenderedPages } from "../../app/slice";
import { getCurrentPages, getCurrentRenderedPages } from "../../app/selectors";

export const ImageList = ({ arcId }) => {
  const dispatch = useDispatch();
  const pages = useSelector(getCurrentPages);
  const renderedPages = useSelector(getCurrentRenderedPages);
  const width = window.innerWidth;
  const height = window.innerHeight;
  const baseUrl = getBaseUrl();

  useEffect(() => {
    const getPages = async () => {
      const newPages = await getArchiveFiles(arcId);
      dispatch(updateRenderedPages([...take(newPages, 5)]));
      dispatch(updatePages([...drop(newPages, 5)]));
    };
    getPages();
  }, [arcId]);

  const morePages = () => {
    dispatch(updateRenderedPages([...renderedPages, ...take(pages, 5)]));
    dispatch(updatePages([...drop(pages, 5)]));
  };

  return (
    <Grid>
      {renderedPages.map((page, index) => {
        const src = `http://${baseUrl}${drop(page.split(""), 1).join("")}`;
        return (
          <Image
            key={src}
            width={width}
            deviceHeight={height}
            uri={src}
            last={(index + 1) % 5 === 0}
            morePages={morePages}
          />
        );
      })}
    </Grid>
  );
};

export default ImageList;

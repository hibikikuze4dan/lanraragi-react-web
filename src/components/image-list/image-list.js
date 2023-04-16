import React, { useEffect, useState } from "react";
import { drop } from "lodash";
import { Grid } from "@mui/material";
import { getArchiveFiles } from "../../requests/files";
import { BASE_URL } from "../../requests/constants";
import { Image } from "../image/image";

export const ImageList = ({ arcId }) => {
  const [pages, updatePages] = useState([]);
  const width = window.innerWidth;
  const height = window.innerHeight;

  useEffect(() => {
    const getPages = async () => {
      const newPages = await getArchiveFiles(arcId);
      updatePages(newPages);
    };
    getPages();
  }, [arcId]);

  return (
    <Grid>
      {pages.map((page) => {
        const src = BASE_URL + drop(page.split(""), 1).join("");
        console.log(src);

        return (
          <Image key={src} width={width} deviceHeight={height} uri={src} />
        );
      })}
    </Grid>
  );
};

export default ImageList;

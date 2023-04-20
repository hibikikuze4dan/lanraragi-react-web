import React from "react";
import { useSelector } from "react-redux";
import { Grid, useMediaQuery, useTheme } from "@mui/material";
import { Random } from "./random/random";
import { ImageList } from "./image-list/image-list";
import { getSectionVisibilityObject } from "../app/selectors";
import { Url } from "./url/url";
import { Navbar } from "./navbar/navbar";

export default function App() {
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up("sm"));
  const { random, images, address } = useSelector(getSectionVisibilityObject);

  const styles = {
    topDiv: {
      ...(mdUp && { display: "flex" }),
      ...(!mdUp && { height: `${(11 / 12) * 100}vh` }),
    },
  };

  return (
    <>
      <div id="top-div" style={styles.topDiv}>
        <div className="full-width">
          <Grid className="full-width">
            {address && <Url />}
            {random && <Random />}
            {images && <ImageList />}
          </Grid>
        </div>
      </div>
      <Navbar />
    </>
  );
}

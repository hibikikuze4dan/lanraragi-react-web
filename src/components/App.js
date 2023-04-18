import React from "react";
import { useSelector } from "react-redux";
import { Grid } from "@mui/material";
import { Random } from "./random/random";
import { ImageList } from "./image-list/image-list";
import { getSectionVisibilityObject } from "../app/selectors";
import { Url } from "./url/url";
import { Navbar } from "./navbar/navbar";

export default function App() {
  const { random, images, address } = useSelector(getSectionVisibilityObject);

  return (
    <div style={{ display: "flex" }}>
      <Grid className="full-width">
        <Grid className="full-width">
          {address && <Url />}
          {random && <Random />}
          {images && <ImageList />}
        </Grid>
      </Grid>
      <Navbar />
    </div>
  );
}

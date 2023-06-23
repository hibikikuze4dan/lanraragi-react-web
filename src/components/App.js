import React from "react";
import { useSelector } from "react-redux";
import { Grid, useMediaQuery, useTheme } from "@mui/material";
import { Random } from "./random/random";
import ImageList from "./image-list/image-list";
import { getSectionVisibilityObject } from "../app/selectors";
import { Url } from "./url/url";
import { Navbar } from "./navbar/navbar";
import Search from "./search/search";
import { Settings } from "./settings/settings";
import { SnackbarAlert } from "./snackbar-alert/snackbar-alert";
import { useSearchOnLoad } from "../hooks/useSearchOnLoad/useSearchOnLoad";
import { History } from "./history/history";

export default function App() {
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up("sm"));
  const { random, images, search, settings, history } = useSelector(
    getSectionVisibilityObject
  );
  const { loading, controller } = useSearchOnLoad();

  const styles = {
    wrapper: {
      ...(mdUp && { display: "flex", flexDirection: "row" }),
      ...(!mdUp && { height: `${(11 / 12) * 100}svh` }),
    },
    topDiv: {
      height: "100svh",
      ...(mdUp && { display: "flex", flexDirection: "row" }),
    },
  };

  return (
    <div style={styles.topDiv}>
      {mdUp && <Navbar />}
      <div id="top-div" className="full-width" style={styles.wrapper}>
        <div className="full-width full-height">
          <Grid className="full-width full-height">
            <Url>
              {random && <Random />}
              {search && <Search loading={loading} controller={controller} />}
              {history && <History />}
              {images && <ImageList />}
              {settings && <Settings />}
            </Url>
          </Grid>
        </div>
      </div>
      <SnackbarAlert />
      {!mdUp && <Navbar />}
    </div>
  );
}

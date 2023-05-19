import React from "react";
import { Grid } from "@mui/material";
import { NumArchivesForRow } from "./fragments/num-archives-for-row/num-archives-for-row";
import { MaxArchivesForViewPort } from "./fragments/max-archives-for-viewport/max-archives-for-viewport";

export const Settings = () => (
  <Grid container>
    <Grid item xs={12}>
      <NumArchivesForRow />
    </Grid>
    <Grid item xs={12}>
      <MaxArchivesForViewPort />
    </Grid>
  </Grid>
);

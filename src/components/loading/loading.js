import React from "react";
import { CircularProgress, Grid, Paper } from "@mui/material";

export const Loading = () => (
  <Grid container sx={{ minHeight: window.innerHeight }}>
    <Paper sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <CircularProgress />
    </Paper>
  </Grid>
);

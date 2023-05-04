import React from "react";
import { CircularProgress, Grid, Paper } from "@mui/material";

export const Loading = () => (
  <Grid container sx={{ minHeight: window.innerHeight, width: "100%" }}>
    <Paper
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        height: "100svh",
        backgroundColor: "inherit",
      }}
    >
      <CircularProgress size={80} />
    </Paper>
  </Grid>
);

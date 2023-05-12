/* eslint-disable react/jsx-no-useless-fragment */
import React from "react";
import { CircularProgress, Grid, Typography } from "@mui/material";

export const Loading = ({ children, label, loading = true }) => {
  const styles = {
    container: { minHeight: `${window.innerHeight}px`, width: "100%" },
  };

  return !loading ? (
    <>{children}</>
  ) : (
    <Grid
      container
      alignContent="center"
      justifyContent="center"
      sx={styles.container}
    >
      <Grid item xs={12}>
        <Typography>{label}</Typography>
      </Grid>
      <CircularProgress size={80} />
    </Grid>
  );
};

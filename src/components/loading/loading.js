/* eslint-disable no-confusing-arrow */
/* eslint-disable react/jsx-no-useless-fragment */
import React from "react";
import { CircularProgress, Grid, Typography } from "@mui/material";
import classNames from "classnames";

export const Loading = ({
  children,
  outerGridClassName = "",
  fullHeight = true,
  label,
  loading = true,
  centerText = false,
}) =>
  !loading ? (
    <>{children}</>
  ) : (
    <Grid
      className={classNames(
        "w-full min-h-16",
        { "h-full": fullHeight },
        outerGridClassName
      )}
      container
      alignContent="center"
      justifyContent="center"
    >
      <Grid item xs={12}>
        <Typography className={`${centerText ? "text-center" : ""}`}>
          {label}
        </Typography>
      </Grid>
      <CircularProgress size={80} />
    </Grid>
  );

/* eslint-disable arrow-body-style */
import React, { useCallback, useState } from "react";
import { Button, Grid, Typography } from "@mui/material";

export const IdTitleSwitchButton = ({ arcId, archiveTitle }) => {
  const [showId, setShowId] = useState(false);
  const onSwitch = useCallback(() => {
    setShowId(!showId);
  }, [showId]);

  return (
    <Grid
      className="h-full"
      alignContent="center"
      justifyContent="center"
      container
    >
      <Grid item xs={12}>
        <Typography textAlign="center">
          {showId ? (
            <>
              Archive ID:
              <br />
              <span className="overflow-wrap-anywhere">{arcId}</span>
            </>
          ) : (
            archiveTitle
          )}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Button
          aria-label={`Click here to show Archive ${!showId ? "ID" : "Title"}`}
          className="w-full h-full rounded-none"
          onClick={onSwitch}
        >
          Display Archive {showId ? "Title" : "ID"}
        </Button>
      </Grid>
    </Grid>
  );
};

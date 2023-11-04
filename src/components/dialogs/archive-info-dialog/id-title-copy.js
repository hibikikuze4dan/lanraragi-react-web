/* eslint-disable arrow-body-style */
import React, { useCallback, useState } from "react";
import { Button, Grid, Typography } from "@mui/material";

export const IdTitleCopyButton = ({ arcId, archiveTitle }) => {
  const [showId, setShowId] = useState(false);
  const onSwitch = useCallback(() => {
    setShowId(!showId);
  }, [showId]);

  return (
    <Grid
      alignContent="center"
      justifyContent="center"
      container
      sx={{ height: "100%" }}
    >
      <Grid item xs={12}>
        <Typography textAlign="center">
          {showId ? (
            <>
              Archive ID:
              <br />
              <span style={{ overflowWrap: "anywhere" }}>{arcId}</span>
            </>
          ) : (
            archiveTitle
          )}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Button
          aria-label={`Click here to show Archive ${!showId ? "ID" : "Title"}`}
          onClick={onSwitch}
          style={{ width: "100%", height: "100%", borderRadius: "unset" }}
        >
          Display Archive {showId ? "Title" : "ID"}
        </Button>
      </Grid>
    </Grid>
  );
};

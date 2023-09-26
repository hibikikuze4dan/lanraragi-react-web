/* eslint-disable arrow-body-style */
import React, { useCallback, useState } from "react";
import { Grid, IconButton, Typography } from "@mui/material";
import { AbcOutlined, Pin } from "@mui/icons-material";

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
      <Grid item xs={10}>
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
      <Grid item xs={2}>
        <IconButton
          aria-label={`Click here to show Archive ${!showId ? "ID" : "Title"}`}
          onClick={onSwitch}
          style={{ width: "100%", height: "100%", borderRadius: "unset" }}
        >
          {showId ? <AbcOutlined /> : <Pin />}
        </IconButton>
      </Grid>
    </Grid>
  );
};

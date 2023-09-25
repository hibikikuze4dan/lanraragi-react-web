/* eslint-disable arrow-body-style */
import React, { useCallback, useState } from "react";
import { Button, Grid, IconButton, Typography } from "@mui/material";
import { CopyAll } from "@mui/icons-material";

export const IdTitleCopyButton = ({ arcId, archiveTitle }) => {
  const [showId, setShowId] = useState(false);
  const onTitleClick = useCallback(() => {
    setShowId(!showId);
  }, [showId]);

  const onCopyIconButtonClick = () => {
    navigator.clipboard.writeText(showId ? arcId : archiveTitle);
  };

  return (
    <Grid
      alignContent="center"
      justifyContent="center"
      container
      sx={{ height: "100%" }}
    >
      <Grid item xs={10}>
        <Button
          variant="text"
          sx={{ textTransform: "none" }}
          onClick={onTitleClick}
          fullWidth
        >
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
        </Button>
      </Grid>
      <Grid item xs={2}>
        <IconButton
          aria-label={`Click here to copy Archive ${
            showId ? "ID" : "Title"
          } to clipboard`}
          onClick={onCopyIconButtonClick}
          style={{ width: "100%", height: "100%", borderRadius: "unset" }}
        >
          <CopyAll />
        </IconButton>
      </Grid>
    </Grid>
  );
};

import { Grid, Typography } from "@mui/material";
import React from "react";
import { getArchiveHistory } from "../../../../storage/history";
import { ArchiveHistoryButton } from "./fragments/archive-history-button";

export const ArchiveHistory = () => {
  const archiveHistory = getArchiveHistory();

  return (
    <Grid container spacing={2}>
      {archiveHistory.reverse().map(({ id, title, date }, index) => (
        <Grid item key={`${id} ${date ?? index}`} xs={12} md={6}>
          <ArchiveHistoryButton id={id} title={title} />
        </Grid>
      ))}
      {archiveHistory.length < 1 && (
        <Typography textAlign="center">
          Looks like no archives have been opened yet.
        </Typography>
      )}
    </Grid>
  );
};

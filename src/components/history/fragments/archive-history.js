import { Button, Grid, Paper } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addArchiveToArchiveHistory,
  getArchiveHistory,
} from "../../../storage/history";
import {
  setAllSectionVisibilityFalse,
  updateCurrentArchiveId,
  updatePages,
  updateSectionVisibility,
} from "../../../app/slice";
import { getCurrentArchiveId } from "../../../app/selectors";

export const ArchiveHistory = () => {
  const dispatch = useDispatch();
  const currentArchiveId = useSelector(getCurrentArchiveId);
  const archiveHistory = getArchiveHistory();

  return (
    <Grid container spacing={2}>
      {archiveHistory.reverse().map(({ id, title }) => {
        const onClick = () => {
          if (id !== currentArchiveId) dispatch(updatePages([]));
          dispatch(setAllSectionVisibilityFalse());
          dispatch(updateSectionVisibility({ images: true }));
          dispatch(updateCurrentArchiveId(id));
          addArchiveToArchiveHistory({ id, title });
        };
        return (
          <Grid item key={id} xs={12} md={6}>
            <Button
              component={Paper}
              fullWidth
              onClick={onClick}
              sx={{ textTransform: "none", height: "100%" }}
            >
              {title}
            </Button>
          </Grid>
        );
      })}
    </Grid>
  );
};

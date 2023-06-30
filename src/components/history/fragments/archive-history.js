import { Button, Grid, Paper } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { DateTime } from "luxon";
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
      {archiveHistory.reverse().map(({ id, title, date }, index) => {
        const onClick = () => {
          if (id !== currentArchiveId) dispatch(updatePages([]));
          dispatch(setAllSectionVisibilityFalse());
          dispatch(updateSectionVisibility({ images: true }));
          dispatch(updateCurrentArchiveId(id));
          addArchiveToArchiveHistory({
            id,
            title,
            date: DateTime.now().toLocaleString(
              DateTime.DATETIME_HUGE_WITH_SECONDS
            ),
          });
        };
        return (
          <Grid item key={`${id} ${date ?? index}`} xs={12} md={6}>
            <Button
              aria-label={`Click to open archive ${title}`}
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

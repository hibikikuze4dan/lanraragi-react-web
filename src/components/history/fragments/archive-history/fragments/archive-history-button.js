import { Button, Paper } from "@mui/material";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DateTime } from "luxon";
import {
  setAllSectionVisibilityFalse,
  updateArchiveOpenedFrom,
  updateCurrentArchiveId,
  updatePages,
  updateSectionVisibility,
} from "../../../../../app/slice";
import { addArchiveToArchiveHistory } from "../../../../../storage/history";
import { getCurrentArchiveId } from "../../../../../app/selectors";

export const ArchiveHistoryButton = ({ title, id }) => {
  const dispatch = useDispatch();
  const currentArchiveId = useSelector(getCurrentArchiveId);

  const onClick = useCallback(() => {
    if (id !== currentArchiveId) dispatch(updatePages([]));
    dispatch(setAllSectionVisibilityFalse());
    dispatch(updateSectionVisibility({ images: true }));
    dispatch(updateCurrentArchiveId(id));
    dispatch(updateArchiveOpenedFrom("history"));
    addArchiveToArchiveHistory({
      id,
      title,
      date: DateTime.now().toLocaleString(DateTime.DATETIME_HUGE_WITH_SECONDS),
    });
  }, [id, currentArchiveId, title]);

  return (
    <Button
      aria-label={`Click to open archive ${title}`}
      className="normal-case h-full"
      component={Paper}
      fullWidth
      onClick={onClick}
    >
      {title}
    </Button>
  );
};

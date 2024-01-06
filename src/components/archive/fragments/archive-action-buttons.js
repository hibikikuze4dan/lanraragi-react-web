import { Button } from "@mui/material";
import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { DateTime } from "luxon";
import {
  setAllSectionVisibilityFalse,
  updatePages,
  updateSectionVisibility,
  updateCurrentArchiveId,
  updateArchiveOpenedFrom,
} from "../../../app/slice";
import { addArchiveToArchiveHistory } from "../../../storage/history";

export const ArchiveActionButtons = ({
  id,
  currentArchiveId,
  isSearch,
  title,
  onInfoClick,
}) => {
  const dispatch = useDispatch();

  const handleInfoClick = useCallback(() => {
    onInfoClick(id);
  }, [id]);
  const onPress = useCallback(() => {
    if (currentArchiveId !== id) dispatch(updatePages([]));
    dispatch(setAllSectionVisibilityFalse());
    dispatch(updateSectionVisibility({ images: true }));
    dispatch(updateCurrentArchiveId(id));
    dispatch(updateArchiveOpenedFrom(isSearch ? "search" : "random"));
    addArchiveToArchiveHistory({
      id,
      title,
      date: DateTime.now().toLocaleString(DateTime.DATETIME_HUGE_WITH_SECONDS),
    });
  }, [id, currentArchiveId, isSearch, title]);

  return (
    <div className="flex">
      <Button
        aria-label={`Click here to read ${title}`}
        className="w-full bg-[#43464E] rounded-bl shadow-none"
        variant="contained"
        onClick={onPress}
      >
        Read
      </Button>
      <span className="w-px h-full border border-solid border-[#363940]" />
      <Button
        className="w-full bg-[#43464E] rounded-br shadow-none"
        aria-label={`Click here for info and to modify categories for ${title}`}
        variant="contained"
        onClick={handleInfoClick}
      >
        Info
      </Button>
    </div>
  );
};

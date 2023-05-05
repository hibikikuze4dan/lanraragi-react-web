import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery, useTheme } from "@mui/material";
import { getRandomArchives } from "../../requests/random";
import { getCurrentRandomArchives } from "../../app/selectors";
import { updateRandomArchives } from "../../app/slice";
import { ArchiveList } from "../archive-list/archive-list";
import {
  NUM_ARCHIVES_FOR_RENDER,
  NUM_ARCHIVES_FOR_RENDER_SVP,
} from "../../constants";

export const Random = ({ display }) => {
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up("sm"));
  const dispatch = useDispatch();
  const count = mdUp ? NUM_ARCHIVES_FOR_RENDER : NUM_ARCHIVES_FOR_RENDER_SVP;
  const randomArchives = useSelector(getCurrentRandomArchives);
  const callNewArchives = useCallback(async () => {
    dispatch(updateRandomArchives(await getRandomArchives(count)));
  }, [count]);

  useEffect(() => {
    if (randomArchives.length) return;
    callNewArchives();
  }, [randomArchives]);

  return <ArchiveList display={display} archives={randomArchives} />;
};

export default Random;

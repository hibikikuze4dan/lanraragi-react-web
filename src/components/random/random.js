import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRandomArchives } from "../../requests/random";
import { getCurrentRandomArchives } from "../../app/selectors";
import { updateRandomArchives } from "../../app/slice";
import { ArchiveList } from "../archive-list/archive-list";
import { useWidth } from "../../hooks/useWidth";
import { getNumArchivesToRender } from "../../storage/archives";

export const Random = ({ display }) => {
  const breakpoint = useWidth();
  const dispatch = useDispatch();
  const count = getNumArchivesToRender()[breakpoint];
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

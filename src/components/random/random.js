import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRandomArchives } from "../../requests/random";
import { getCurrentRandomArchives } from "../../app/selectors";
import { updateRandomArchives } from "../../app/slice";
import { ArchiveList } from "../archive-list/archive-list";
import { useWidth } from "../../hooks/useWidth";
import { getNumArchivesToRender } from "../../storage/archives";
import { Loading } from "../loading/loading";

export const Random = ({ display }) => {
  const breakpoint = useWidth();
  const dispatch = useDispatch();
  const count = getNumArchivesToRender()[breakpoint];
  const randomArchives = useSelector(getCurrentRandomArchives);
  const [loading, setLoading] = useState(false);

  const callNewArchives = useCallback(async () => {
    setLoading(true);
    dispatch(updateRandomArchives(await getRandomArchives(count)));
  }, [count]);

  useEffect(() => {
    if (randomArchives.length) {
      setLoading(false);
      return;
    }
    callNewArchives();
  }, [randomArchives]);

  return (
    <Loading loading={loading} label="Loading Random Archives">
      <ArchiveList display={display} archives={randomArchives} />
    </Loading>
  );
};

export default Random;

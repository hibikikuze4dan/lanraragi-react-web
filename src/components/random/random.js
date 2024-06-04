import React, { useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Grid } from "@mui/material";
import { Casino } from "@mui/icons-material";
import { getRandomArchives } from "../../requests/random";
import { getCurrentRandomArchives, getLoading } from "../../app/selectors";
import { updateLoading, updateRandomArchives } from "../../app/slice";
import { ArchiveList } from "../archive-list/archive-list";
import { useWidth } from "../../hooks/useWidth";
import { getNumArchivesToRender } from "../../storage/archives";
import { Loading } from "../loading/loading";
import { scrollIntoViewByElement } from "../../utils";

export const Random = ({ display }) => {
  const breakpoint = useWidth();
  const dispatch = useDispatch();
  const count = getNumArchivesToRender()[breakpoint];
  const randomArchives = useSelector(getCurrentRandomArchives);
  const { random: israndomLoading } = useSelector(getLoading);

  const callNewArchives = useCallback(async () => {
    dispatch(updateLoading({ random: true }));
    const randomArchiveArray = await getRandomArchives(count);
    dispatch(updateRandomArchives(randomArchiveArray));
    dispatch(updateLoading({ random: false }));
    scrollIntoViewByElement("#archive-text-0", 750);
  }, [count]);

  useEffect(() => {
    if (randomArchives.length) {
      dispatch(updateLoading({ random: false }));
      return;
    }
    if (!israndomLoading) callNewArchives();
  }, []);

  const footer = useMemo(
    () => (
      <Grid className="pt-4" container justifyContent="center">
        <Grid item xs={12} sm={8}>
          <Button className="normal-case" fullWidth onClick={callNewArchives}>
            <Casino className="mr-2" /> More Archives
          </Button>
        </Grid>
      </Grid>
    ),
    []
  );

  return (
    <Loading loading={israndomLoading} label="Loading Random Archives">
      <ArchiveList
        display={display}
        archives={randomArchives}
        footer={footer}
      />
    </Loading>
  );
};

export default Random;

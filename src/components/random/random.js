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

export const Random = ({ display }) => {
  const breakpoint = useWidth();
  const dispatch = useDispatch();
  const count = getNumArchivesToRender()[breakpoint];
  const randomArchives = useSelector(getCurrentRandomArchives);
  const { random: israndomLoading } = useSelector(getLoading);

  const callNewArchives = useCallback(async () => {
    dispatch(updateLoading({ random: true }));
    dispatch(updateRandomArchives(await getRandomArchives(count)));
    dispatch(updateLoading({ random: false }));
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
      <Grid container justifyContent="center" sx={{ pt: "1rem" }}>
        <Grid item xs={12} sm={8}>
          <Button
            fullWidth
            onClick={callNewArchives}
            sx={{ textTransform: "none" }}
          >
            <Casino sx={{ mr: ".5rem" }} /> More Archives
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

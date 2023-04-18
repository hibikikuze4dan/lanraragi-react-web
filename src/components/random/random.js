import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, useMediaQuery, useTheme } from "@mui/material";
import { useEffectOnce } from "usehooks-ts";
import { Archive } from "../archive/archive";
import { getRandomArchives } from "../../requests/random";
import { getCurrentRandomArchives } from "../../app/selectors";
import { updateRandomArchives } from "../../app/slice";

export const Random = () => {
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up("sm"));
  const dispatch = useDispatch();
  const count = mdUp ? 20 : 10;
  const randomArchives = useSelector(getCurrentRandomArchives);
  const callNewArchives = useCallback(async () => {
    const newRandomArchives = (await getRandomArchives(count)) ?? [];
    dispatch(updateRandomArchives(newRandomArchives));
  }, [count]);

  useEffectOnce(() => {
    if (randomArchives.length) return;
    callNewArchives();
  });

  return (
    <Grid
      id="random"
      container
      spacing={4}
      sx={{ overflowY: "scroll", height: "100vh", padding: "0 1rem" }}
    >
      {randomArchives.map((archive) => {
        const { arcid, title } = archive;
        return (
          <Grid key={arcid} xs={12} sm={6} md={6} item>
            <Archive id={arcid} title={title} />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default Random;

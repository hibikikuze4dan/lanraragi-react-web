import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, useMediaQuery, useTheme } from "@mui/material";
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

  useEffect(() => {
    if (randomArchives.length) return;
    callNewArchives();
  }, [randomArchives]);

  return (
    <div
      className="full-height"
      style={{
        overflowY: "scroll",
      }}
    >
      <div style={{ paddingTop: "2rem", paddingBottom: "3rem" }}>
        <Grid
          id="random"
          container
          spacing={4}
          sx={{
            padding: "0 1rem",
            marginTop: 0,
          }}
        >
          {randomArchives.map((archive, idx) => {
            const { arcid, title } = archive;
            return (
              <Grid
                key={arcid}
                xs={12}
                sm={6}
                md={6}
                item
                sx={{ paddingTop: "0 !important", paddingBottom: "2rem" }}
              >
                <Archive index={idx} id={arcid} title={title} />
              </Grid>
            );
          })}
        </Grid>
      </div>
    </div>
  );
};

export default Random;

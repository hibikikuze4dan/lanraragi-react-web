import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "@mui/material";
import { Archive } from "../archive/archive";
import { getRandomArchives } from "../../requests/random";
import { getCurrentRandomArchives } from "../../app/selectors";
import { updateRandomArchives } from "../../app/slice";

export const Random = ({ onArchiveClick }) => {
  const dispatch = useDispatch();
  const randomArchives = useSelector(getCurrentRandomArchives);

  useEffect(() => {
    const callNewArchives = async () => {
      const newRandomArchives = (await getRandomArchives()) ?? [];
      dispatch(updateRandomArchives(newRandomArchives));
    };
    if (!randomArchives.length) callNewArchives();
  }, [dispatch, randomArchives]);

  return (
    <div style={{ margin: "3rem 1.5rem" }}>
      <Grid container>
        {randomArchives.map((archive) => {
          const { arcid, title } = archive;
          return (
            <Grid key={arcid} xs={12} sm={6} md={6} item>
              <Archive
                id={arcid}
                title={title}
                onArchiveClick={onArchiveClick}
              />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default Random;

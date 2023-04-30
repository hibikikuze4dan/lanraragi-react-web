import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, useMediaQuery, useTheme } from "@mui/material";
import { RandomArchive } from "../random-archive/random-archive";
import { getRandomArchives } from "../../requests/random";
import { getCurrentRandomArchives } from "../../app/selectors";
import { updateRandomArchives } from "../../app/slice";
import { ArchiveInfoDialog } from "../dialogs/fragments/archive-info-dialog";

export const Random = ({ display }) => {
  const [archiveInfoModalState, updateArchiveInfoModalState] = useState({
    open: false,
    arcId: "",
  });
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up("sm"));
  const dispatch = useDispatch();
  const count = mdUp ? 24 : 15;
  const randomArchives = useSelector(getCurrentRandomArchives);
  const callNewArchives = useCallback(async () => {
    dispatch(updateRandomArchives(await getRandomArchives(count)));
  }, [count]);

  useEffect(() => {
    if (randomArchives.length) return;
    callNewArchives();
  }, [randomArchives]);

  return (
    <div
      className="full-height"
      style={{
        display,
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
            const onInfoClick = () =>
              updateArchiveInfoModalState({ open: true, arcId: arcid });
            return (
              <Grid
                key={arcid}
                xs={12}
                sm={6}
                md={6}
                lg={3}
                xl={2}
                item
                sx={{ paddingTop: "0 !important", paddingBottom: "2rem" }}
              >
                <RandomArchive
                  index={idx}
                  id={arcid}
                  title={title}
                  onInfoClick={onInfoClick}
                />
              </Grid>
            );
          })}
        </Grid>
      </div>
      <ArchiveInfoDialog
        onClose={() =>
          updateArchiveInfoModalState({ ...archiveInfoModalState, open: false })
        }
        open={archiveInfoModalState.open}
        arcId={archiveInfoModalState.arcId}
      />
    </div>
  );
};

export default Random;

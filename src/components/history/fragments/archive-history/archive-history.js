import { Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getArchiveHistory, getUseApiHistory } from "../../../../storage/history";
import { ArchiveHistoryButton } from "./fragments/archive-history-button";
import { getArchivesByLastRead } from "../../../../requests/search";
import { Loading } from "../../../loading/loading";

export const ArchiveHistory = () => {
  const [archiveHistory, setArchiveHistory] = useState([]);
  const [gettingHistory, setGettingHistory] = useState(false);

  useEffect(() => {
    if (getUseApiHistory()) {
      setGettingHistory(true);
      getArchivesByLastRead().then((res) => {
        setArchiveHistory(res);
        setGettingHistory(false);
      });
    } else {
      setArchiveHistory(getArchiveHistory().reverse());
    }
  }, []);

  return (
    <Grid container spacing={2}>
      <Loading fullHeight loading={gettingHistory} label="Getting history from the Lanraragi Api">
        {archiveHistory.map(({ id, arcid, title, date }, index) => (
          <Grid item key={`${id || arcid} ${date ?? index}`} xs={12} md={6}>
            <ArchiveHistoryButton id={id || arcid} title={title} />
          </Grid>
        ))}
        {archiveHistory.length < 1 && (
          <Typography textAlign="center">Looks like no archives have been opened yet.</Typography>
        )}
      </Loading>
    </Grid>
  );
};

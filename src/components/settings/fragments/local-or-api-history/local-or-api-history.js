/* eslint-disable react/no-unescaped-entities */
import { FormControl, Grid, InputLabel, Select, Typography } from "@mui/material";
import React, { useCallback, useState } from "react";
import { getUseApiHistory, setUseApiHistory } from "../../../../storage/history";

const options = ["Local Storage", "Lanraragi Api"];

export const LocalOrApiHistory = () => {
  const [historyManager, setHistoryManager] = useState(
    getUseApiHistory() ? options[1] : options[0]
  );

  const onChange = useCallback((e) => {
    const { value } = e.target;
    setHistoryManager(value);
    setUseApiHistory(value === options[1]);
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Grid container justifyContent="center">
          <Typography>
            Use local storage or Lanraragi Api for keeping track of archive history
          </Typography>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container>
          <FormControl fullWidth>
            <InputLabel id="history-select-label" htmlFor="history-select-select">
              Local Storage or Api
            </InputLabel>

            <Select
              variant="outlined"
              fullWidth
              labelId="history-select-label"
              id="history-select-select"
              value={historyManager}
              label="Local Storage or Api"
              onChange={onChange}
              native
            >
              {options.map((manager) => (
                <option key={manager} value={manager}>
                  {manager}
                </option>
              ))}
            </Select>
            <Typography variant="caption">
              Make sure that the "Clientside Progress Tracking" option is turned <b>off</b> on
              Lanraragi if you want to use the api to track archive history.
            </Typography>
          </FormControl>
        </Grid>
      </Grid>
    </Grid>
  );
};

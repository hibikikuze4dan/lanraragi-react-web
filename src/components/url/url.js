import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { getBaseUrl, storeBaseUrl } from "../../storage/requests";
import { updateSectionVisibility } from "../../app/slice";

export const Url = () => {
  const dispatch = useDispatch();
  const [url, setUrl] = useState("");

  const onChangeText = useCallback(
    (event) => setUrl(event.target.value),
    [setUrl]
  );
  const onPress = useCallback(() => {
    storeBaseUrl(url);
    dispatch(updateSectionVisibility({ random: true, address: false }));
  }, [url, dispatch]);

  useEffect(() => {
    if (getBaseUrl()) {
      dispatch(updateSectionVisibility({ random: true, address: false }));
    }
  }, [dispatch]);

  return (
    <Grid
      style={{ padding: "4rem 3rem", height: `${window.innerHeight}px` }}
      container
      alignContent="center"
    >
      <Grid item xs={12}>
        <Grid container direction="column" spacing={4}>
          <Grid item xs={12}>
            <TextField
              label="Lanraragi Server Address"
              fullWidth
              value={url}
              placeholder="(No / at the end)"
              onChange={onChangeText}
              type="text"
            />
          </Grid>
          <Grid item xs={6}>
            <Button onClick={onPress} variant="contained">
              <Typography>Set Address</Typography>
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

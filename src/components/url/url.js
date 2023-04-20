import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { getBaseUrl, storeApiKey, storeBaseUrl } from "../../storage/requests";
import { updateSectionVisibility } from "../../app/slice";

export const Url = () => {
  const dispatch = useDispatch();
  const [url, setUrl] = useState("");
  const [apiKey, setApiKey] = useState("");

  const onChangeText = useCallback(
    (event) => setUrl(event.target.value),
    [setUrl]
  );
  const onChangeApiText = useCallback(
    (event) => setApiKey(event.target.value),
    [setApiKey]
  );

  const onPress = useCallback(() => {
    storeBaseUrl(url);
    storeApiKey(apiKey);
    dispatch(updateSectionVisibility({ random: true, address: false }));
  }, [url, apiKey, dispatch]);

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
      spacing={4}
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
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container direction="column" spacing={4}>
          <Grid item xs={12}>
            <TextField
              label="Lanraragi Api Key"
              fullWidth
              value={apiKey}
              placeholder="Base64 Encoded"
              onChange={onChangeApiText}
              type="text"
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container justifyContent="center">
          <Button onClick={onPress} variant="contained">
            <Typography>Set Address</Typography>
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

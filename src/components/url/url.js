/* eslint-disable react/jsx-no-useless-fragment */
import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Grid, TextField, Typography } from "@mui/material";
import classnames from "classnames";
import {
  getApiKey,
  getBaseUrl,
  getUseHttps,
  storeApiKey,
  storeBaseUrl,
  storeUseHttps,
} from "../../storage/requests";
import { updateSectionVisibility } from "../../app/slice";

export const Url = ({ children, isSettings = false }) => {
  const dispatch = useDispatch();
  const [url, setUrl] = useState(getBaseUrl() ?? "");
  const [urlFieldError, setUrlFieldError] = useState("");
  const [apiKey, setApiKey] = useState(getApiKey() ?? "");
  const [useHttps, setUseHttps] = useState(getUseHttps());
  const httpOrHttps = useHttps ? "https://" : "http://";

  const onChangeText = useCallback((event) => {
    setUrl(event.target.value);
    setUrlFieldError("");
  }, []);
  const onChangeApiText = useCallback((event) => setApiKey(event.target.value), []);
  const onPress = useCallback(() => {
    if (!url) {
      setUrlFieldError("Please enter a URL for your Lanraragi server");
      return;
    }
    storeBaseUrl(url);
    storeApiKey(apiKey);
    storeUseHttps(useHttps);
    dispatch(updateSectionVisibility({ random: true, address: false }));
  }, [url, apiKey, useHttps]);
  const onHttpsButtonClick = useCallback(() => {
    setUseHttps(!useHttps);
  }, [useHttps]);

  return !getBaseUrl() || isSettings ? (
    <Grid
      className={classnames(
        { "h-auto px-4 py-16": isSettings },
        { "h-svh py-16 px-12": !isSettings }
      )}
      container
      alignContent="center"
      spacing={4}
    >
      <Grid item xs={12}>
        <Grid container direction="column" spacing={4}>
          <Grid item xs={12}>
            <Grid container justifyContent="center" spacing={2}>
              <Grid item container xs={12} sm={2}>
                <Button
                  aria-label={`Currently using ${httpOrHttps} - Click here to switch`}
                  sx={{ textTransform: "none" }}
                  onClick={onHttpsButtonClick}
                  variant="contained"
                  fullWidth
                >
                  {httpOrHttps}
                </Button>
              </Grid>
              <Grid item xs={12} sm={10}>
                <TextField
                  helperText={urlFieldError}
                  error={!!urlFieldError}
                  required
                  label="Lanraragi Server Address"
                  value={url}
                  placeholder="Ex: 111.111.1.111:3000"
                  onChange={onChangeText}
                  type="text"
                  fullWidth
                />
              </Grid>
            </Grid>
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
  ) : (
    <>{children}</>
  );
};

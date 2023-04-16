import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Grid, Input, Typography } from "@mui/material";
import { getBaseUrl, storeBaseUrl } from "../../storage/requests";

export const Url = () => {
  const dispatch = useDispatch();
  const [url, setUrl] = useState("");

  const onChangeText = useCallback(
    (event) => {
      setUrl(event.target.value);
    },
    [setUrl]
  );
  const onPress = useCallback(() => {
    storeBaseUrl(url);
  }, [url, dispatch]);

  useEffect(() => {
    const getUrl = () => {
      setUrl(getBaseUrl());
    };
    getUrl();
  }, [setUrl]);

  return (
    <div style={{ padding: "2rem 1rem" }}>
      <Grid container direction="column" spacing={4}>
        <Grid item xs={12}>
          <Input
            fullWidth
            value={url}
            placeholder="Lanraragi Server Address (No / at the end)"
            onChange={onChangeText}
          />
        </Grid>
        <Grid item xs={6}>
          <Button onClick={onPress}>
            <Typography>Set Base Url</Typography>
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

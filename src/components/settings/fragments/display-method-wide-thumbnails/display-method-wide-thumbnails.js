import {
  FormControl,
  Grid,
  InputLabel,
  Select,
  Typography,
} from "@mui/material";
import React, { useCallback, useState } from "react";
import {
  getDisplayMethodForWideArchiveThumbnails,
  setDisplayMethodForWideArchiveThumbnails,
} from "../../../../storage/archives";

const options = ["contain", "cover", "fill"];

export const DisplayMethodWideThumbnails = () => {
  const [stateDisplayMethod, setStateDisplayMethod] = useState(
    getDisplayMethodForWideArchiveThumbnails()
  );

  const onChange = useCallback((e) => {
    const { value } = e.target;
    setStateDisplayMethod(value);
    setDisplayMethodForWideArchiveThumbnails(value);
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Grid container justifyContent="center">
          <Typography>Display method for wide archive thumbails</Typography>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container>
          <FormControl fullWidth>
            <InputLabel
              id="display-method-select-label"
              htmlFor="display-method-select-select"
            >
              Display Method
            </InputLabel>

            <Select
              variant="outlined"
              fullWidth
              labelId="display-method-select-label"
              id="display-method-select-select"
              value={stateDisplayMethod}
              label="Display Method"
              onChange={onChange}
              native
            >
              {options.map((displayMethod) => (
                <option key={displayMethod} value={displayMethod}>
                  {displayMethod}
                </option>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Grid>
  );
};

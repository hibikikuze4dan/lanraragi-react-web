import {
  FormControl,
  Grid,
  InputLabel,
  Select,
  Typography,
} from "@mui/material";
import React, { useCallback, useState } from "react";
import {
  getImagesDisplayMethod,
  setImageDisplayMethod,
} from "../../../../storage/images";

const options = ["contain", "cover", "fill"];

export const DisplayMethodImages = () => {
  const [stateDisplayMethod, setStateDisplayMethod] = useState(
    getImagesDisplayMethod()
  );

  const onChange = useCallback((e) => {
    const { value } = e.target;
    setStateDisplayMethod(value);
    setImageDisplayMethod(value);
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Grid container justifyContent="center">
          <Typography>
            Display method for images when reading an archive
          </Typography>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container>
          <FormControl fullWidth>
            <InputLabel
              id="display-method-images-select-label"
              htmlFor="display-method-images-select-select"
            >
              Display Method
            </InputLabel>

            <Select
              variant="outlined"
              fullWidth
              labelId="display-method-images-select-label"
              id="display-method-images-select-select"
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

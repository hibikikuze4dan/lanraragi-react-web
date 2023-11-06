import {
  FormControl,
  Grid,
  InputLabel,
  Select,
  Typography,
} from "@mui/material";
import React, { useCallback, useState } from "react";
import { getRatingType, setRatingType } from "../../../../storage/ratings";

const options = ["Rating", "Score", "Stars"];

export const RatingsSettings = () => {
  const [stateRatingNamespace, setStateRatingNamespace] = useState(
    getRatingType()
  );

  const onChange = useCallback((e) => {
    const value = e?.target?.value ?? "";
    setRatingType(value);
    setStateRatingNamespace(value);
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Grid container justifyContent="center">
          <Typography>
            Namespace for star rating. Whatever is selcted will be saved to the
            metadata for the archive.
            <br />
            <br />
            Ex: It will be saved as &quot;Stars: 5&quot; if &quot;Stars&quot; is
            selected from the following dropdown and you rate an archive as 5
            stars.
          </Typography>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container>
          <FormControl fullWidth>
            <InputLabel
              id="rating-namespace-select-label"
              htmlFor="rating-namespace-select-select"
            >
              Rating Namespace
            </InputLabel>

            <Select
              variant="outlined"
              fullWidth
              labelId="rating-namespace-select-label"
              id="rating-namespace-select-select"
              value={stateRatingNamespace}
              label="Rating Namespace"
              onChange={onChange}
              native
            >
              {options.map((ratingNamespace) => (
                <option key={ratingNamespace} value={ratingNamespace}>
                  {ratingNamespace}
                </option>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Grid>
  );
};

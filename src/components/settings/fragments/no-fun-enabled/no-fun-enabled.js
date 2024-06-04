import { FormControl, InputLabel, Select, Typography } from "@mui/material";
import React, { useCallback, useState } from "react";
import { getNoFunModeEnabled, setNoFunModeEnabled } from "../../../../storage/images";

export const NoFunEnabled = () => {
  const [noFunEnabled, setNoFunEnabled] = useState(getNoFunModeEnabled());
  const onChangeNoFunEnabled = useCallback(
    (e) => {
      setNoFunEnabled(e.target.value);
      setNoFunModeEnabled(e.target.value);
    },
    [setNoFunEnabled]
  );

  return (
    <>
      <Typography>Is No-Fun Mode Enabled on Lanraragi</Typography>
      <FormControl fullWidth>
        <InputLabel id="no-fun-enabled-select-label" htmlFor="no-fun-enabled-select-select">
          No-Fun Enabled
        </InputLabel>

        <Select
          variant="outlined"
          fullWidth
          labelId="no-fun-enabled-select-label"
          id="no-fun-enabled-select-select"
          value={noFunEnabled}
          label="Display Method"
          onChange={onChangeNoFunEnabled}
          native
        >
          {["Yes", "No"].map((displayMethod) => (
            <option key={displayMethod} value={displayMethod}>
              {displayMethod}
            </option>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

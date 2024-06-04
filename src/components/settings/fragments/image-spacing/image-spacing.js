import React, { useCallback, useState } from "react";
import { FormControl, InputLabel, Select, Typography } from "@mui/material";

import { getImageSpacingLevel, setImageSpacingLevel } from "../../../../storage/images";

export const ImageSpacing = () => {
  const [spacingLevel, setSpacingLevel] = useState(getImageSpacingLevel());
  const onChangeNoFunEnabled = useCallback(
    (e) => {
      setSpacingLevel(e.target.value);
      setImageSpacingLevel(e.target.value);
    },
    [setSpacingLevel]
  );

  return (
    <>
      <Typography>Amount of space between images when reading an archive</Typography>
      <FormControl fullWidth>
        <InputLabel id="spacing-level-select-label" htmlFor="spacing-level-select-select">
          Spacing Level
        </InputLabel>

        <Select
          variant="outlined"
          fullWidth
          labelId="spacing-level-select-label"
          id="spacing-level-select-select"
          value={`${spacingLevel}`}
          label="Display Method"
          onChange={onChangeNoFunEnabled}
          native
        >
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((potentialNewSpacingLevel) => (
            <option key={potentialNewSpacingLevel} value={potentialNewSpacingLevel}>
              {potentialNewSpacingLevel}
            </option>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

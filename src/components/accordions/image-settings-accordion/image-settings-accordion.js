import React, { useCallback, useState } from "react";
import {
  FormControl,
  Grid,
  InputLabel,
  Select,
  Typography,
} from "@mui/material";
import { BaseAccordion } from "../base-accordion";
import { DisplayMethodImages } from "../../settings/fragments/display-method-images/display-method-images";
import {
  getNoFunModeEnabled,
  setNoFunModeEnabled,
} from "../../../storage/images";

export const ImageSettingsAccordion = () => {
  const [open, setOpen] = useState(false);
  const [noFunEnabled, setNoFunEnabled] = useState(getNoFunModeEnabled());

  const onChange = () => setOpen(!open);

  const onChangeNoFunEnabled = useCallback(
    (e) => {
      setNoFunEnabled(e.target.value);
      setNoFunModeEnabled(e.target.value);
    },
    [setNoFunEnabled]
  );

  return (
    <BaseAccordion title="Image Settings" onChange={onChange} open={open}>
      <Grid container>
        <Grid item xs={12}>
          <DisplayMethodImages />
        </Grid>
        <Grid item xs={12}>
          <Typography>Is No-Fun Mode Enabled on Lanraragi</Typography>
          <FormControl fullWidth>
            <InputLabel
              id="no-fun-enabled-select-label"
              htmlFor="no-fun-enabled-select-select"
            >
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
        </Grid>
      </Grid>
    </BaseAccordion>
  );
};

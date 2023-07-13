import React, { useState } from "react";
import { Grid } from "@mui/material";
import { BaseAccordion } from "../base-accordion";
import { DisplayMethodImages } from "../../settings/fragments/display-method-images/display-method-images";

export const ImageSettingsAccordion = () => {
  const [open, setOpen] = useState(false);

  const onChange = () => setOpen(!open);

  return (
    <BaseAccordion title="Image Settings" onChange={onChange} open={open}>
      <Grid container>
        <Grid item xs={12}>
          <DisplayMethodImages />
        </Grid>
      </Grid>
    </BaseAccordion>
  );
};

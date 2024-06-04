import React, { useState } from "react";
import { Grid } from "@mui/material";
import { BaseAccordion } from "../base-accordion";
import { DisplayMethodImages } from "../../settings/fragments/display-method-images/display-method-images";
import { NoFunEnabled } from "../../settings/fragments/no-fun-enabled/no-fun-enabled";
import { ImageSpacing } from "../../settings/fragments/image-spacing/image-spacing";

export const ImageSettingsAccordion = () => {
  const [open, setOpen] = useState(false);
  const onChange = () => setOpen(!open);

  return (
    <BaseAccordion title="Image Settings" onChange={onChange} open={open}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <DisplayMethodImages />
        </Grid>
        <Grid item xs={12}>
          <NoFunEnabled />
        </Grid>
        <Grid item xs={12}>
          <ImageSpacing />
        </Grid>
      </Grid>
    </BaseAccordion>
  );
};

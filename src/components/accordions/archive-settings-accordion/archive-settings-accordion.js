import React, { useState } from "react";
import { Grid } from "@mui/material";
import { BaseAccordion } from "../base-accordion";
import { NumArchivesForRow } from "../../settings/fragments/num-archives-for-row/num-archives-for-row";
import { MaxArchivesForViewPort } from "../../settings/fragments/max-archives-for-viewport/max-archives-for-viewport";

export const ArchiveSettingsAccordion = () => {
  const [open, setOpen] = useState(false);

  const onChange = () => setOpen(!open);

  return (
    <BaseAccordion title="Archives Settings" onChange={onChange} open={open}>
      <Grid container>
        <Grid item xs={12}>
          <NumArchivesForRow />
        </Grid>
        <Grid item xs={12}>
          <MaxArchivesForViewPort />
        </Grid>
      </Grid>
    </BaseAccordion>
  );
};
import React, { useState } from "react";
import { Grid } from "@mui/material";
import { BaseAccordion } from "../base-accordion";
import { LocalOrApiHistory } from "../../settings/fragments/local-or-api-history/local-or-api-history";

export const HistoryAccordion = () => {
  const [open, setOpen] = useState(false);

  const onChange = () => setOpen(!open);

  return (
    <BaseAccordion title="History Settings" onChange={onChange} open={open}>
      <Grid container>
        <Grid item xs={12}>
          <LocalOrApiHistory />
        </Grid>
      </Grid>
    </BaseAccordion>
  );
};

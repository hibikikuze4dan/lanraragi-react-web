import React from "react";
import { Grid } from "@mui/material";
import { UrlAccordion } from "../accordions/url-accordion/url-accordion";
import { ArchiveSettingsAccordion } from "../accordions/archive-settings-accordion/archive-settings-accordion";
import { ImageSettingsAccordion } from "../accordions/image-settings-accordion/image-settings-accordion";
import { HistoryAccordion } from "../accordions/history-settings-accordion/history-settings-accordion";
import { SearchSettingsAccordion } from "../accordions/search-settings-accordion/search-settings-accordion";

export const Settings = () => (
  <Grid className="overflow-scroll full-height" container justifyContent="center">
    <Grid item xs={10} md={7}>
      <div className="pt-12 pb-24">
        <UrlAccordion />
        <ArchiveSettingsAccordion />
        <ImageSettingsAccordion />
        <SearchSettingsAccordion />
        <HistoryAccordion />
      </div>
    </Grid>
  </Grid>
);

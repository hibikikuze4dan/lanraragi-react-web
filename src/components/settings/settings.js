import React from "react";
import { Grid } from "@mui/material";
import { UrlAccordion } from "../accordions/url-accordion/url-accordion";
import { ArchiveSettingsAccordion } from "../accordions/archive-settings-accordion/archive-settings-accordion";
import { ImageSettingsAccordion } from "../accordions/image-settings-accordion/image-settings-accordion";

export const Settings = () => (
  <Grid
    className="overflow-scroll full-height"
    container
    justifyContent="center"
  >
    <Grid item xs={10} md={7}>
      <div style={{ paddingTop: "3rem", paddingBottom: "6rem" }}>
        <UrlAccordion />
        <ArchiveSettingsAccordion />
        <ImageSettingsAccordion />
      </div>
    </Grid>
  </Grid>
);

import React, { useState } from "react";
import { Grid, Typography } from "@mui/material";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import { BaseAccordion } from "../base-accordion";
import { SearchForm } from "../../search-form/search-form";

export const SearchAccordion = () => {
  const [open, setOpen] = useState(false);

  const onChange = () => setOpen(!open);
  const onClose = () => setOpen(false);

  const Icon = !open ? ArrowDownward : ArrowUpward;
  const title = (
    <Grid container justifyContent="center">
      <Typography>Search</Typography>
      <Icon className="ml-2" />
    </Grid>
  );

  return (
    <BaseAccordion
      title={title}
      open={open}
      onChange={onChange}
      accordionTitleId="search-accordion"
    >
      <SearchForm onClose={onClose} />
    </BaseAccordion>
  );
};

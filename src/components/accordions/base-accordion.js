import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import React from "react";

export const BaseAccordion = ({
  title,
  children,
  onChange,
  open,
  accordionTitleId,
}) => (
  <Accordion
    expanded={open}
    onChange={onChange}
    TransitionProps={{ mountOnEnter: true, unmountOnExit: true }}
    sx={{ backgroundColor: "#43464E" }}
  >
    <AccordionSummary id={accordionTitleId}>{title}</AccordionSummary>
    <AccordionDetails>{children}</AccordionDetails>
  </Accordion>
);

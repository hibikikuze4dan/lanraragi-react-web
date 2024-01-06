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
    className="bg-[#43464E]"
    expanded={open}
    onChange={onChange}
    TransitionProps={{ mountOnEnter: true, unmountOnExit: true }}
  >
    <AccordionSummary id={accordionTitleId}>{title}</AccordionSummary>
    <AccordionDetails>{children}</AccordionDetails>
  </Accordion>
);

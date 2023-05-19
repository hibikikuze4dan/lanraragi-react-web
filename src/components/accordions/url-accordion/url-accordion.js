import React, { useState } from "react";
import { BaseAccordion } from "../base-accordion";
import { Url } from "../../url/url";

export const UrlAccordion = () => {
  const [open, setOpen] = useState(false);

  const onChange = () => setOpen(!open);

  return (
    <BaseAccordion title="URL Settings" onChange={onChange} open={open}>
      <Url isSettings />
    </BaseAccordion>
  );
};

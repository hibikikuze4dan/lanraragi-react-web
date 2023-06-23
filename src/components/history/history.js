import React from "react";
import { Tabs } from "../tabs/tabs";

export const History = () => {
  return (
    <Tabs
      tabData={[
        { label: "yes", content: "more" },
        { label: "no", content: "of this shit" },
      ]}
    />
  );
};

import React from "react";
import { Tabs } from "../tabs/tabs";
import { SearchHistory } from "./fragments/search-history";

export const History = () => (
  <Tabs
    tabData={[
      { label: "Search History", content: <SearchHistory /> },
      { label: "Archive History", content: "Coming Soon" },
    ]}
  />
);

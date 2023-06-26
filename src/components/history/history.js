import React from "react";
import { Tabs } from "../tabs/tabs";
import { SearchHistory } from "./fragments/search-history";
import { ArchiveHistory } from "./fragments/archive-history";

export const History = () => (
  <Tabs
    tabData={[
      { label: "Search History", content: <SearchHistory /> },
      { label: "Archive History", content: <ArchiveHistory /> },
    ]}
  />
);

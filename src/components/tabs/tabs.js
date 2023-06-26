/* eslint-disable react/jsx-props-no-spreading */
import { Tab, Tabs as MuiTabs, Grid } from "@mui/material";
import React, { useCallback, useState } from "react";
import { TabContext, TabPanel } from "@mui/lab";
import { useWidth } from "../../hooks/useWidth";

export const Tabs = ({ onChange, tabData = [] }) => {
  const [currentTab, setCurrentTab] = useState("0");
  const width = useWidth();
  const smDown = ["sm", "xs"].includes(width);

  const onTabsChange = useCallback(
    (event, tabIndexValue) => {
      setCurrentTab(tabIndexValue);
      if (onChange) onChange(event, tabIndexValue);
    },
    [onChange]
  );

  return (
    <div className="full-width full-height overflow-scroll">
      <TabContext value={currentTab}>
        <Grid container>
          <MuiTabs
            centered={!smDown}
            onChange={onTabsChange}
            value={currentTab}
            variant={smDown ? "fullWidth" : "standard"}
            sx={{ width: "100%" }}
          >
            {tabData.map((tab, index) => {
              const { label, ...otherTabProps } = tab;
              return (
                <Tab
                  key={label}
                  label={label}
                  value={`${index}`}
                  wrapped
                  {...otherTabProps}
                />
              );
            })}
          </MuiTabs>
        </Grid>
        {tabData.map((tab, index) => {
          const { content, label } = tab;
          return (
            <TabPanel key={label} value={`${index}`} sx={{ maxHeight: "100%" }}>
              {content}
            </TabPanel>
          );
        })}
      </TabContext>
    </div>
  );
};

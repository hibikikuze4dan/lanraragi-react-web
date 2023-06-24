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
              const { label } = tab;
              const disabled = tab?.disabled;
              const icon = tab?.icon;
              const iconPosition = tab?.iconPosition;
              return (
                <Tab
                  key={label}
                  disabled={disabled}
                  icon={icon}
                  iconPosition={iconPosition}
                  label={label}
                  value={`${index}`}
                  wrapped
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

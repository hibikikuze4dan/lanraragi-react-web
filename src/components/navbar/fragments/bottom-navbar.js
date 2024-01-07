import { Casino, History, Search, Settings } from "@mui/icons-material";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateSectionVisibility } from "../../../app/slice";
import {
  getSectionVisibilityObject,
  getSectionVisibilityObjectWithAllFalse,
} from "../../../app/selectors";
import { scrollIntoViewByElement } from "../../../utils";

export const BottomNavbar = ({ getNewArchives, openSearchDialog }) => {
  const dispatch = useDispatch();
  const allFalse = useSelector(getSectionVisibilityObjectWithAllFalse);
  const sectionVisibility = useSelector(getSectionVisibilityObject);

  const onChange = useCallback(
    (_, value) => {
      dispatch(updateSectionVisibility({ ...allFalse, [value]: true }));
      if (value === "random" && sectionVisibility.random) {
        getNewArchives();
        scrollIntoViewByElement("#archive-text-0", 750);
        return;
      }
      if (value === "search" && sectionVisibility.search) openSearchDialog();
    },
    [dispatch, sectionVisibility]
  );

  return (
    <BottomNavigation
      className="absolute bottom-0 right-0 left-0 z-10 bg-[#1e1e1e] h-[9svh]"
      onChange={onChange}
      showLabels
    >
      <BottomNavigationAction
        className="text-slate-50"
        label="Random"
        value="random"
        icon={<Casino color="white" />}
      />
      <BottomNavigationAction
        className="text-slate-50"
        label="Search"
        value="search"
        icon={<Search color="white" />}
      />
      <BottomNavigationAction
        className="text-slate-50"
        label="History"
        value="history"
        icon={<History color="white" />}
      />
      <BottomNavigationAction
        className="text-slate-50"
        label="Settings"
        value="settings"
        icon={<Settings color="white" />}
      />
    </BottomNavigation>
  );
};

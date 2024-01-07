import { Casino, History, Search, Settings } from "@mui/icons-material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppBar, Button } from "@mui/material";
import { getSectionVisibilityObjectForSideNavbar } from "../../../app/selectors";
import {
  setAllSectionVisibilityFalse,
  updateSectionVisibility,
} from "../../../app/slice";
import { scrollIntoViewByElement } from "../../../utils";

export const SideNavbar = ({ getNewArchives, openSearchDialog }) => {
  const dispatch = useDispatch();
  const sectionVisibility = useSelector(
    getSectionVisibilityObjectForSideNavbar
  );
  const icons = {
    random: <Casino />,
    search: <Search />,
    history: <History />,
    settings: <Settings />,
  };

  return (
    <AppBar
      className="h-svh w-fit flex bg-[#1e1e1e] justify-around grey-border"
      position="static"
    >
      <div>
        {sectionVisibility.map(({ id, label, visible }) => {
          const onClick = () => {
            dispatch(setAllSectionVisibilityFalse());
            dispatch(updateSectionVisibility({ [id]: true }));
            if (id === "random" && visible) {
              getNewArchives();
              scrollIntoViewByElement("#archive-text-0", 750);
              return;
            }
            if (id === "search" && visible) openSearchDialog();
          };

          return id !== "images" ? (
            <Button
              className="flex flex-col normal-case p-1 mb-6 text-slate-50"
              onClick={onClick}
              key={id}
            >
              {icons[id]}
              {label}
            </Button>
          ) : null;
        })}
      </div>
      <div />
    </AppBar>
  );
};

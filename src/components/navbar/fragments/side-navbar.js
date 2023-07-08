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

const styles = {
  appBar: {
    height: "100svh",
    width: "fit-content",
    display: "flex",
    backgroundColor: "rgba(30, 30, 30, 1)",
    border: "1px solid grey",
    justifyContent: "space-around",
  },
  button: {
    display: "flex",
    flexDirection: "column",
    textTransform: "none",
    padding: "4px 4px",
    marginBottom: "1.5rem",
    color: "white",
  },
};

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
    <AppBar position="static" sx={styles.appBar}>
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
            <Button onClick={onClick} key={id} sx={styles.button}>
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

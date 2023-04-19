import { Casino, MenuBook } from "@mui/icons-material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppBar, Button } from "@mui/material";
import {
  getSectionVisibilityObjectForSideNavbar,
  getSectionVisibilityObjectWithAllFalse,
} from "../../../app/selectors";
import { updateSectionVisibility } from "../../../app/slice";
import { scrollIntoViewByElement } from "../navbar-utils";

const styles = {
  appBar: {
    height: "100vh",
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
  },
};

export const SideNavbar = ({ getNewArchives }) => {
  const dispatch = useDispatch();
  const sectionVisibility = useSelector(
    getSectionVisibilityObjectForSideNavbar
  );
  const allFalse = useSelector(getSectionVisibilityObjectWithAllFalse);
  const icons = {
    random: <Casino />,
    images: <MenuBook />,
  };

  return (
    <AppBar position="static" sx={styles.appBar}>
      <div>
        {sectionVisibility.map(({ id, label, visible }) => {
          const onClick = () => {
            dispatch(updateSectionVisibility({ ...allFalse, [id]: true }));
            if (id === "random" && visible) {
              getNewArchives();
              scrollIntoViewByElement("#archive-text-0", 750);
            }
          };
          return (
            <Button onClick={onClick} key={id} sx={styles.button}>
              {icons[id]}
              {label}
            </Button>
          );
        })}
      </div>
      <div />
    </AppBar>
  );
};

import { Casino, MenuBook } from "@mui/icons-material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppBar, Button } from "@mui/material";
import { getSectionVisibilityObjectForSideNavbar } from "../../../app/selectors";
import { updateSectionVisibility } from "../../../app/slice";

export const SideNavbar = () => {
  const dispatch = useDispatch();
  const sectionVisibility = useSelector(
    getSectionVisibilityObjectForSideNavbar
  );
  const icons = {
    random: <Casino />,
    images: <MenuBook />,
  };

  return (
    <AppBar
      position="unser"
      sx={{
        height: window.innerHeight,
        left: 0,
        width: "fit-content",
        display: "flex",
        backgroundColor: "rgba(30, 30, 30, 1)",
        border: "1px solid grey",
        justifyContent: "space-around",
      }}
    >
      <div>
        {sectionVisibility.map(({ id, label }) => {
          const onClick = () => {
            const allFalse = sectionVisibility.reduce(
              (acc, sec) => ({ ...acc, [sec.id]: false }),
              {}
            );
            dispatch(updateSectionVisibility({ ...allFalse, [id]: true }));
          };
          return (
            <Button
              onClick={onClick}
              key={id}
              sx={{
                display: "flex",
                flexDirection: "column",
                textTransform: "none",
                padding: "4px 4px",
                marginBottom: "1.5rem",
              }}
            >
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

import { Casino, MenuBook } from "@mui/icons-material";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateSectionVisibility } from "../../../app/slice";
import {
  getSectionVisibilityObject,
  getSectionVisibilityObjectWithAllFalse,
} from "../../../app/selectors";
import { scrollIntoViewByElement } from "../../../utils";

export const BottomNavbar = ({ getNewArchives }) => {
  const dispatch = useDispatch();
  const allFalse = useSelector(getSectionVisibilityObjectWithAllFalse);
  const sectionVisibility = useSelector(getSectionVisibilityObject);

  const onChange = useCallback(
    (_, value) => {
      dispatch(updateSectionVisibility({ ...allFalse, [value]: true }));
      if (value === "random" && sectionVisibility.random) {
        getNewArchives();
        scrollIntoViewByElement("#archive-text-0", 750);
      }
    },
    [dispatch, sectionVisibility]
  );

  return (
    <BottomNavigation
      onChange={onChange}
      showLabels
      sx={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1,
        height: `${(1 / 12) * 100}vh`,
        backgroundColor: "rgb(30, 30, 30)",
      }}
    >
      <BottomNavigationAction
        label="Random"
        value="random"
        icon={<Casino color="white" />}
        sx={{ color: "white" }}
      />
      <BottomNavigationAction
        label="Archive"
        value="images"
        icon={<MenuBook color="white" />}
        sx={{ color: "white" }}
      />
    </BottomNavigation>
  );
};

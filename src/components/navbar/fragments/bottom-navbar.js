import { Casino, MenuBook } from "@mui/icons-material";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateRandomArchives,
  updateSectionVisibility,
} from "../../../app/slice";
import { getSectionVisibilityObject } from "../../../app/selectors";
import getRandomArchives from "../../../requests/random";

export const BottomNavbar = () => {
  const dispatch = useDispatch();
  const sectionVisibility = useSelector(getSectionVisibilityObject);

  const onChange = useCallback(
    (_, value) => {
      const callNewArchives = async () => {
        const newRandomArchives = (await getRandomArchives()) ?? [];
        dispatch(updateRandomArchives(newRandomArchives));
      };
      if (value === "random" && sectionVisibility.random) callNewArchives();
      const allFalse = Object.keys(sectionVisibility).reduce(
        (acc, key) => ({ ...acc, [key]: false }),
        {}
      );
      dispatch(updateSectionVisibility({ ...allFalse, [value]: true }));
    },
    [dispatch, sectionVisibility]
  );

  return (
    <BottomNavigation
      onChange={onChange}
      showLabels
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
    >
      <BottomNavigationAction label="Random" value="random" icon={<Casino />} />
      <BottomNavigationAction
        label="Archive"
        value="images"
        icon={<MenuBook />}
      />
    </BottomNavigation>
  );
};

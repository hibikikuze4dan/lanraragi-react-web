import { Casino, MenuBook } from "@mui/icons-material";
import {
  BottomNavigation,
  BottomNavigationAction,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateRandomArchives,
  updateSectionVisibility,
} from "../../../app/slice";
import { getSectionVisibilityObject } from "../../../app/selectors";
import getRandomArchives from "../../../requests/random";

export const BottomNavbar = () => {
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up("sm"));
  const dispatch = useDispatch();
  const sectionVisibility = useSelector(getSectionVisibilityObject);
  const count = mdUp ? 20 : 10;

  const onChange = useCallback(
    (_, value) => {
      const callNewArchives = async () => {
        const newRandomArchives = (await getRandomArchives(count)) ?? [];
        dispatch(updateRandomArchives(newRandomArchives));
      };
      const allFalse = Object.keys(sectionVisibility).reduce(
        (acc, key) => ({ ...acc, [key]: false }),
        {}
      );
      dispatch(updateSectionVisibility({ ...allFalse, [value]: true }));
      if (value === "random" && sectionVisibility.random) {
        callNewArchives();
        document.getElementById("random").scrollIntoView();
      }
    },
    [dispatch, sectionVisibility]
  );

  return (
    <BottomNavigation
      onChange={onChange}
      showLabels
      sx={{ position: "absolute", bottom: 0, left: 0, right: 0 }}
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

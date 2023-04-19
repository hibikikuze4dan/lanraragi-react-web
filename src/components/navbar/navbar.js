import React from "react";
import { useMediaQuery, useTheme } from "@mui/material";
import { useDispatch } from "react-redux";
import { BottomNavbar } from "./fragments/bottom-navbar";
import { SideNavbar } from "./fragments/side-navbar";
import { updateRandomArchives } from "../../app/slice";
import getRandomArchives from "../../requests/random";

export const Navbar = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const count = matches ? 20 : 10;

  const callNewArchives = async () => {
    const newRandomArchives = (await getRandomArchives(count)) ?? [];
    dispatch(updateRandomArchives(newRandomArchives));
  };

  return (
    <>
      {matches && <SideNavbar getNewArchives={callNewArchives} />}
      {!matches && <BottomNavbar getNewArchives={callNewArchives} />}
    </>
  );
};

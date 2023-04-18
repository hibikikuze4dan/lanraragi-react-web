import React from "react";
import { useMediaQuery, useTheme } from "@mui/material";
import { BottomNavbar } from "./fragments/bottom-navbar";
import { SideNavbar } from "./fragments/side-navbar";

export const Navbar = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  return (
    <>
      {matches && <SideNavbar />}
      {!matches && <BottomNavbar />}
    </>
  );
};

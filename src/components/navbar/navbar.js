import React, { useState } from "react";
import { useMediaQuery, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { BottomNavbar } from "./fragments/bottom-navbar";
import { SideNavbar } from "./fragments/side-navbar";
import { SearchDialog } from "../dialogs/fragments/search-dialog";
import { getDisplayNavbar } from "../../app/selectors";
import { useRandomArchivesLogic } from "../../hooks/useRandomArchivesLogic/useRandomArchivesLogic";

export const Navbar = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const displayNavbar = useSelector(getDisplayNavbar);
  const [searchDialogOpen, setSearchDialogOpen] = useState(false);
  const { getNewRandomArchives } = useRandomArchivesLogic(false);

  const openSearchDialog = () => setSearchDialogOpen(true);
  const onClose = () => setSearchDialogOpen(false);

  return displayNavbar ? (
    <>
      {matches && (
        <SideNavbar
          getNewArchives={getNewRandomArchives}
          openSearchDialog={openSearchDialog}
        />
      )}
      {!matches && (
        <BottomNavbar
          getNewArchives={getNewRandomArchives}
          openSearchDialog={openSearchDialog}
        />
      )}
      <SearchDialog onClose={onClose} open={searchDialogOpen} />
    </>
  ) : null;
};

import React, { useState } from "react";
import { useMediaQuery, useTheme } from "@mui/material";
import { useDispatch } from "react-redux";
import { BottomNavbar } from "./fragments/bottom-navbar";
import { SideNavbar } from "./fragments/side-navbar";
import { updateRandomArchives } from "../../app/slice";
import getRandomArchives from "../../requests/random";
import { SearchDialog } from "../dialogs/fragments/search-dialog";
import {
  NUM_ARCHIVES_FOR_RENDER,
  NUM_ARCHIVES_FOR_RENDER_SVP,
} from "../../constants";

export const Navbar = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const [searchDialogOpen, setSearchDialogOpen] = useState(false);
  const count = matches ? NUM_ARCHIVES_FOR_RENDER : NUM_ARCHIVES_FOR_RENDER_SVP;

  const callNewArchives = async () => {
    const newRandomArchives = (await getRandomArchives(count)) ?? [];
    dispatch(updateRandomArchives(newRandomArchives));
  };
  const openSearchDialog = () => setSearchDialogOpen(true);
  const onClose = () => setSearchDialogOpen(false);

  return (
    <>
      {matches && (
        <SideNavbar
          getNewArchives={callNewArchives}
          openSearchDialog={openSearchDialog}
        />
      )}
      {!matches && (
        <BottomNavbar
          getNewArchives={callNewArchives}
          openSearchDialog={openSearchDialog}
        />
      )}
      <SearchDialog onClose={onClose} open={searchDialogOpen} />
    </>
  );
};

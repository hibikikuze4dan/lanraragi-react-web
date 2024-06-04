import React, { useState } from "react";
import { useMediaQuery, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { BottomNavbar } from "./fragments/bottom-navbar";
import { SideNavbar } from "./fragments/side-navbar";
import { updateLoading, updateRandomArchives } from "../../app/slice";
import getRandomArchives from "../../requests/random";
import { SearchDialog } from "../dialogs/fragments/search-dialog";
import { useWidth } from "../../hooks/useWidth";
import { getDisplayNavbar } from "../../app/selectors";
import { getNumArchivesToRender } from "../../storage/archives";

export const Navbar = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const width = useWidth();
  const displayNavbar = useSelector(getDisplayNavbar);
  const [searchDialogOpen, setSearchDialogOpen] = useState(false);
  const count = getNumArchivesToRender()[width];

  const callNewArchives = async () => {
    dispatch(updateLoading({ random: true }));
    const newRandomArchives = (await getRandomArchives(count)) ?? [];
    dispatch(updateRandomArchives(newRandomArchives));
    dispatch(updateLoading({ random: false }));
  };
  const openSearchDialog = () => setSearchDialogOpen(true);
  const onClose = () => setSearchDialogOpen(false);

  return displayNavbar ? (
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
  ) : null;
};

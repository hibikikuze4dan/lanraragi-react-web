/* eslint-disable no-confusing-arrow */
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { Button, Grid, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMaxPages, getSearchPage } from "../../../app/selectors";
import { updateSearchPage } from "../../../app/slice";

export const PageButtons = () => {
  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));
  const dispatch = useDispatch();
  const searchPage = useSelector(getSearchPage);
  const maxPage = useSelector(getMaxPages);

  const onBackClick = () => {
    dispatch(updateSearchPage(searchPage - 1));
  };
  const onForwardClick = () =>
    maxPage !== searchPage ? dispatch(updateSearchPage(searchPage + 1)) : null;

  return (
    <Grid
      container
      justifyContent={mdDown ? "space-around" : "center"}
      sx={{ ml: "2rem" }}
    >
      <Grid item xs={4}>
        <Button fullWidth onClick={onBackClick}>
          <ArrowBack />
          Prev
        </Button>
      </Grid>
      <Grid item xs={4}>
        <Button fullWidth onClick={onForwardClick}>
          Next
          <ArrowForward />
        </Button>
      </Grid>
    </Grid>
  );
};

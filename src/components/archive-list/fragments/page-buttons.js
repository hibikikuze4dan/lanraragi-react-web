import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { Button, Grid } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSearchPage } from "../../../app/selectors";
import { updateSearchPage } from "../../../app/slice";

export const PageButtons = () => {
  const dispatch = useDispatch();
  const searchPage = useSelector(getSearchPage);

  const onBackClick = () => {
    dispatch(updateSearchPage(searchPage - 1));
  };
  const onForwardClick = () => dispatch(updateSearchPage(searchPage + 1));

  return (
    <Grid container justifyContent="center">
      <Grid item xs={4}>
        <Button fullWidth onClick={onBackClick}>
          <ArrowBack />
          Previous
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

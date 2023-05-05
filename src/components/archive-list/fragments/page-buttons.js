/* eslint-disable no-confusing-arrow */
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMaxPages, getSearchPage } from "../../../app/selectors";
import { updateSearchPage } from "../../../app/slice";

const scroll = () =>
  document
    .getElementById("archive-img-0")
    .scrollIntoView({ behavior: "smooth", block: "nearest" });

export const PageButtons = () => {
  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));
  const dispatch = useDispatch();
  const searchPage = useSelector(getSearchPage);
  const maxPage = useSelector(getMaxPages);
  const pages = Array(maxPage)
    .fill(0)
    .map((_, index) => index + 1);

  const onBackClick = () => {
    scroll();
    dispatch(updateSearchPage(searchPage - 1));
  };
  const onForwardClick = () => {
    scroll();
    if (maxPage !== searchPage) dispatch(updateSearchPage(searchPage + 1));
  };
  const onChange = (e) => {
    scroll();
    dispatch(updateSearchPage(e.target.value));
  };

  return (
    <Grid item xs={12}>
      <Grid
        container
        justifyContent={mdDown ? "space-around" : "center"}
        alignContent="center"
        spacing={2}
        sx={{ pb: "1rem", color: "white" }}
      >
        <Grid container item xs={4} sm={5}>
          <Button
            fullWidth
            onClick={onBackClick}
            variant="contained"
            sx={{ backgroundColor: "#43464E" }}
          >
            <ArrowBack />
            Prev
          </Button>
        </Grid>
        <Grid item xs={4} sm={2}>
          <FormControl fullWidth>
            <InputLabel id="page-jump">Page</InputLabel>
            <Select
              variant="outlined"
              fullWidth
              labelId="page-jump"
              id="page-jump-select"
              value={searchPage}
              label="Page"
              onChange={onChange}
            >
              {pages.map((pageNum) => (
                <MenuItem key={`page-${pageNum}`} value={pageNum}>
                  {pageNum}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid container item xs={4} sm={5}>
          <Button
            fullWidth
            onClick={onForwardClick}
            variant="contained"
            sx={{ backgroundColor: "#43464E" }}
          >
            Next
            <ArrowForward />
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

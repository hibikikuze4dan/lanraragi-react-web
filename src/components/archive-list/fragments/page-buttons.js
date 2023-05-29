/* eslint-disable no-confusing-arrow */
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  Select,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMaxPages, getSearchPage } from "../../../app/selectors";
import { updateSearchPage } from "../../../app/slice";
import { useWidth } from "../../../hooks/useWidth";
import { setSearchStats } from "../../../storage/archives";

const scroll = () => {
  document
    .getElementById("page-buttons-top")
    ?.scrollIntoView({ behavior: "smooth" });
};
export const PageButtons = ({ id, disabled, top = false }) => {
  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));
  const breakpoint = useWidth();
  const dispatch = useDispatch();
  const searchPageFromState = useSelector(getSearchPage);
  const maxPage = useSelector(getMaxPages)(breakpoint);
  const searchPage = searchPageFromState > maxPage ? 1 : searchPageFromState;
  const topCopy = top ? "top" : "bottom";
  const pages = Array(maxPage)
    .fill(0)
    .map((_, index) => index + 1);

  const onBackClick = () => {
    const newPage = searchPage - 1;
    if (!top) scroll();
    dispatch(updateSearchPage(newPage));
    setSearchStats({ page: newPage ?? 1 });
  };
  const onForwardClick = () => {
    if (!top) scroll();
    if (maxPage !== searchPage) {
      const newPage = searchPage + 1;
      dispatch(updateSearchPage(newPage));
      setSearchStats({ page: newPage });
    }
  };
  const onChange = (e) => {
    const newPage = Number(e.target.value);
    dispatch(updateSearchPage(newPage));
    setSearchStats({ page: newPage });
    if (!top) scroll();
  };

  return (
    <Grid id={id} item xs={12}>
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
            disabled={disabled}
            sx={{ backgroundColor: "#43464E" }}
          >
            <ArrowBack />
            Prev
          </Button>
        </Grid>
        <Grid item xs={4} sm={2}>
          <FormControl fullWidth>
            <InputLabel
              id={`page-jump-${topCopy}`}
              for={`page-jump-select-${topCopy}`}
            >
              Page
            </InputLabel>
            <Select
              variant="outlined"
              fullWidth
              labelId={`page-jump-${topCopy}`}
              id={`page-jump-select-${topCopy}`}
              value={searchPage}
              label="Page"
              native
              disabled={disabled}
              onChange={onChange}
            >
              {pages.map((pageNum) => (
                <option key={`page-${pageNum}`} value={pageNum}>
                  {pageNum}
                </option>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid container item xs={4} sm={5}>
          <Button
            fullWidth
            onClick={onForwardClick}
            variant="contained"
            disabled={disabled}
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

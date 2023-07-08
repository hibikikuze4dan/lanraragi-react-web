import { Button, Grid, Paper } from "@mui/material";
import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import {
  setAllSectionVisibilityFalse,
  updateLoading,
  updateSearchCategory,
  updateSearchFilter,
  updateSearchPage,
  updateSearchSort,
  updateSearchSortDirection,
  updateSectionVisibility,
} from "../../../../../app/slice";
import { setSearchStats } from "../../../../../storage/search";
import { addSearchToSearchHistory } from "../../../../../storage/history";

export const SearchHistoryButton = ({
  categories,
  category,
  filter,
  sort,
  direction,
  page,
}) => {
  const dispatch = useDispatch();
  const categoryObject = categories.find(({ id }) => id === category);

  const onClick = useCallback(() => {
    dispatch(updateSearchPage(page));
    dispatch(updateSearchCategory(categoryObject ?? {}));
    dispatch(updateSearchFilter(filter));
    dispatch(updateSearchSort(sort));
    dispatch(updateSearchSortDirection(direction));
    dispatch(updateLoading({ search: true }));
    dispatch(setAllSectionVisibilityFalse());
    dispatch(updateSectionVisibility({ search: true }));
    const searchStatsObject = {
      filter,
      page,
      sort,
      direction,
      category,
    };
    setSearchStats(searchStatsObject);
    addSearchToSearchHistory(searchStatsObject);
  }, [page, category, filter, sort, direction]);

  return (
    <Button
      component={Paper}
      fullWidth
      onClick={onClick}
      sx={{ textTransform: "none" }}
    >
      <Grid container spacing={1}>
        <Grid item xs={6}>
          Category:
          <br />
          {categories.find(({ id }) => id === category)?.name ?? ""}
        </Grid>
        <Grid item xs={6}>
          Search Filter:
          <br /> {filter}
        </Grid>
        <Grid item xs={6}>
          Sorted By:
          <br />
          {sort}
        </Grid>
        <Grid item xs={6}>
          {direction === "desc" ? "Descending" : "Ascending"}
        </Grid>
        <Grid item xs={12}>
          Previous Page in Results: {page}
        </Grid>
      </Grid>
    </Button>
  );
};

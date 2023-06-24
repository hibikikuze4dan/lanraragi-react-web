/* eslint-disable react/no-array-index-key */
import React, { useCallback } from "react";
import { Button, Grid, Paper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  addSearchToSearchHistory,
  getSearchHistory,
} from "../../../storage/history";
import { getCategories } from "../../../app/selectors";
import {
  setAllSectionVisibilityFalse,
  updateLoading,
  updateSearchArchives,
  updateSearchCategory,
  updateSearchPage,
  updateSectionVisibility,
} from "../../../app/slice";
import { setSearchStats } from "../../../storage/search";
import { getArchivesBySearch } from "../../../requests/search";

export const SearchHistory = () => {
  const dispatch = useDispatch();
  const categories = useSelector(getCategories);
  const searchHistory = getSearchHistory();

  const callNewArchives = useCallback(
    async (filter, category, sortby, order) => {
      dispatch(updateLoading({ search: true }));
      const arcs = await getArchivesBySearch({
        filter,
        sortby,
        order,
        start: -1,
        ...(category && { category }),
      });
      console.log(arcs);
      dispatch(updateSearchArchives(arcs.data));
      dispatch(updateLoading({ search: false }));
    },
    []
  );

  return (
    <Grid container spacing={2}>
      {searchHistory
        .reverse()
        .map(({ category, filter, page, sort, direction }, index) => {
          const onClick = () => {
            dispatch(updateSearchPage(page));
            dispatch(updateSearchCategory(category));
            callNewArchives(filter, category, sort, direction);
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
          };
          return (
            <Grid
              key={`${category}-${filter}-${page}-${index}`}
              item
              xs={12}
              md={6}
            >
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
                  <Grid item xs={12}>
                    Previous Page in Results: {page}
                  </Grid>
                  <Grid item xs={6}>
                    Sorted By:
                    <br />
                    {sort}
                  </Grid>
                  <Grid item xs={6}>
                    {direction === "desc" ? "Descending" : "Ascending"}
                  </Grid>
                </Grid>
              </Button>
            </Grid>
          );
        })}
      {!searchHistory.length &&
        "Looks like no searches have been preformed yet"}
    </Grid>
  );
};

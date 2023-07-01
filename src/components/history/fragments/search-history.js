/* eslint-disable react/no-array-index-key */
import React, { useCallback } from "react";
import { Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getSearchHistory } from "../../../storage/history";
import { getCategories } from "../../../app/selectors";
import { updateLoading, updateSearchArchives } from "../../../app/slice";
import { getArchivesBySearch } from "../../../requests/search";
import { SearchHistoryButton } from "./search-history/fragments/search-history-button";

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
      dispatch(updateSearchArchives(arcs.data));
      dispatch(updateLoading({ search: false }));
    },
    []
  );

  return (
    <Grid container spacing={2}>
      {searchHistory
        .reverse()
        .map(({ category, filter, page, sort, direction }, index) => (
          <Grid
            key={`${category}-${filter}-${page}-${index}`}
            item
            xs={12}
            md={6}
          >
            <SearchHistoryButton
              categories={categories}
              category={category}
              filter={filter}
              page={page}
              sort={sort}
              direction={direction}
              callNewArchives={callNewArchives}
            />
          </Grid>
        ))}
      {!searchHistory.length &&
        "Looks like no searches have been preformed yet"}
    </Grid>
  );
};

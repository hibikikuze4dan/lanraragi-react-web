/* eslint-disable react/no-array-index-key */
import React from "react";
import { Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { getSearchHistory } from "../../../storage/history";
import { getCategories } from "../../../app/selectors";
import { SearchHistoryButton } from "./search-history/fragments/search-history-button";

export const SearchHistory = () => {
  const categories = useSelector(getCategories);
  const searchHistory = getSearchHistory();

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
            />
          </Grid>
        ))}
      {!searchHistory.length &&
        "Looks like no searches have been preformed yet"}
    </Grid>
  );
};

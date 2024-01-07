import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import { Button, FormControl, Grid, InputLabel, Select } from "@mui/material";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateSearchSort, updateSearchSortDirection } from "../../app/slice";
import { getSearchSort, getSearchSortDirection } from "../../app/selectors";

const SORT_BY = [
  { value: "title", type: "Title" },
  { value: "date_added", type: "Date" },
];

export const Sort = () => {
  const dispatch = useDispatch();
  const sortOrder = useSelector(getSearchSortDirection);
  const sortBy = useSelector(getSearchSort);
  const descending = sortOrder === "desc";
  const Icon = descending ? ArrowDownward : ArrowUpward;
  const copy = descending ? "Descending" : "Ascending";

  const onSortOrderButtonClick = useCallback(() => {
    dispatch(updateSearchSortDirection(descending ? "asc" : "desc"));
  }, [sortOrder]);
  const onSortBySelect = useCallback(
    (e) => {
      dispatch(updateSearchSort(e.target.value));
    },
    [sortBy]
  );

  return (
    <Grid container spacing={1}>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel id="select-sort-by-label" htmlFor="select-sort-by">
            Sort By
          </InputLabel>
          <Select
            labelId="select-sort-by-label"
            id="select-sort-by"
            value={sortBy}
            label="Sort By"
            onChange={onSortBySelect}
            native
          >
            {SORT_BY.map(({ type, value }) => (
              <option key={value} value={value}>
                {type}
              </option>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <Button
          className="normal-case h-full"
          onClick={onSortOrderButtonClick}
          aria-label={`Currently ${copy} - click to toggle`}
          fullWidth
        >
          <Icon className="mr-2" /> {copy}
        </Button>
      </Grid>
    </Grid>
  );
};

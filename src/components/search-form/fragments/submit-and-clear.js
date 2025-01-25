import { Button, Grid } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateSearchCategory,
  updateSearchPage,
  updateSearchFilter,
  updateLoading,
} from "../../../app/slice";
import { getSearchSort, getSearchSortDirection } from "../../../app/selectors";
import { setSearchStats } from "../../../storage/search";
import { useOnSubmit } from "../hooks/useOnSubmit";

export const SubmitAndClear = ({
  selectedCategoryId,
  onClose = () => null,
  setSelectedCategoryId,
}) => {
  const dispatch = useDispatch();
  const searchSort = useSelector(getSearchSort);
  const searchSortDirection = useSelector(getSearchSortDirection);
  const onSubmit = useOnSubmit({ selectedCategoryId, onPostDispatch: onClose });

  const onClear = () => {
    dispatch(updateSearchPage(1));
    dispatch(updateSearchCategory({}));
    dispatch(updateSearchFilter(""));
    setSelectedCategoryId("");
    dispatch(updateLoading({ search: true }));
    onClose();
    setSearchStats({
      filter: "",
      page: 1,
      sort: searchSort,
      direction: searchSortDirection,
      category: "",
    });
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={6} sm={6}>
        <Button fullWidth onClick={onSubmit}>
          Apply Filter
        </Button>
      </Grid>
      <Grid justifyContent="center" item xs={6} sm={6}>
        <Button fullWidth onClick={onClear}>
          Clear Filter
        </Button>
      </Grid>
    </Grid>
  );
};

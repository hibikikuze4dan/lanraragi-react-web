import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Grid } from "@mui/material";
import { getSearchCategory } from "../../app/selectors";
import { SearchCategoriesSelect } from "./fragments/search-categories-select";
import { SearchFilterTextField } from "./fragments/search-filter-text-field";
import { SubmitAndClear } from "./fragments/submit-and-clear";
import { Sort } from "../sort/sort";

export const SearchForm = ({ onClose }) => {
  const searchCategory = useSelector(getSearchCategory);
  const [selectedCategoryId, setSelectedCategoryId] = useState(
    searchCategory?.id ?? ""
  );

  return (
    <Grid
      className="h-full pt-8"
      container
      justifyContent="center"
      alignContent="center"
      spacing={2}
    >
      <Grid item xs={12}>
        <SearchCategoriesSelect
          selectedCategoryId={selectedCategoryId}
          setSelectedCategoryId={setSelectedCategoryId}
        />
      </Grid>
      <Grid item xs={12}>
        <SearchFilterTextField />
      </Grid>
      <Grid item xs={12}>
        <Sort />
      </Grid>
      <Grid item xs={12}>
        <SubmitAndClear
          selectedCategoryId={selectedCategoryId}
          onClose={onClose}
          setSelectedCategoryId={setSelectedCategoryId}
        />
      </Grid>
    </Grid>
  );
};

import React, { useState } from "react";
import { Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { BaseDialog } from "../base-dialog";
import { getSearchCategory } from "../../../app/selectors";
import { Sort } from "../../sort/sort";
import { SubmitAndClear } from "./submit-and-clear";
import { SearchCategoriesSelect } from "./search-categories-select";
import { SearchFilterTextField } from "./search-filter-text-field";

export const SearchDialog = ({ onClose, open }) => {
  const searchCategory = useSelector(getSearchCategory);
  const [selectedCategoryId, setSelectedCategoryId] = useState(
    searchCategory?.id ?? ""
  );

  return (
    <BaseDialog title="Search" onClose={onClose} open={open}>
      <Grid
        container
        justifyContent="center"
        alignContent="center"
        spacing={2}
        sx={{ height: "100%", pt: "2rem" }}
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
    </BaseDialog>
  );
};

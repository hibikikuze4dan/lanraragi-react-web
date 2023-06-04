import { FormControl, InputLabel, Select } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { getCategories } from "../../../app/selectors";

export const SearchCategoriesSelect = ({
  setSelectedCategoryId,
  selectedCategoryId,
}) => {
  const categories = useSelector(getCategories);

  const onCategorySelect = (e) => {
    setSelectedCategoryId(e.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel
        id="select-categories-search-label"
        htmlFor="select-categories-search"
      >
        Filter Archives by Category
      </InputLabel>
      <Select
        labelId="select-categories-search-label"
        id="select-categories-search"
        value={selectedCategoryId}
        label="Filter Archives by Category"
        onChange={onCategorySelect}
        native
      >
        <option value="" aria-label="None" />
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </Select>
    </FormControl>
  );
};

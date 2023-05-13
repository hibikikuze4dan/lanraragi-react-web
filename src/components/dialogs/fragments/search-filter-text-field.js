import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "lodash";
import { TextField } from "@mui/material";
import { getSearchFilter } from "../../../app/selectors";
import { updateSearchFilter } from "../../../app/slice";

export const SearchFilterTextField = () => {
  const dispatch = useDispatch();
  const searchFilter = useSelector(getSearchFilter);
  const [searchText, updateSearchText] = useState(searchFilter);

  const throttledUpdate = debounce(
    (e) => dispatch(updateSearchFilter(e.target.value)),
    1000
  );
  const onChangeText = (e) => {
    updateSearchText(e.target.value);
    throttledUpdate(e);
  };

  return (
    <TextField
      label="Search Filter"
      placeholder="Search Title, Artist, Series, Language or Tags"
      fullWidth
      value={searchText}
      onChange={onChangeText}
      type="text"
      sx={{ mb: "1rem" }}
    />
  );
};

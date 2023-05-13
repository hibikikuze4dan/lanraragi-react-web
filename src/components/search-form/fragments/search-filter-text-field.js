import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "lodash";
import { TextField } from "@mui/material";
import { updateSearchFilter } from "../../../app/slice";
import { getSearchFilter } from "../../../app/selectors";

export const SearchFilterTextField = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState(useSelector(getSearchFilter));

  const onChangeText = debounce((e) => {
    dispatch(updateSearchFilter(e.target.value));
  }, 250);
  const onChange = (e) => {
    setValue(e.target.value);
    onChangeText(e);
  };

  return (
    <TextField
      label="Search Filter"
      placeholder="Search Title, Artist, Series, Language or Tags"
      fullWidth
      value={value}
      onChange={onChange}
      type="text"
      sx={{ mb: "1rem" }}
    />
  );
};

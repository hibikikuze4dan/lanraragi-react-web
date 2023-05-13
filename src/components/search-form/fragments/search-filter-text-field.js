import React from "react";
import { useDispatch } from "react-redux";
import { debounce } from "lodash";
import { TextField } from "@mui/material";
import { updateSearchFilter } from "../../../app/slice";

export const SearchFilterTextField = () => {
  const dispatch = useDispatch();

  const onChangeText = debounce((e) => {
    dispatch(updateSearchFilter(e.target.value));
  }, 250);

  return (
    <TextField
      label="Search Filter"
      placeholder="Search Title, Artist, Series, Language or Tags"
      fullWidth
      onChange={onChangeText}
      type="text"
      sx={{ mb: "1rem" }}
    />
  );
};

/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "lodash";
import { Autocomplete, TextField, createFilterOptions } from "@mui/material";
import { updateSearchFilter, updateTags } from "../../../app/slice";
import { getAutocompleteTags, getSearchFilter } from "../../../app/selectors";
import { getTags } from "../../../requests/tags";

const filterOptions = createFilterOptions({
  limit: 25,
});

export const SearchFilterTextField = () => {
  const dispatch = useDispatch();
  const tags = useSelector(getAutocompleteTags);
  const searchFilter = useSelector(getSearchFilter);

  const onChangeText = debounce((event, newValue) => {
    dispatch(updateSearchFilter(newValue || event.target.value));
  }, 250);
  const onChange = (event, newValue) => {
    onChangeText(event, newValue);
  };

  useEffect(() => {
    const getTagsAsync = async () => {
      const tagsResponse = await getTags();
      return tagsResponse;
    };
    if (!tags.length) {
      getTagsAsync().then((response) => {
        dispatch(updateTags(response));
      });
    }
  }, [tags]);

  return (
    <Autocomplete
      autoHighlight
      freeSolo
      filterSelectedOptions
      fullWidth
      filterOptions={filterOptions}
      options={tags}
      onChange={onChange}
      value={searchFilter}
      renderInput={(params) => (
        <TextField
          label="Search Filter"
          placeholder="Search Title, Artist, Series, Language or Tags"
          fullWidth
          type="text"
          sx={{ mb: "1rem" }}
          onChange={onChange}
          {...params}
        />
      )}
    />
  );
};

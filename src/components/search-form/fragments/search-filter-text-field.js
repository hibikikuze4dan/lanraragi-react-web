/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "lodash";
import { Autocomplete } from "../../autocomplete/autocomplete";
import { updateSearchFilter } from "../../../app/slice";
import { getSearchFilter } from "../../../app/selectors";
import { useOnSubmit } from "../hooks/useOnSubmit";
import { useTagsFromLRRApi } from "../../../hooks/useTagsFromLRRApi/useTagsFromLRRApi";

export const SearchFilterTextField = ({
  onClose = () => null,
  selectedCategoryId = "",
}) => {
  const dispatch = useDispatch();
  const tags = useTagsFromLRRApi();
  const searchFilter = useSelector(getSearchFilter);
  const onSubmit = useOnSubmit({ selectedCategoryId, onPostDispatch: onClose });

  const onChangeText = debounce((value) => {
    dispatch(updateSearchFilter(value));
  }, 250);
  const onChange = (value) => {
    onChangeText(value);
  };

  return (
    <Autocomplete
      label="Search Filter"
      placeholder="Search Title, Artist, Series, Language or Tags"
      items={tags}
      onChange={onChange}
      onSubmit={onSubmit}
      value={searchFilter}
      maxItems={5}
    />
  );
};

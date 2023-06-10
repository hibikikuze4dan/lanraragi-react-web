/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "lodash";
import { Autocomplete } from "../../autocomplete/autocomplete";
import { updateSearchFilter, updateTags } from "../../../app/slice";
import { getAutocompleteTags, getSearchFilter } from "../../../app/selectors";
import { getTags } from "../../../requests/tags";

export const SearchFilterTextField = () => {
  const dispatch = useDispatch();
  const tags = useSelector(getAutocompleteTags);
  const searchFilter = useSelector(getSearchFilter);

  const onChangeText = debounce((value) => {
    dispatch(updateSearchFilter(value));
  }, 250);
  const onChange = (value) => {
    onChangeText(value);
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
      label="Search Filter"
      placeholder="Search Title, Artist, Series, Language or Tags"
      items={tags}
      onChange={onChange}
      value={searchFilter}
      maxItems={5}
    />
  );
};

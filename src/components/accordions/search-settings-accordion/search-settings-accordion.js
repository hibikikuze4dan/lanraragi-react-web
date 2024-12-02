import React from "react";
import { Switch, FormControlLabel } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getUsePaginatedSearch } from "../../../app/selectors";
import {
  updateSearchPaginationSetting,
  updateLoading,
  updateSearchArchives,
  updateSearchPage
} from "../../../app/slice";
import { BaseAccordion } from "../base-accordion";

export const SearchSettingsAccordion = () => {
  const dispatch = useDispatch();
  const usePaginatedSearch = useSelector(getUsePaginatedSearch);

  const handlePaginationChange = (e) => {
    dispatch(updateSearchPaginationSetting(e.target.checked));
    dispatch(updateSearchArchives({ archives: [], total: 0 }));
    dispatch(updateSearchPage(1));
    dispatch(updateLoading({ search: true }));
  };

  return (
    <BaseAccordion title="Search Settings">
      <FormControlLabel
        control={(
          <Switch
            checked={usePaginatedSearch}
            onChange={handlePaginationChange}
          />
        )}
        label="Use server-side pagination for search results"
      />
    </BaseAccordion>
  );
};

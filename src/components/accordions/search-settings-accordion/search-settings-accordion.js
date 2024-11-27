import React from "react";
import { Switch, FormControlLabel } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getUsePaginatedSearch } from "../../../app/selectors";
import { updateSearchPaginationSetting } from "../../../app/slice";
import { BaseAccordion } from "../base-accordion";

export const SearchSettingsAccordion = () => {
  const dispatch = useDispatch();
  const usePaginatedSearch = useSelector(getUsePaginatedSearch);

  return (
    <BaseAccordion title="Search Settings">
      <FormControlLabel
        control={
          <Switch
            checked={usePaginatedSearch}
            onChange={(e) => dispatch(updateSearchPaginationSetting(e.target.checked))}
          />
        }
        label="Use server-side pagination for search results"
      />
    </BaseAccordion>
  );
}; 
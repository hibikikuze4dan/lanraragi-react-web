import React, { useCallback } from "react";
import { Button, Grid, Link, Typography } from "@mui/material";
import { DateTime } from "luxon";
import { useDispatch, useSelector } from "react-redux";
import { getTagsObjectFromTagsString, isValidUrl } from "../../utils";
import {
  setAllSectionVisibilityFalse,
  updateLoading,
  updateSearchFilter,
  updateSearchPage,
  updateSectionVisibility,
} from "../../app/slice";
import {
  getSearchCategory,
  getSearchSort,
  getSearchSortDirection,
} from "../../app/selectors";
import { setSearchStats } from "../../storage/search";
import { addSearchToSearchHistory } from "../../storage/history";
import { GENERAL_TAG_TYPE } from "../../constants";

export const Tags = ({ archiveTags, onClose }) => {
  const dispatch = useDispatch();
  const tagsAsObject = getTagsObjectFromTagsString(archiveTags);
  const searchCategory = useSelector(getSearchCategory);
  const sort = useSelector(getSearchSort);
  const sortDirection = useSelector(getSearchSortDirection);

  const onTagClick = useCallback(
    (tagType, tag) => {
      const filter = tagType !== GENERAL_TAG_TYPE ? `${tagType}:${tag}` : tag;
      dispatch(updateSearchFilter(filter));
      dispatch(updateSearchPage(1));
      dispatch(updateLoading({ search: true }));
      dispatch(setAllSectionVisibilityFalse());
      dispatch(updateSectionVisibility({ search: true }));
      onClose();
      const searchStatsObject = {
        filter,
        page: 1,
        sort,
        direction: sortDirection,
        category: searchCategory?.id ?? "",
      };
      setSearchStats(searchStatsObject);
      addSearchToSearchHistory(searchStatsObject);
    },
    [sort, sortDirection, searchCategory]
  );

  return (
    <Grid container spacing={2}>
      {Object.keys(tagsAsObject).map((tagType) => (
        <Grid key={tagType} item xs={12}>
          <Typography>{tagType}:</Typography>
          <Grid container>
            {tagsAsObject[tagType].map((tag) => {
              const validUrl = isValidUrl(tag);
              return (
                <Grid
                  className="overflow-hidden text-ellipsis"
                  key={`${tagType}:${tag}`}
                  item
                  xs={4}
                  sm={3}
                >
                  {!validUrl && (
                    <Button
                      className="normal-case p-0"
                      fullWidth
                      variant="text"
                      onClick={() => onTagClick(tagType, tag)}
                    >
                      {tagType === "date_added"
                        ? DateTime.fromSeconds(Number(tag)).toLocaleString()
                        : tag}
                    </Button>
                  )}
                  {validUrl && (
                    <Link
                      className="noraml-case"
                      target="_blank"
                      rel="noreferrer"
                      href={tag}
                      underline="hover"
                      variant="button"
                    >
                      {tag}
                    </Link>
                  )}
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
};

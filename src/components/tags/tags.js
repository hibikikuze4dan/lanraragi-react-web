import React from "react";
import { Button, Grid, Link, Typography } from "@mui/material";
import { DateTime } from "luxon";
import { useDispatch } from "react-redux";
import { getTagsObjectFromTagsString, isValidUrl } from "../../utils";
import {
  setAllSectionVisibilityFalse,
  updateSearchArchives,
  updateSearchFilter,
  updateSearchPage,
  updateSectionVisibility,
} from "../../app/slice";
import { getArchivesBySearch } from "../../requests/search";

export const Tags = ({ archiveTags, onClose }) => {
  const dispatch = useDispatch();
  const tagsAsObject = getTagsObjectFromTagsString(archiveTags);

  const callNewArchives = async (searchVal) => {
    const arcs = await getArchivesBySearch({
      filter: searchVal,
      sortby: "date_added",
      order: "desc",
      start: -1,
    });
    dispatch(updateSearchArchives(arcs.data));
  };
  const onTagClick = (tagType, tag) => {
    const filter = tagType !== "other" ? `${tagType}:${tag}` : tag;
    callNewArchives(filter);
    dispatch(updateSearchFilter(filter));
    dispatch(updateSearchPage(1));
    dispatch(setAllSectionVisibilityFalse());
    dispatch(updateSectionVisibility({ search: true }));
    onClose();
  };

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
                  key={`${tagType}:${tag}`}
                  item
                  xs={4}
                  sm={3}
                  sx={{ overflow: "hidden", textOverflow: "ellipsis" }}
                >
                  {!validUrl && (
                    <Button
                      fullWidth
                      variant="text"
                      sx={{ textTransform: "none", padding: 0 }}
                      onClick={() => onTagClick(tagType, tag)}
                    >
                      {tagType === "date_added"
                        ? DateTime.fromSeconds(Number(tag)).toLocaleString()
                        : tag}
                    </Button>
                  )}
                  {validUrl && (
                    <Link
                      target="_blank"
                      rel="noreferrer"
                      href={tag}
                      underline="hover"
                      variant="button"
                      sx={{ textTransform: "none" }}
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

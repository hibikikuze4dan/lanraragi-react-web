import React from "react";
import { Button, Grid, Link, Typography } from "@mui/material";
import { DateTime } from "luxon";
import { getTagsObjectFromTagsString, isValidUrl } from "../../utils";

export const Tags = ({ archiveTags }) => {
  const tagsAsObject = getTagsObjectFromTagsString(archiveTags);

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

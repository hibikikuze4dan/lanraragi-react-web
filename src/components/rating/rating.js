import React, { useCallback, useEffect, useState } from "react";
import {
  FormControl,
  Grid,
  InputLabel,
  Rating as MUIRating,
  Select,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { isEmpty } from "lodash";
import { getTagsObjectFromTagsString, stringifyTagsObject } from "../../utils";
import { getRatingType } from "../../storage/ratings";
import getArchiveMetaData, {
  updateArchiveMetadata,
} from "../../requests/metadata";
import { updateArchiveTags, updateDisplaySnackbar } from "../../app/slice";

export const Rating = ({
  readOnly,
  size = "large",
  arcId,
  archiveInfoProp = {},
  ratingProp,
  useSelect = false,
  postRatingChange = () => null,
}) => {
  const dispatch = useDispatch();
  const [archiveInfo, setArchiveInfo] = useState(archiveInfoProp);
  const tagsObject = getTagsObjectFromTagsString(archiveInfo?.tags ?? "");
  const ratingNamespace = getRatingType();
  const [ratingValue, setRatingValue] = useState(ratingProp ?? null);

  const onRatingChange = useCallback(
    (selectValue, starValue) => {
      const valueToUse = starValue ?? selectValue?.target?.value;

      if (!valueToUse) return;

      const newTagsObject = {
        ...tagsObject,
        [ratingNamespace]: [`${valueToUse}`],
      };

      const newTagsObjectAsString = stringifyTagsObject(newTagsObject);

      updateArchiveMetadata({
        id: archiveInfo?.arcid,
        title: archiveInfo?.title,
        tags: newTagsObjectAsString,
      })
        .then((res) => {
          if (res?.success === 1) {
            setRatingValue(Number(valueToUse));
            dispatch(updateArchiveTags({ tags: newTagsObjectAsString, arcId }));
            dispatch(
              updateDisplaySnackbar({
                open: true,
                type: "UPDATE_ARCHIVE_INFO_SUCCESS",
              })
            );
            postRatingChange();
          } else {
            updateDisplaySnackbar({
              open: true,
              type: "UPDATE_ARCHIVE_INFO_FAILURE",
              severity: "error",
            });
            console.log(
              res?.error ?? "Unknown error with updating archive info"
            );
            postRatingChange();
          }
        })
        .catch((err) => {
          updateDisplaySnackbar({
            open: true,
            type: "UPDATE_ARCHIVE_INFO_FAILURE",
            severity: "error",
          });
          console.log(err ?? "Unknown error with updating archive info");
        });
    },
    [archiveInfo, tagsObject, ratingNamespace]
  );

  useEffect(() => {
    if (isEmpty(archiveInfo) && !readOnly) {
      getArchiveMetaData(arcId).then((metadata) => {
        const responseTagsObject = getTagsObjectFromTagsString(
          metadata?.tags ?? ""
        );
        setArchiveInfo({ ...metadata });
        setRatingValue(Number(responseTagsObject?.[ratingNamespace]?.[0] ?? 0));
      });
    }
  }, [arcId, ratingNamespace, archiveInfo]);

  return (
    <Grid container justifyContent="center" spacing={2}>
      {!readOnly && !useSelect && (
        <Grid item sm={12}>
          <Typography>
            Click on any of the stars below to rate this archive. The rating
            will be saved to the archive&apos;s metadata in the Lanraragi
            database.
            <br />
            See the settings for different namespaces that can be used for
            saving the rating.
          </Typography>
        </Grid>
      )}
      <Grid container item justifyContent="center" sm={12}>
        <MUIRating
          name={`archive-rating-for-${archiveInfo?.arcid}`}
          value={readOnly && ratingValue ? ratingProp : ratingValue}
          readOnly={!!readOnly || useSelect}
          precision={0.5}
          onChange={readOnly ? null : onRatingChange}
          size={size}
        />
        {useSelect && (
          <Grid className="pt-4" container justifyContent="center">
            <FormControl>
              <InputLabel id="rating-select-label-id" htmlFor="rating-select">
                {ratingNamespace}
              </InputLabel>
              <Select
                id="rating-select"
                variant="outlined"
                native
                label={ratingNamespace}
                labelId="rating-select-label-id"
                value={ratingValue ?? 0}
                onChange={onRatingChange}
              >
                {[0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5].map((val) => (
                  <option value={`${val}`} key={`rating-select-val-${val}`}>
                    {val}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};
